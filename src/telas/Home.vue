<template>

    
    <div class="conteudo">
        {{pages}}
        <div class="div_linhas">
            <div id="div_busca">
                <input type="text" placeholder="Digite aqui ..." v-model="inputSearch"/>
            </div>
            <button id="btn_busca" @click.prevent.stop="search()"><h5>Pesquisar</h5></button>
                <button v-if="inputSearch" @click.prevent.stop="clean()" id="limpar-pesquisa">
                    <img src="./../assets/botao-fechar.png" width=30 height=30>
                </button>
        </div>

        <!-- filtro -->
        <div id="div_formulario">
            <button v-if="limpar" type="button" id="btn_limpar-formulario" @click.prevent.stop="clean()">
                <h4>Limpar Filtro</h4>
            </button>
            <div id="div_btn-formulario" @click.prevent.stop="dropdown()">
                <h4>Filtro</h4>
            </div>
            <form v-show="display" id="formulario"> 
                <div>
                    <h5>Data de lancamento</h5>
                    <div class="div_linhas">
                        <div class="div_data">
                            <h5>De:</h5>
                            <input class="input-data" type="date" v-model="data_de"/>
                        </div>
                        <div class="div_data">
                            <h5>Ate:</h5>
                            <input class="input-data" type="date" v-model="data_ate"/>
                        </div>
                    </div>
                </div>
                <div class="div_linhas">
                    <div id="div_generos">
                        <h5>Generos</h5>        
                        <select id="Generos"  v-model="genero">
                            <option></option>
                            <option value="16">Animação</option>
                            <option value="12">Ação</option>
                            <option value="12">Aventura</option>
                            <option value="35">Comédia</option>
                            <option value="80">Crime</option>
                            <option value="10751">Familia</option>
                            <option value="18">Drama</option>
                            <option value="99">Documentário</option>
                            <option value="9648">Mistério</option>
                            <option value="10749">Romance</option>
                            <option value="27">Terror</option>                       
                        </select>
                    </div>
                    <div id="classificacao">
                        <h5>Classificação</h5>
                        <select id="select_classificacao" v-model="classificacao">
                            <option></option>
                            <option value="L">L</option>
                            <option value="10">10</option>
                            <option value="12">12</option>
                            <option value="14">14</option>
                            <option value="16">16</option>
                            <option value="18">18</option>
                        </select>
                    </div>
                </div>
                <button type="button" id="btn_enviar-formulario" @click.prevent.stop="filter()">
                    <h4>Filtrar</h4>
                </button>
            </form>
            
        </div>
        <!-- final Filtro -->

        <div id="filmes"> 
            <div class="card" v-for='result in results' :key='result.id'>
                <div class="mediaCard">
                    <router-link  :to="{name:'Visualizar',params:{idmovie:result.id}}">
                        <img :src="'http://image.tmdb.org/t/p/w500/'+result.poster_path" >
                    </router-link>
                </div>
                <div class="bottomCard">
                    <h5>Data Lançamento</h5>
                    <p>{{ result.release_date }}</p>
                </div>
            </div> 
            <div class="buttonCarregar">
                <button @click.prevent.stop="MoreMovies(url)" id="buttonCarregarMais" type="button">
                    <h4>Carregar Filmes</h4>
                </button> 
                <button @click.prevent.stop="ReturnTop()" id="top">
                    <img src="./../assets/up.png" width=30 height=30>
                </button>
            </div>          
        </div> 
    </div>

</template>

<script>
import axios from 'axios';

    export default {
        name:'Home',
        created(){
            this.PopularMovieSearch();
        },
        data(){
            return{
                results:'',
                moreMovies:'',
                page: 2,
                urlApiThemovie:'https://api.themoviedb.org/3/movie/popular',
                keyPo:'beed4e65bca0365111bd1076df78d4aa', 
                genero:'',
                classificacao:'',
                data_de:'',
                data_ate:'',
                url:'',
                limpar:'',
                inputSearch:'',
                display: false
            }
        },
        methods:{
            PopularMovieSearch() {
                this.url = this.urlApiThemovie +'?api_key='+ this.keyPo +'&language=pt-BR&page='
                axios.get(this.url+'1')
                .then(response => {
                    this.results = response.data.results 
                })
            },
            MoreMovies(url){
                axios.get(url+ this.page)
                .then(response => {
                    this.moreMovies = response.data.results
                    for (let i = 0; i < this.moreMovies.length; i++){     
                        this.results.push(this.moreMovies[i])
                    }
                }).finally(() => {
                    this.page = this.page + 1;
                });    
            },
            ReturnTop(){
                window.scrollTo(0, 0);
            },
            filter(){
                if(this.inputSearch){
                    // for (let i = 0; i < this.results.length; i++){     
                    //     console.log(this.results[i]);
                    // }
                    alert('tem pesquisa presisa filtrar')
                }else{                
                    this.url = 'https://api.themoviedb.org/3/discover/movie?api_key='+ 
                    this.keyPo +'&language=pt-BR&with_genres='+this.genero+'&certification_country=BR&certification='+
                    this.classificacao+'&primary_release_date.gte='+this.data_de+'&primary_release_date.lte='+this.data_ate+'&page='
                    axios.get(this.url).then(response => {
                        this.results = response.data.results
                    });
                }
                if(this.limpar || this.genero || this.classificacao || this.data_de || this.data_ate){
                    this.limpar = 'filtro'
                    this.dropdown();
                }
            }, 
            clean(){
                this.PopularMovieSearch();                
                this.limpar ='';
                this.genero = '',
                this.classificacao ='',
                this.data_de ='',
                this.data_ate ='',
                this.inputSearch = ''
                if(this.display == true){
                    this.dropdown();
                }        
            },
            search(){
                this.url =  'https://api.themoviedb.org/3/search/movie?api_key='+ 
                this.keyPo +'&language=pt-BR&query='+ this.inputSearch +'&include_adult=false&page='

                axios.get(this.url).then(response => {
                    this.results = response.data.results
                })             
                if(this.limpar || this.genero || this.classificacao || this.data_de || this.data_ate){
                    this.filter();
                }
            },
            dropdown(){
                if(this.display == true){
                    this.display = false;
                }else{
                    this.display = true;
                }
            }
        }
    }
</script>

<style scoped>
    .conteudo {
        padding: 30px;
        margin: 0px;
        width: 100%;
        height: 100%;
        min-height: 500px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
    }
    #filmes {
        padding: 5px;
        padding-left: 20px;
        margin: 5px;
        margin-top: 20px;
        width: 100%;
        height: 100%; 
    }
    .card {
        background: #FFF;
        box-shadow: 0px 2px 18px rgba(1, 21, 44, 0.274);
        border-radius: 15px;
        margin: 10px;
        margin-left: 5px;
        width: 250px;
        height: 200px;
        display: inline-table;
    }
    .mediaCard {
        width: 100%;
        height: 100%;
    }
    .mediaCard img {
        cursor: pointer;
        width: 250px;
        height: 320px;
        border-radius: 15px 15px 0px 0px;
    }
    .bottomCard {
        padding: 10px;
        width: 100%;
        height: 100%;
    }
    .bottomCard h5 {
        margin: 0px;
        margin-top: 5px;
        cursor: pointer;
        color: rgb(3, 63, 131);
    }
    .bottomCard p {
        margin-top: 5px;
        margin-bottom: 0px;
        color: rgb(20, 54, 94);
    }
    .buttonCarregar{
        text-align: center;
        margin-top: 40px;
    }
    .buttonCarregar button{
        padding: 15px;
        text-align: center;
        border-radius: 10px;
        border-color: #02a3fa;
        background-image: linear-gradient(to right, #01507a, #02a3fa);      
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; 
        color: #FFF;
    }
    .buttonCarregar button:hover{
        border-radius: 10px;
        border-color: #2a7fad;
        color: rgba(255, 255, 255, 0.863);
        background-image: linear-gradient(to right, #2a7fad, #4692bb);
    }
    #buttonCarregarMais{
        width: 600px;
        float: center;
    } 
    #top{
        padding: 0px;
        width: 60px;
        height: 50px;
        float: right;
        margin-right: 20px;
        background-image: linear-gradient(to right, #115d86, #079be6);
        border-color: #8abce277;
    }
    #top:hover{
        background-image: linear-gradient(to right, #3ca1d8, #07a9fa);
    }
    #buttonCarregarMais h4{
        margin: 0px;
    }
    #top h4{
        margin: 0px;
        color: #2a7fad;
    }
    /* btn limpar */
    #btn_limpar-formulario{
        background-image: linear-gradient(to right, #690a0a, #cc1f1f);
        color: #fff;
        border-radius: 10px ;
        border: none;
        text-align: center;
        float:right;
        margin-right: 25px;
        margin-bottom: 0px;
    }
    #btn_limpar-formulario:hover{
        background-image: linear-gradient(to right, #ac1818, #d41010);
        color: aliceblue;
    }
    #btn_limpar-formulario h4{
        margin: 5px;
    }
    

    /* geral formulario */
    #formulario
    {
        width: 480px;
        padding: 20px;
        margin: 30px;
        margin-bottom: 0px;
        margin-top: 0px;
        color: #fff;
        background-color: #a2bac9;
        box-shadow: 0px 2px 18px rgba(233, 236, 240, 0.842);
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; 
    }
    #div_formulario h5{
        margin: 0px ;
        margin-bottom: 10px;
        margin-right: 10px;
        margin-top: 5px;
    } 
    #div_formulario:hover form
    {
        display: block;
        cursor: pointer;
        border-radius: 0px 20px 20px 20px ;
    }
    .div_linhas
    {
        margin-top: 10px;
        margin-bottom: 40px;
        display: flex;
    }
    #div_btn-formulario
    {
        padding: 10px;
        margin: 30px;
        background-image: linear-gradient(to right, #01507a, #02a3fa);
        color: #fff;
        margin-bottom: 0px;
        height: 50px;
        width: 100px;
    }
    #div_btn-formulario:hover
    {
        cursor: pointer;
    }

    /* button pesquisar */
    #btn_enviar-formulario{
        background-image: linear-gradient(to right, #01507a, #02a3fa);
        color: #fff;
        border-radius: 10px ;
        border: none;
        padding: 5px;
        text-align: center;
        width: 435px;
    }
    #btn_enviar-formulario:hover{
        background-image: linear-gradient(to right, #1396dd, #02a3fabe);
    }
    #btn_enviar-formulario h4{
        margin: 5px;
    }

    /* div classificacao */
    #classificacao
    {
        display: flex;
    }
    #select_classificacao
    {
        width: 50px;
        color: #fff;
        padding: 5px;
        font-size: 16px;
        border: 2px;
        border-radius: 5px;
        height: 34px;
        background-color:#01507a;
    }

    /* div data lancamento */
    .div_data
    {
        margin-right: 20px;
        display: flex;
    }
    .input-data
    {
        color: #fff;
        background-color:#01507a;
        padding: 5px;
        font-size: 16px;
        border: 2px;
        border-radius: 5px;
        height: 34px;
        width: 160px;
    }

    /* div busca */
    #div_busca
    {
        margin-left: 30px;
        margin-right: 20px;
    }
    #div_busca input
    {
        width: 330px;
        color: #fff;
        padding: 10px;
        font-size: 16px;
        border: 2px;
        border-radius: 5px;
        background-color: #a2bac9;
        box-shadow: 0px 2px 18px rgba(233, 236, 240, 0.842);
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; 
    }
    #btn_busca
    {
        background-image: linear-gradient(to right, #01507a, #02a3fa);
        color: #fff;
        border-radius: 5px ;
        border: none;
        padding: 5px;
        text-align: center;
    }
    #btn_busca h5{
        margin: 0px;
    }

    /* div generos */
    #div_generos
    {
        display: flex;
    }
    #Generos
    {
        width: 150px;
        color: #fff;
        padding: 5px;
        font-size: 16px;
        border: 2px;
        border-radius: 5px;
        height: 34px;
        background-color:#01507a;
        margin-right: 20px;
    }

    #limpar-pesquisa{
        color: aliceblue;
        font-size: 16px;
        border: 2px;
        border-radius: 5px;
        height: 40px;
        width: 40px;
        margin: 10px;
        margin-top: 2px;
        margin-bottom: 2px;
        background-image: linear-gradient(to right, #ac1818, #d41010);  
    }
</style>