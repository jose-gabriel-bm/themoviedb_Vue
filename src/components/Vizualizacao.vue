<template>
    <MenuSuperior />
        <h3>teste</h3>
    <Rodape />
</template>

<script>
import MenuSuperior from './MenuSuperior.vue'
import Rodape from './Rodape.vue'
import axios from 'axios';

export default {
    name: 'Visualizacao',
    data() {
        return {

            };
    },
    components:{
        MenuSuperior,
        Rodape
    },
}
</script>

<style scoped>

</style>
