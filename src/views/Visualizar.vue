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

            <div class="contentCarouselDetail">

                <div class="itemDetails">
                    <h4>Direção</h4>
                    <div class="Details">
                        <div class="Detail" v-for='crew in crews' :key='crew.id'>
                            <h5> {{ crew.name }} </h5>
                            <h6> Função: {{ crew.job }} </h6>
                        </div>
                    </div>
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
                idMovie:'87',
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
                            // if(this.crews[i].job == 'Director' || this.crews[i].job == 'Writer' ){
                                newValue.push(this.crews[i])
                            // }
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
        padding: 3px;
    }
    .contentCarousel{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        box-shadow: 0px 2px 10px rgba(84, 84, 85, 0.842); 
        background-color: #fff;
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
    .itemDetails{
        width: 280px;
        height: 280px;
        padding: 5px;
        padding-top: 20px;
    }
    .Details{
        overflow-x: hidden;
        width: 280px;
        height: 140px;
    }

    .Detail{
        flex: none;
        margin: 10px;
        height: 70px;
    }
    .contentCarouselDetail{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        background-color: #fff;
        margin: 3px;
        padding: 10px;
        float: right;
    }
    .itemDetails h4{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        color: rgb(3, 63, 131);
        padding-bottom: 0px;
    }
    .itemDetails h5{
        color: rgb(20, 54, 94);
    }
    .itemDetails h6{
        color: rgb(54, 113, 182);
    }
</style>
