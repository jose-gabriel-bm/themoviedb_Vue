<template>
  <div id="app">
    <MenuSuperior />
    <router-view/>   
    <Rodape />
  </div>
</template>
<script>
  import MenuSuperior from './components/MenuSuperior.vue'
  import Rodape from './components/Rodape.vue'
    export default {
      name: 'App',
      components: {
      MenuSuperior,
      Rodape,
      }
    }
</script>
<style></style>