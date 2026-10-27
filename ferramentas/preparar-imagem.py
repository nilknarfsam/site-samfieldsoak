"""Prepara imagens para o site no tamanho e no formato certos (docs/12-metodo-de-publicacao-com-ia.md).

Uso, na raiz do repositório (precisa do Python 3 com Pillow: pip install pillow):

  python ferramentas/preparar-imagem.py capa <arquivo-original> <slug>
      Capa de álbum ou single, quadrada. Gera imagens/albuns/<slug>-480.webp e -960.webp.
      Nunca publique o arquivo grande (3000 px): ele fica no Drive.

  python ferramentas/preparar-imagem.py texto <arquivo-original> <pasta-em-imagens> <nome>
      Imagem no meio de um texto (novidade, IA sem lábia). Largura máxima de 1200 px.
      Ex.: ... texto foto.png novidades/meu-slug fluxo  ->  imagens/novidades/meu-slug/fluxo.webp

Não apaga nem sobrescreve nada sem avisar: se o arquivo de saída já existir, para e pergunta.
"""
import os
import re
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit('Falta o Pillow. Rode: pip install pillow  (ou converta em https://squoosh.app para WebP, qualidade 80)')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOME_VALIDO = re.compile(r'^[a-z0-9]+(-[a-z0-9]+)*$')


def salvar(imagem, destino):
    if os.path.exists(destino):
        resposta = input(f'{destino} já existe. Substituir? (s/N) ')
        if resposta.strip().lower() != 's':
            sys.exit('Nada foi alterado.')
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    imagem.save(destino, 'WEBP', quality=80, method=6)
    print(f'ok  {os.path.relpath(destino, RAIZ)}  ({imagem.size[0]}x{imagem.size[1]}, {os.path.getsize(destino) // 1024} KB)')


def capa(original, slug):
    if not NOME_VALIDO.match(slug):
        sys.exit(f'slug inválido: {slug} (minúsculas, sem acento, com hífen)')
    imagem = Image.open(original).convert('RGB')
    lado = min(imagem.size)
    if imagem.size[0] != imagem.size[1]:
        print(f'aviso: a imagem não é quadrada ({imagem.size[0]}x{imagem.size[1]}); vou cortar o centro.')
        x, y = (imagem.size[0] - lado) // 2, (imagem.size[1] - lado) // 2
        imagem = imagem.crop((x, y, x + lado, y + lado))
    if lado < 960:
        print(f'aviso: a capa tem só {lado} px; o ideal é 960 px ou mais.')
    for tamanho in (480, 960):
        salvar(imagem.resize((tamanho, tamanho), Image.LANCZOS), os.path.join(RAIZ, 'imagens', 'albuns', f'{slug}-{tamanho}.webp'))
    print(f"No dado do álbum: capa: 'imagens/albuns/{slug}'")


def texto(original, pasta, nome):
    if not all(NOME_VALIDO.match(p) for p in pasta.split('/')) or not NOME_VALIDO.match(nome):
        sys.exit('pasta e nome: minúsculas, sem acento, com hífen (ex.: novidades/meu-slug fluxo)')
    imagem = Image.open(original).convert('RGB')
    if imagem.size[0] > 1200:
        imagem = imagem.resize((1200, round(imagem.size[1] * 1200 / imagem.size[0])), Image.LANCZOS)
    salvar(imagem, os.path.join(RAIZ, 'imagens', pasta, f'{nome}.webp'))
    print(f"No dado: {{ imagem: 'imagens/{pasta}/{nome}.webp', alt: 'o que a imagem mostra' }}")


if __name__ == '__main__':
    argumentos = sys.argv[1:]
    if len(argumentos) == 3 and argumentos[0] == 'capa':
        capa(argumentos[1], argumentos[2])
    elif len(argumentos) == 4 and argumentos[0] == 'texto':
        texto(argumentos[1], argumentos[2], argumentos[3])
    else:
        sys.exit(__doc__)
