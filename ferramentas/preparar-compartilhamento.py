"""Auxiliar do gerador: Pillow, sem corte, imagens prontas e salvas no repositório.
Recebe JSON pelo stdin; não é executado pelo CI de conferência.
"""
import io
import json
import sys
from pathlib import Path
from PIL import Image, ImageOps

raiz = Path(__file__).resolve().parent.parent
pedido = json.load(sys.stdin)
for item in pedido['imagens']:
    fonte = (raiz / item['fonte']).resolve()
    destino = (raiz / item['destino']).resolve()
    if not fonte.is_relative_to(raiz / 'imagens') or not destino.is_relative_to(raiz / 'imagens/compartilhar/geradas'):
        raise ValueError('Caminho de imagem fora da pasta permitida')
    with Image.open(fonte) as original:
        capa = ImageOps.contain(ImageOps.exif_transpose(original).convert('RGBA'), (1200, 630), Image.Resampling.LANCZOS)
        quadro = Image.new('RGBA', (1200, 630), pedido['fundo'])
        quadro.alpha_composite(capa, ((1200 - capa.width) // 2, (630 - capa.height) // 2))
        quadro = quadro.convert('RGB')
        for qualidade in (90, 85, 80, 75, 70, 60, 50, 40):
            dados = io.BytesIO()
            quadro.save(dados, format='JPEG', quality=qualidade, optimize=True, subsampling=2)
            if dados.tell() < 300000:
                destino.parent.mkdir(parents=True, exist_ok=True)
                destino.write_bytes(dados.getvalue())
                break
        else:
            raise ValueError(f'Imagem excede 300 KB: {destino.name}')
