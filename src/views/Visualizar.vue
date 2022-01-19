<template>
    <div id="content">
        <div id="backgroundImage" :style="{ backgroundImage: `url('${urlImageFundo}')` }">
            <div id="cardMovie">
                <div id="image">
                    <img :src=" urlImage + movie.poster_path" >
                </div>
                <div id="title">
                    <h4>
                        {{movie.title}}
                    </h4>
                </div>
                <div id="Details">
                    <h6>Generos: 
                        <a v-for='genre in movie.genres' :key='genre.id'>{{ genre.name }} ,</a>
                    </h6>
                </div>
                <div id="subtitle">
                    <h5>
                        {{ movie.tagline}}
                    </h5>
                </div>
                <div id="synopsis">
                    <h4>Sinopse</h4>
                    <p>{{ movie.overview}}</p>
                </div>
            </div>
        </div>

        <div class="extraContent">

            <div id="gridCrew">
                <h4>Direção</h4>
                <div id="listCrew" v-for='crew in crews' :key='crew.id' >
                    <h5> {{ crew.name }} </h5>
                    <h6>  Função: {{ crew.job }} </h6>
                </div>
            </div>

            <div class="contentCarousel">

                <h4>Elenco</h4>
                <div class="itemWrapper">
                    <div class="items" >
                        <div class="item" v-for='movieSimilar in moviesSimilar' :key='movieSimilar.id'>
                            <img class="img" :src="urlImage + movieSimilar.poster_path" :alt="movieSimilar.title">
                        </div>
                    </div>
                </div>
           
                <h4>Recomendações</h4>
                <div class="itemWrapper">
                    <div class="items" >
                        <div class="item" v-for='movieRecommendations in moviesRecommendations' :key='movieRecommendations.id'>
                            <img class="img" :src="urlImage + movieRecommendations.poster_path" :alt="movieRecommendations.title">
                        </div>
                    </div>
                </div>

                <h4>Filmes Similares</h4>
                <div class="itemWrapper">
                    <div class="items" >
                        <div class="item" v-for='movieSimilar in moviesSimilar' :key='movieSimilar.id'>
                            <img class="img" :src="urlImage + movieSimilar.poster_path" :alt="movieSimilar.title">
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'Visualizar',
        created(){
            this.SearchMovie();
            this.SearchSimilarMovie();    
            this.seekDirection();
            this.SearchRecommendationsMovie();
        },
        beforeUpdate(){
            this.bannerBgImage();
        },
        data() {
            return {
                idMovie:'460458',
                movie:'',
                moviesSimilar:'',
                moviesRecommendations:'',
                urlImageFundo:'',
                crews:'',
                keyPo:'beed4e65bca0365111bd1076df78d4aa',  
                urlImage:'http://image.tmdb.org/t/p/w500/',
                urlApiThemovie:'https://api.themoviedb.org/3/movie/',
            };
        },
        methods:{
            SearchMovie(){
                axios.get(this.urlApiThemovie + this.idMovie +'?api_key='+ this.keyPo +'&language=pt-BR')
                .then(response => {
                    this.movie = response.data
                })
            },
            SearchSimilarMovie(){
                axios.get(this.urlApiThemovie + this.idMovie +'/similar?api_key='+ this.keyPo +'&language=pt-BR&page=1')
                .then(response => {
                    this.moviesSimilar = response.data.results                
                })
            },
            seekDirection(){
                // Busca a direção do filme
                 axios.get(this.urlApiThemovie + this.idMovie +'/credits?api_key='+ this.keyPo +'&language=pt-BR&page=1')
                .then(response => {
                    this.crews = response.data.crew

                    var newValue = []
                    for (let i = 0; i < this.crews.length; i++){
                        if(this.crews[i].known_for_department == 'Directing'){
                            newValue.push(this.crews[i])
                        }
                    }
                    this.crews = newValue;
                })
            },
            SearchRecommendationsMovie(){
                axios.get(this.urlApiThemovie + this.idMovie +'/recommendations?api_key='+ this.keyPo +'&language=pt-BR&page=1')
                .then(response => {
                    this.moviesRecommendations = response.data.results                
                })
            }, 
            bannerBgImage(){
                this.urlImageFundo = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${this.movie.backdrop_path}`;
            },

        }
    }
</script>

<style scoped>
    #backgroundImage{
        background-size: cover;
    }
    #cardMovie{
        height: 450px;
        padding: 50px;
        padding-bottom: 40px;
        display: grid;
        grid-template-columns: 270px repeat(2, 1fr);
        background-image:linear-gradient(to right, #141313a2, #6d65659f); 
    }
    #image {
        grid-row-start: 1;
        grid-row-end: 6;
    }
    #image img{
        width: 230px;
        height: 320px;
        padding: 0px;
        margin: 0px;
        box-shadow: 0px 2px 18px rgba(233, 236, 240, 0.842);
        border-radius: 10px;
    }
    #title {
        margin-top: 10px ;
        height: 20px;
        grid-column-start: 2;
        grid-column-end: 4;
        color:rgb(255, 255, 255);
    }
    #Details{
        color:rgb(227, 227, 231);
        margin-bottom: 30px;
        margin-top: 10px ;
        grid-column-start: 2;
        grid-column-end: 4;
    }
    #subtitle{
        color:rgb(227, 227, 231);
        margin-top: 20px;
        margin-bottom: 10px;
        grid-column-start: 2;
        grid-column-end: 4;
    }
    #synopsis{
        color: rgb(227, 227, 231);
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 4; 
        grid-row-end: 6;
        float:right;
    }
    #synopsis h4{
        color:rgb(255, 255, 255);
    }

    /* Conteudo extra */
    .extraContent{
        background-image:linear-gradient(to right, #e4dcdc94, #fcfcfcf8); 
        padding: 05px;
    }
    #gridCrew{
        margin: 10px;
        display: grid;
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
        grid-auto-rows: 70px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        box-shadow: 0px 2px 10px rgba(84, 84, 85, 0.842);   
    }
    #gridCrew h4{
        margin: 20px ;    
        grid-column-start: 1;
        grid-column-end: 5;
        color: rgb(3, 63, 131);
    }
    #listCrew{
        margin: 10px ; 
        height: 20px;
    }
    #listCrew h5{
        color: rgb(30, 118, 219);
    }
    #listCrew h6{
        color: rgb(12, 59, 112);
    }
    .contentCarousel{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        box-shadow: 0px 2px 10px rgba(84, 84, 85, 0.842); 
        background-color: #fff;
        margin: 0px;
        padding: 0px;
        border-radius: 10px;
    }
    .contentCarousel h4{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        color: rgb(3, 63, 131);
        padding: 20px;
        padding-bottom: 0px;
    }
    .itemWrapper{
        width: 94vw;
        margin: 10px;
        margin-top: 0px;
        margin-bottom: 0px;
        padding: 3px;
    }
    .items{
        display: flex;
        overflow-x: auto;
    }

    .item{
        flex: none;
    }
    .img{
        width: 200px;
        height: 290px;
        margin: 10px;
    }
</style>
