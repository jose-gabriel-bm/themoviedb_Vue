<template>
    <div class="conteudo">

        <div id="pesquisa">
        
        </div>            

        <div id="filmes"> 
            <div class="card" v-for='result in results' :key='result.id'>

                <div class="topCard">
                    <h4>
                        {{result.title}}
                    </h4>
                </div>
                <div class="mediaCard">
                    <img :src="'http://image.tmdb.org/t/p/w500/'+result.poster_path" >
                </div>
                <div class="bottomCard">
                    <h5>
                        Data Lançamento
                    </h5>
                    <p>
                        {{ result.release_date }}
                    </p>
                </div>
            </div> 
            <div class="buttonCarregar">
                <button @click.prevent.stop="MoreMovies()"
                    id="buttonCarregarMais" type="button">
                    <h4>Carregar Filmes</h4>
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
            }
        },
        methods:{
            PopularMovieSearch() {
                axios.get('https://api.themoviedb.org/3/movie/popular?api_key=beed4e65bca0365111bd1076df78d4aa&language=pt-BR&page=1')
                .then(response => {
                    this.results = response.data.results 
                })
            },
            MoreMovies(){
                axios.get('https://api.themoviedb.org/3/movie/popular?api_key=beed4e65bca0365111bd1076df78d4aa&language=pt-BR&page=2')
                .then(response => {
                    this.moreMovies = response.data.results
                }).finally(() => {
                    this.moreMovies.map(function(item){
                        this.results.push({21:item});
                        // console.log(this.results);
                    })
                });
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
        font-family:Verdana, Geneva, Tahoma, sans-serif;
    }
    #filmes {
        padding: 20px;
        padding-left: 30px;
        margin: 10px;
        width: 100%;
        height: 100%; 
    }
    .card {
        background: #FFF;
        box-shadow: 0px 2px 18px rgba(1, 21, 44, 0.274);
        border-radius: 20px;
        margin: 20px;
        margin-left: 20px;
        width: 250px;
        height: 200px;
        display: inline-table;
    }
    .topCard {
        padding: 15px;
        padding-top: 10px;
        padding-bottom: 5px;
        width: 100%;
        height: 100px;
    }
    .topCard h4 {
        cursor: pointer;
        margin: 0px;
        color: rgb(3, 63, 131);
    }
    .mediaCard {
        width: 100%;
        height: 100%;
    }
    .mediaCard img {
        cursor: pointer;
        width: 250px;
        height: 320px;
    }
    .bottomCard {
        padding: 15px;
        width: 100%;
        height: 100%;
    }
    .bottomCard h5 {
        margin: 0px;
        cursor: pointer;
        color: rgb(3, 63, 131);
    }
    .bottomCard p {
        margin: 0px;
        color: rgb(20, 54, 94);
    }
    .buttonCarregar{
        text-align: center;
    }
    #buttonCarregarMais h4{
        margin: 0px;
    }
    #buttonCarregarMais:hover{
        border-radius: 10px;
        border-color: #2a7fad;
        color: rgba(255, 255, 255, 0.863);
        background-image: linear-gradient(to right, #2a7fad, #4692bb);
    }
    #buttonCarregarMais{
        color: #FFF;
        float: center;
        width: 600px;
        padding: 15px;
        text-align: center;
        border-radius: 10px;
        border-color: #02a3fa;
        background-image: linear-gradient(to right, #01507a, #02a3fa);      
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;       
    }   
</style>