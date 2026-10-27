import { linksBio } from '../dados/links.js';
import { novidades, rotaNovidade } from '../dados/novidades.js';
import { rotuloTema, capaNovidade } from '../modules/templates-novidades.js';
import { albuns, albumDestaque, salmosCobertos, comoFaco } from '../dados/albuns.js';
import { perfil } from '../dados/perfil.js';
import { reflexoes } from '../dados/reflexoes.js';
import { renderizarLista, botaoBio, cartaoNovidade, escapar } from '../modules/templates.js';
import { capaAlbum, seloIA } from '../modules/templates-musica.js';
import { animarCartoes } from '../modules/movimento.js';
import { prepararPlayerSpotify } from '../modules/player.js';
import { protegerCapas } from '../modules/protecao.js';

// Quantas novidades aparecem na home (as mais novas de js/dados/novidades.js).
const NOVIDADES_NA_HOME = 3;

// Números da home, calculados dos dados: atualizam sozinhos a cada lançamento.
function numeros() {
  const salmos = salmosCobertos().reduce((s, t) => s + (t.ate - t.de + 1), 0);
  const livros = [...new Set(albuns.map((a) => a.base || '').filter((b) => b && !/^Salmos?\b/.test(b)).map((b) => b.split(' ')[0]))];
  return [
    { valor: String(albuns.length), rotulo: 'álbuns' },
    { valor: String(salmos), rotulo: 'de 150 salmos' },
    livros.length ? { valor: livros.join(' e '), rotulo: 'cartas do Novo Testamento', texto: true } : null,
  ].filter(Boolean);
}

const retrato = () => (perfil.foto
  ? `<img src="${escapar(perfil.foto)}-240.webp" srcset="${escapar(perfil.foto)}-240.webp 240w, ${escapar(perfil.foto)}-480.webp 480w" sizes="7rem" alt="Foto de ${escapar(perfil.nome)}" width="240" height="240">`
  : `<span aria-hidden="true">${escapar(perfil.monograma)}</span>`);

function lancamento(a) {
  return `
    <a class="lancamento__capa" href="#/musica/${encodeURIComponent(a.slug)}" aria-label="Ver o álbum ${escapar(a.titulo)}">${capaAlbum(a, { carregamento: 'eager' })}</a>
    <div class="lancamento__texto">
      ${a.subtitulo ? `<p class="hero-album__serie">${escapar(a.subtitulo)}</p>` : ''}
      <p class="lancamento__titulo">${escapar(a.titulo)}</p>
      ${a.frase ? `<p class="texto-suave">${escapar(a.frase)}</p>` : ''}
      <div class="selo-ia selo-ia--curto" role="note">${seloIA(comoFaco, false)}</div>
      <div class="player" data-player-album></div>
    </div>`;
}

function frentes() {
  const capas = albuns.filter((a) => a.capa).slice(0, 4);
  // "Último" de cada frente, tirado dos dados: atualiza sozinho a cada publicação.
  const tecnologia = novidades.find((n) => n.tema === 'tecnologia');
  const ultimos = {
    '#/musica': albumDestaque()?.titulo,
    '#/ia-sem-labia': tecnologia?.titulo,
    '#/palavra': reflexoes[0] && `${reflexoes[0].titulo} (${reflexoes[0].referencia})`,
  };
  return [
    { rota: '#/musica', titulo: 'Música', texto: 'A Bíblia cantada: a série dos Salmos, Hebreus e o Tratado de Romanos, com player em cada álbum.',
      topo: `<div class="frente__mosaico" aria-hidden="true">${capas.map((a) => `<img src="${escapar(a.capa)}-480.webp" alt="" width="240" height="240" loading="lazy" draggable="false">`).join('')}</div>` },
    { rota: '#/ia-sem-labia', titulo: 'Tecnologia', texto: 'IA sem lábia: ferramentas explicadas sem exagero, com preço e fonte. E os meus projetos no GitHub.',
      topo: '<div class="frente__simbolo" aria-hidden="true">⚡</div>' },
    { rota: '#/palavra', titulo: 'Palavra', texto: 'Pregações e reflexões, ponto a ponto, com explicação das passagens difíceis.',
      topo: '<div class="frente__simbolo" aria-hidden="true">✝</div>', classe: 'frente--palavra' },
  ].map((f) => `
    <li class="col-md-6 col-lg-4" data-animar>
      <a class="cartao cartao--link frente${f.classe ? ' ' + f.classe : ''}" href="${f.rota}">
        ${f.topo}
        <strong class="frente__titulo">${escapar(f.titulo)}</strong>
        <span class="texto-suave">${escapar(f.texto)}</span>
        ${ultimos[f.rota] ? `<span class="frente__ultimo">Último: <strong>${escapar(ultimos[f.rota])}</strong></span>` : ''}
        <span class="nota-criacao__mais">Entrar <span aria-hidden="true">→</span></span>
      </a>
    </li>`).join('');
}

export function iniciarInicio(app) {
  // Topo
  const capas = albuns.filter((a) => a.capa);
  app.querySelector('[data-mosaico]').innerHTML = [...capas, ...capas].slice(0, 20)
    .map((a) => `<img src="${escapar(a.capa)}-480.webp" alt="" width="240" height="240" draggable="false">`).join('');
  app.querySelector('[data-retrato]').innerHTML = retrato();
  app.querySelector('[data-nome]').textContent = perfil.nome;
  app.querySelector('[data-frase]').textContent = perfil.frase;
  app.querySelector('[data-papeis]').innerHTML = perfil.papeis.map((p) => `<li>${escapar(p)}</li>`).join('');
  app.querySelector('[data-numeros]').innerHTML = numeros().map((n) => `
    <li class="numero${n.texto ? ' numero--texto' : ''}"><strong>${escapar(n.valor)}</strong><span>${escapar(n.rotulo)}</span></li>`).join('');

  // Último lançamento
  const destaque = albumDestaque();
  app.querySelector('[data-lancamento]').innerHTML = lancamento(destaque);
  if (destaque.spotifyId) {
    prepararPlayerSpotify(app.querySelector('[data-player-album]'), {
      tipo: 'album', id: destaque.spotifyId, titulo: `${destaque.titulo} no Spotify`, rotulo: 'Ouvir agora',
    });
  }

  // Atalhos (botões da bio) e Novidade
  renderizarLista(app.querySelector('[data-links]'), linksBio, botaoBio);
  const ultimas = novidades.slice(0, NOVIDADES_NA_HOME);
  if (ultimas.length) {
    app.querySelector('[data-novidade]').innerHTML = ultimas
      .map((n) => `<li>${cartaoNovidade(n, rotaNovidade(n), rotuloTema(n.tema), capaNovidade(n, 'cartao__imagem', 88, 110))}</li>`).join('');
    app.querySelector('#novidade').hidden = false;
  }

  app.querySelector('[data-frentes]').innerHTML = frentes();
  animarCartoes(app);
  protegerCapas(app);
  app.querySelectorAll('.home-topo__mosaico, .frente__mosaico').forEach((el) => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  });
}
