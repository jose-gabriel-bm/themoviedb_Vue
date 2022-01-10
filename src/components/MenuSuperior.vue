<template>
    <div class="menu">
        
        <ul id="lista-menu">
            <li><img src="../assets/logo.png" alt="some text" width=80 height=80></li>
            <li><a href="#">Filmes</a></li>
            <li><a href="#">Series</a></li>
            <li><a href="#">Pessoas</a></li>
            <li><a href="#">Mais</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'MenuSuperior',
        data() {
            return {

            };
        },
    };
</script>

<style scoped>
    .menu 
    {
        box-sizing: border-box;
        background-image: linear-gradient(to right, #01507a, #02a3fa);
    }
    #lista-menu 
    {
        list-style-type: none;
        padding: 0;
    }
    #lista-menu li 
    {
        display: inline;
    }
    #lista-menu li a 
    {
        color: #fff;
        text-decoration: none;
        display: inline-block;
        padding: 20px;
    }
    #lista-menu li a:hover 
    {
        background-color: rgb(24, 139, 233);
    }
</style>
