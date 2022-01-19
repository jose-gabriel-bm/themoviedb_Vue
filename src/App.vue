<template>
  <div id="app">
    <MenuSuperior />
    <Visualizar />
    <!-- <Home /> -->
    <Rodape />
  </div>
</template>

<script>
import MenuSuperior from './components/MenuSuperior.vue'
import Visualizar from './views/Visualizar.vue'
// import Home from './views/Home.vue'
import Rodape from './components/Rodape.vue'


export default {
  name: 'App',
  components: {
    MenuSuperior,
    // Home,
    Visualizar,
    Rodape,
  }
}
</script>

<style>

</style>
