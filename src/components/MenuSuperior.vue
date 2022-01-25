<template>
    <div class="menu">
        <ul id="lista-menu">
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
        margin: 0px;
    }
    #lista-menu ul
    {
        list-style-type: none;
        padding: 0px;
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
