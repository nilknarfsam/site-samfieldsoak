"""Tempos da letra sincronizada (T-31, docs/15).

Escuta cada MP3 de um álbum das Primeiras versões com o Whisper (faster-whisper, local), alinha as palavras
ouvidas com a letra do Franklin (js/dados/letras/<arquivo>.js) e grava o segundo em que cada linha começa em
js/dados/tempos/<arquivo>.js, no mesmo formato das letras (null nas linhas vazias que separam as partes).

O texto da letra nunca muda: o Whisper só dá os tempos. Linha que o Whisper não reconheceu ganha um tempo
estimado entre as vizinhas. Depois de gerar, ouvir no site e corrigir à mão o que estiver fora.

Uso (na raiz do projeto):
    python ferramentas/tempos-da-letra.py trono-de-fogo --mp3 <pasta com 01-....mp3>
Precisa de: pip install faster-whisper e o ffmpeg no PATH (GPU opcional). Não roda no CI.
"""
import argparse
import json
import re
import sys
import unicodedata
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent


def normalizar(palavra):
    sem_acento = unicodedata.normalize('NFD', palavra.lower())
    sem_acento = ''.join(c for c in sem_acento if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]', '', sem_acento)


def ler_js(caminho, nome):
    """Lê um `export const <nome> = {...};` escrito como JSON (formato dos arquivos de letras)."""
    texto = caminho.read_text(encoding='utf-8')
    inicio = texto.index(f'export const {nome} =') + len(f'export const {nome} =')
    corpo = texto[inicio:].strip().rstrip(';').strip()
    return json.loads(corpo)


def maior_sequencia_comum(a, b):
    """Pares (i, j) da maior sequência de palavras em comum, na ordem (refrões repetidos não confundem)."""
    linhas, colunas = len(a), len(b)
    tabela = [[0] * (colunas + 1) for _ in range(linhas + 1)]
    for i in range(linhas - 1, -1, -1):
        for j in range(colunas - 1, -1, -1):
            tabela[i][j] = tabela[i + 1][j + 1] + 1 if a[i] == b[j] else max(tabela[i + 1][j], tabela[i][j + 1])
    pares, i, j = [], 0, 0
    while i < linhas and j < colunas:
        if a[i] == b[j]:
            pares.append((i, j)); i += 1; j += 1
        elif tabela[i + 1][j] >= tabela[i][j + 1]:
            i += 1
        else:
            j += 1
    return pares


def alinhar(linhas, palavras_ouvidas, duracao):
    """Devolve o início (s) de cada linha; None nas linhas vazias."""
    alvo = []   # (indice_da_linha, palavra normalizada)
    for i, linha in enumerate(linhas):
        for p in linha.split():
            n = normalizar(p)
            if n:
                alvo.append((i, n))
    ouvidas = [(normalizar(w.word), w.start) for w in palavras_ouvidas]
    ouvidas = [(n, t) for n, t in ouvidas if n]
    tempo_da_palavra = {k: ouvidas[j][1] for k, j in maior_sequencia_comum([n for _, n in alvo], [n for n, _ in ouvidas])}

    inicio = [None] * len(linhas)
    confianca = [0] * len(linhas)
    primeira = {}
    for k, (i, _) in enumerate(alvo):
        primeira.setdefault(i, k)
        if k in tempo_da_palavra:
            confianca[i] += 1
            if inicio[i] is None:
                # tempo da primeira palavra casada, recuado pelas palavras que vieram antes dela na linha
                inicio[i] = max(0.0, tempo_da_palavra[k] - 0.35 * (k - primeira[i]))

    cantadas = [i for i, l in enumerate(linhas) if l.strip()]
    # Linha com só uma palavra casada é pouco confiável quando a linha é longa
    for i in cantadas:
        if inicio[i] is not None and confianca[i] == 1 and len(linhas[i].split()) >= 4:
            inicio[i] = None
    # Garante ordem crescente: tempo que volta para trás vira estimativa
    ultimo = -1.0
    for i in cantadas:
        if inicio[i] is not None:
            if inicio[i] <= ultimo:
                inicio[i] = None
            else:
                ultimo = inicio[i]
    # Preenche os buracos entre vizinhas conhecidas (ou até o fim da música)
    conhecidas = [i for i in cantadas if inicio[i] is not None]
    faltaram = sum(1 for i in cantadas if inicio[i] is None)
    for pos, i in enumerate(cantadas):
        if inicio[i] is not None:
            continue
        antes = next((j for j in reversed(cantadas[:pos]) if inicio[j] is not None), None)
        depois = next((j for j in cantadas[pos + 1:] if inicio[j] is not None), None)
        t0 = inicio[antes] if antes is not None else 0.0
        t1 = inicio[depois] if depois is not None else duracao
        grupo = [j for j in cantadas if (antes is None or j > antes) and (depois is None or j < depois)]
        passo = (t1 - t0) / (len(grupo) + 1)
        for n, j in enumerate(grupo, 1):
            inicio[j] = t0 + passo * n
    return [round(t, 1) if linhas[i].strip() else None for i, t in enumerate(inicio)], faltaram, len(conhecidas)


def decodificar(mp3):
    """MP3 → áudio mono 16 kHz (float32) pelo ffmpeg, sem depender da versão do PyAV."""
    import subprocess
    import numpy as np
    bruto = subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-i', str(mp3), '-f', 's16le', '-ac', '1', '-ar', '16000', '-'],
                           capture_output=True, check=True).stdout
    return np.frombuffer(bruto, np.int16).astype(np.float32) / 32768.0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('album', help='slug do álbum em faixasPrimeiras (ex.: trono-de-fogo)')
    ap.add_argument('--mp3', required=True, help='pasta com os MP3 do álbum (01-....mp3)')
    ap.add_argument('--modelo', default='mobiuslabsgmbh/faster-whisper-large-v3-turbo')
    args = ap.parse_args()

    dados = (RAIZ / 'js/dados/primeiras-versoes.js').read_text(encoding='utf-8')
    bloco = re.search(rf"'{re.escape(args.album)}': \{{\s*letras: '([a-z0-9-]+)'(.*?)\n  \}}", dados, re.S)
    if not bloco:
        sys.exit(f'Álbum {args.album} não está em faixasPrimeiras.')
    arquivo_letras = bloco.group(1)
    faixas = re.findall(r"arquivo: '([^']+)', duracao: (\d+)", bloco.group(2))
    letras = ler_js(RAIZ / f'js/dados/letras/{arquivo_letras}.js', 'letras')[args.album]

    from faster_whisper import WhisperModel
    try:
        modelo = WhisperModel(args.modelo, device='cuda', compute_type='float16')
    except Exception:   # sem GPU compatível: CPU (mais lento, uns 2 minutos por faixa)
        modelo = WhisperModel(args.modelo, device='cpu', compute_type='int8')

    tempos = []
    for n, (arquivo, duracao) in enumerate(faixas):
        linhas = letras[n] if n < len(letras) else []
        mp3 = Path(args.mp3) / arquivo
        audio = decodificar(mp3)
        # Primeiro sem dica (a letra como dica às vezes faz o Whisper "ouvir" só "Música"); se casar mal, tenta com ela.
        melhor = None
        for dica in (None, ' '.join(l for l in linhas if l)[:800]):
            segmentos, _ = modelo.transcribe(audio, language='pt', word_timestamps=True, vad_filter=False, initial_prompt=dica)
            palavras = [w for s in segmentos for w in (s.words or [])]
            tentativa = alinhar(linhas, palavras, float(duracao))
            if melhor is None or tentativa[2] > melhor[2]:
                melhor = tentativa
            cantadas = sum(1 for l in linhas if l.strip())
            if melhor[2] >= 0.8 * cantadas:
                break
        linha_tempos, faltaram, casadas = melhor
        tempos.append(linha_tempos)
        print(f'{arquivo}: {casadas} linhas pelo Whisper, {faltaram} estimadas')

    saida = RAIZ / f'js/dados/tempos/{arquivo_letras}.js'
    saida.parent.mkdir(exist_ok=True)
    cabecalho = (f'// Tempos da letra sincronizada de {args.album} (T-31, docs/15): segundo em que cada linha começa,\n'
                 f'// na mesma posição de js/dados/letras/{arquivo_letras}.js (null nas linhas vazias).\n'
                 f'// Gerado por ferramentas/tempos-da-letra.py (Whisper local); pode ser corrigido à mão.\n\n')
    corpo = json.dumps({args.album: tempos}, ensure_ascii=False, separators=(',', ':'))
    corpo = corpo.replace('],[', '],\n  [').replace(':[[', ':[\n  [').replace(']]}', ']\n]}')
    saida.write_text(cabecalho + 'export const tempos = ' + corpo + ';\n', encoding='utf-8')
    print(f'Gravado em {saida.relative_to(RAIZ)}')


if __name__ == '__main__':
    main()
