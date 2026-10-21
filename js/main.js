import { iniciarRoteador } from './modules/roteador.js';
import { registrarMenu } from './modules/menu.js';
import { iniciarInicio } from './telas/inicio.js';
import { iniciarIaLista, registrarEventosIaLista } from './telas/ia-lista.js';
import { iniciarIaDetalhe } from './telas/ia-detalhe.js';
import { iniciarMusica } from './telas/musica.js';
import { iniciarMusicaDetalhe } from './telas/musica-detalhe.js';
import { iniciarPalavraLista } from './telas/palavra-lista.js';
import { iniciarPalavraDetalhe } from './telas/palavra-detalhe.js';

const rotas = {
  inicio: { view: 'html/inicio.html', titulo: 'Início', iniciar: iniciarInicio },
  'ia-sem-labia': {
    view: 'html/ia-lista.html', titulo: 'IA sem lábia', iniciar: iniciarIaLista,
    detalhe: { view: 'html/ia-detalhe.html', iniciar: iniciarIaDetalhe },
  },
  musica: {
    view: 'html/musica.html', titulo: 'Música', iniciar: iniciarMusica, ancoras: ['como-eu-faco', 'primeiras-versoes'],
    detalhe: { view: 'html/musica-detalhe.html', iniciar: iniciarMusicaDetalhe },
  },
  palavra: {
    view: 'html/palavra-lista.html', titulo: 'Palavra', iniciar: iniciarPalavraLista,
    detalhe: { view: 'html/palavra-detalhe.html', iniciar: iniciarPalavraDetalhe },
  },
  sobre: { view: 'html/sobre.html', titulo: 'Sobre' },
};

const app = document.getElementById('app');
registrarMenu();
registrarEventosIaLista(app);
iniciarRoteador(rotas);
