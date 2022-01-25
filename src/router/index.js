import Vue from 'vue';
import VueRouter from 'vue-router';
import Vizualizacao from '../views/Vizualizacao';
import Home  from '../views/Home';

Vue.use(VueRouter);

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Vizualizacao',
      name: 'Vizualizacao',
      component: Vizualizacao,
    },
  ],
});
