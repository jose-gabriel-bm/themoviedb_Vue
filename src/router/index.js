import Vue from 'vue';
import Router from 'vue-router';

import Home from './../telas/Home';
import Visualizar from './../telas/filmes/Visualizar';
import Popular from './../telas/filmes/Popular';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/temporario',
      name:'Home',
      component: Home,
    },
    {
      path: '/Visualizar/:idmovie',
      name:'Visualizar',
      component: Visualizar,
    },
    {
      path: '/',
      name:'Popular',
      component: Popular,
    }
  ],
});
