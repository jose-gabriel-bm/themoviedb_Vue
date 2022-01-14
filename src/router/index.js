import Vue from 'vue';
import Router from 'vue-router';
import Vizualizacao from '@/components/Vizualizacao';
import index  from '@/components/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/',
      name: 'Vizualizacao',
      component: Vizualizacao,
    },
  ],
});
