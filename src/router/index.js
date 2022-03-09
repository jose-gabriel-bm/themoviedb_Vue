import Vue from 'vue';
import Router from 'vue-router';
import Home from './../telas/Home';
import Visualizar from './../telas/filmes/Visualizar';

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name:'Home',
      component: Home,
    },
    {
      path: '/Visualizar/:idmovie',
      name:'Visualizar',
      component: Visualizar,
    },
  ],
});
