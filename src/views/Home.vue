<template>
    <div class="conteudo">

        <div id="pesquisa">
        
        </div>            

        <div id="filmes"> 

            <div class="card" v-for='result in results' :key='result.id'>

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

                <button @click.prevent.stop="ReturnTop()" 
                    id="top">
                    <h4>Topo</h4>
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
                axios.get('https://api.themoviedb.org/3/movie/popular?api_key=beed4e65bca0365111bd1076df78d4aa&language=pt-BR&page='+ this.page)
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
        width: 80px;
        float: right;
        margin-right: 20px;
    }
    #buttonCarregarMais h4{
        margin: 0px;
    }
    #top h4{
        margin: 0px;
    }
    
</style>