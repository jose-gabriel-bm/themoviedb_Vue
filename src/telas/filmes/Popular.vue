<template>
    <div class="conteudo">

        <div id="pesquisa">
            <input type="text" id="txtSearch" placeholder="Buscar..." />
            <img @click.prevent.stop="Search()" src="./../../assets/search.png" />
        </div>            

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
                <button @click.prevent.stop="MoreMovies()" id="buttonCarregarMais" type="button">
                    <h4>Carregar Filmes</h4>
                </button> 
                <button @click.prevent.stop="ReturnTop()" id="top">
                    <img src="./../../assets/up.png" width=30 height=30>
                </button>
            </div>          
        </div> 
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name:'Popular',
        created(){
            this.PopularMovie();
        },
        data(){
            return{
                results:'',
                moreMovies:'',
                page: 1,
                urlThemovie:'https://api.themoviedb.org/3/movie/popular',
                language:'&language=pt-BR&page=',
                keyPo:'?api_key=beed4e65bca0365111bd1076df78d4aa', 
            }
        },
        methods:{
            PopularMovie(){
                axios.get(this.urlThemovie + this.keyPo + this.language + this.page)
                .then(response => {
                    this.results = response.data.results 
                    this.page = this.page + 1;
                }) 
            },
            MoreMovies(){
                axios.get(this.urlThemovie + this.keyPo + this.language + this.page)
                .then(response =>{
                    this.moreMovies = response.data.results
                    for (let i = 0; i < this.moreMovies.length; i++){     
                        this.results.push(this.moreMovies[i])
                    }
                    this.page = this.page + 1;
                })   
            },
            ReturnTop(){
                window.scrollTo(0, 0);
            },
            Search(){
                console.log('teste do btn pesquisa')
            },

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
        background-image: linear-gradient(to right, #6c8592, #e5e9eb);
        border-color: #8abce277;
    }
    #top:hover{
        border-color: #2a7fad7c;
    }
    #buttonCarregarMais h4{
        margin: 0px;
    }
    #top h4{
        margin: 0px;
        color: #2a7fad;
    }
    #pesquisa{
        background-image: linear-gradient(to right,#4692bb, #4692bb86);
        border:solid 1px;
        border-radius:15px;
        width:500px;
        padding: 6px 10px;
        height: 46px;
    }
    #pesquisa img{
        cursor: pointer;
        height:30px;
        width:30px;
    }
    #txtSearch{
        outline: none;
        border:solid 1px;
        border-radius:15px;
        float:left;
        background-color:transparent;
        color:#FFF;
        padding-left:10px;
        font-size:20px;
        border:none;
        height:32px;
        width:445px;
    }
    #txtSearch::placeholder{
        color: #FFF;
    }
    
</style>