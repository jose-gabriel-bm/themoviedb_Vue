<template>
    <div class="rodape"> 
        <div id="logo">
            <img src="../assets/logo.png" alt="some text" width=150 height=150>
        </div>
        <div>
            <h3>O BÁSICO</h3>
            <ul>
                <li><a href="#">Sobre o TMDB</a></li>
                <li><a href="#">Contate-nos</a></li>
                <li><a href="#">Suporte</a></li>
                <li><a href="#">API</a></li>
            </ul>
        </div>
        <div>
            <h3>ENVOLVA-SE</h3>
            <ul>
                <li><a href="#">Bíblia do Colaborador</a></li>
                <li><a href="#">Aplicativos de terceiros</a></li>
                <li><a href="#">Adicionar um novo Filme</a></li>
                <li><a href="#">Adicionar uma nova Série</a></li>
            </ul>
        </div>
        <div>
            <h3>COMUNIDADE</h3>
            <ul>
                <li><a href="#">Diretrizes</a></li>
                <li><a href="#">Discussões</a></li>
                <li><a href="#">Placar de colaboradores</a></li>
                <li><a href="#">Twitter</a></li>
            </ul>
        </div>
        <div>
            <h3>LEGALIDADE</h3>
            <ul>
                <li><a href="#">Termos de uso</a></li>
                <li><a href="#">Termos de Uso da API</a></li>
                <li><a href="#">Suporte</a></li>
                <li><a href="#">Política de privacidade</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Rodape'
    }
</script>

<style scoped>
    .rodape
    {
        box-sizing: border-box;
        background-image: linear-gradient(to right, #01507a, #02a3fa);
        width: 100%;
    }
    .rodape div{
        color: white;
        display: inline-block; 
        margin: 40px;
        margin-top: 20px;
        margin-bottom: 20px;

    }
    .rodape div ul{
        list-style-type: none;
        padding: 5px;
    }
    .rodape div ul li a{
        text-decoration: none;
        color: white;  
    }
    #logo img {
        vertical-align: baseline;
    }
</style>