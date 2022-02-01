import Vue from 'vue';
import Router from 'vue-router';

import Home from './../views/Home';
import Visualizar from './../views/Visualizar';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name:'Home',
      component: Home,
    },
    {
      path: 'visualizar/:idmovie',
      name:'Visualizar',
      component: Visualizar,
    },

  ],
});
