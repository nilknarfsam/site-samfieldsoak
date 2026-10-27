import { iniciarRoteador } from './modules/roteador.js';
import { registrarMenu } from './modules/menu.js';
import { registrarCompartilhar } from './modules/compartilhar.js';
import { iniciarInicio } from './telas/inicio.js';
import { iniciarIaLista, registrarEventosIaLista } from './telas/ia-lista.js';
import { iniciarIaDetalhe } from './telas/ia-detalhe.js';
import { iniciarMusica } from './telas/musica.js';
import { iniciarMusicaDetalhe } from './telas/musica-detalhe.js';
import { iniciarPalavraLista } from './telas/palavra-lista.js';
import { iniciarPalavraDetalhe } from './telas/palavra-detalhe.js';
import { iniciarNovidadesLista } from './telas/novidades-lista.js';
import { iniciarNovidadesDetalhe } from './telas/novidades-detalhe.js';

const rotas = {
  inicio: { view: 'html/inicio.html', titulo: 'Início', iniciar: iniciarInicio },
  novidades: {
    view: 'html/novidades-lista.html', titulo: 'Novidades', iniciar: iniciarNovidadesLista,
    detalhe: { view: 'html/novidades-detalhe.html', iniciar: iniciarNovidadesDetalhe },
  },
  'ia-sem-labia': {
    view: 'html/ia-lista.html', titulo: 'IA sem lábia', iniciar: iniciarIaLista,
    detalhe: { view: 'html/ia-detalhe.html', iniciar: iniciarIaDetalhe },
  },
  musica: {
    view: 'html/musica.html', titulo: 'Música', iniciar: iniciarMusica,
    // Seções da página (índice no topo). Nenhuma pode ter o mesmo nome de um slug de álbum.
    ancoras: ['lancamento', 'por-tras', 'como-eu-faco', 'jornada', 'ouvir', 'discografia', 'singles', 'primeiras-versoes'],
    detalhe: { view: 'html/musica-detalhe.html', iniciar: iniciarMusicaDetalhe },
  },
  palavra: {
    view: 'html/palavra-lista.html', titulo: 'Palavra', iniciar: iniciarPalavraLista,
    detalhe: { view: 'html/palavra-detalhe.html', iniciar: iniciarPalavraDetalhe },
  },
  sobre: { view: 'html/sobre.html', titulo: 'Sobre' },
};

const app = document.getElementById('app');
document.querySelector('[data-ano]').textContent = String(new Date().getFullYear());   // ano do rodapé
registrarMenu();
registrarEventosIaLista(app);
registrarCompartilhar(app);
iniciarRoteador(rotas);
