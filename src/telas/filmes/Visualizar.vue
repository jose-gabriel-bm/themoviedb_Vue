<template>
    <div id="content">

        <div id="backgroundImage" :style="{ backgroundImage: `url('${urlImageFundo}')` }">
            <div id="cardMovie">
                <div id="image"><img :src=" urlImage + movie.poster_path"></div>
                <div id="title"><h4>{{movie.title}}</h4></div>
                <div id="Details">
                    <h6>Generos:<a v-for='genre in movie.genres' :key='genre.name'>{{ genre.name }} ,</a></h6>
                </div>
                <div id="subtitle"><h5>{{ movie.tagline}}</h5></div>
                <div id="synopsis"><h4>Sinopse</h4><p>{{ movie.overview}}</p></div>
            </div>
        </div>

        <div class="extraContent">

            <div v-if="this.newValue.length > 0" class="contentCarouselDetail">
                <div class="itemDetails">
                    <h4>Direção</h4>
                    <div class="Details">
                        <div class="Detail" v-for='value in newValue' :key='value.job' >
                            <h5 v-if="value.name"> {{ value.name }} </h5>
                            <h6 v-if="value.name"> Função: {{ value.job }} </h6>
                        </div>
                    </div>
                </div>
                <h5 v-if="movie.revenue" class="revenue">Receita: <a>{{ movie.revenue }}</a></h5>
                <h5 class="revenue">Duração Filme: <a>{{ movie.runtime}} minutos</a></h5>
            </div>

            <div class="contentCarousel">
                <h4>Elenco</h4>
                <div class="itemWrapper">
                    <div class="items" >
                        <div class="item" v-for='actor in cast' :key='actor.title'>
                            <div v-if="actor.profile_path"> 
                                <img id="imgCast" class="img" :src="urlImage + actor.profile_path" :alt="actor.title">
                                <h6 id="nameCast"> {{ actor.name }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
           
                <h4>Recomendações</h4>
                <div class="itemWrapper">
                    <div class="items" >
                        <div class="item" v-for='movieRecommendations in moviesRecommendations' :key='movieRecommendations.title'>
                            <router-link  :to="{name:'Visualizar',params:{idmovie:movieRecommendations.id}}">
                                <img class="img" :src="urlImage + movieRecommendations.poster_path" :alt="movieRecommendations.title">
                            </router-link>
                        </div>
                    </div>
                </div>

                <h4>Filmes Similares</h4>
                <div class="itemWrapper">
                    <div class="items" >
                        <div class="item" v-for='movieSimilar in moviesSimilar' :key='movieSimilar.id'>
                            <router-link  :to="{name:'Visualizar',params:{idmovie:movieSimilar.id}}">
                                <img class="img" :src="urlImage + movieSimilar.poster_path" :alt="movieSimilar.title">
                            </router-link>
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
        watch: {
            '$route' (to) {
                this.idMovie = to.params.idmovie;
                this.SearchMovie();
            }
        },
        name: 'Visualizar',
        created(){
            this.SearchMovie();
        }, 
        data() {
            return {
                idMovie:this.$route.params.idmovie,
                cast:'',
                movie:'',
                credits:'',
                newValue:'',
                moviesSimilar:'',
                urlImageFundo:'',
                moviesRecommendations:'',
                keyPo:'beed4e65bca0365111bd1076df78d4aa',  
                urlImage:'http://image.tmdb.org/t/p/w500/',
                urlApiThemovie:'https://api.themoviedb.org/3/movie/',
            };
        },
        methods:{
            SearchMovie(){
                this.SearchCredits();
                this.SearchSimilarMovie(); 
                this.SearchRecommendationsMovie();
                
                axios.get(this.urlApiThemovie + this.idMovie + '?api_key=' + this.keyPo +'&language=pt-BR')
                .then(response => {
                    this.movie = response.data
                    this.urlImageFundo = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${response.data.backdrop_path}`
                })  
            },
            SearchSimilarMovie(){
                axios.get(this.urlApiThemovie + this.idMovie +'/similar?api_key='+ this.keyPo +'&language=pt-BR&page=1')
                .then(response => {
                    this.moviesSimilar = response.data.results                
                })
            },
            SearchRecommendationsMovie(){
                axios.get(this.urlApiThemovie + this.idMovie +'/recommendations?api_key='+ this.keyPo +'&language=pt-BR&page=1')
                .then(response => {
                    this.moviesRecommendations = response.data.results                
                })
            },

            SearchCredits(){
                axios.get(this.urlApiThemovie + this.idMovie +'/credits?api_key='+ this.keyPo +'&language=pt-BR&page=1')
                .then(response => {
                    this.credits = response.data
                }).finally(() => {
                    this.SeekDirection();
                    this.SelectCast();
                });     
            },
            SelectCast(){
                let newValue = []
                for (let i = 0; i < this.credits.cast.length; i++){
                    if(this.credits.cast[i].popularity > 2.000 && this.credits.cast[i].profile_path != ''){
                        newValue.push(this.credits.cast[i])
                    }
                }
                this.cast = newValue;
            },
            SeekDirection(){
                let newValue = []
                for (let i = 0; i < this.credits.crew.length; i++){
                    if(this.credits.crew[i].known_for_department == 'Directing'){
                        newValue.push(this.credits.crew[i])
                    }
                }
                this.newValue = newValue;
            }, 

        }
    }
</script>

<style scoped>
    #backgroundImage{
        background-size: cover;
    }
    #cardMovie{
        height: 400px;
        padding: 40px;
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
    .extraContent{
        background-image:linear-gradient(to right, #e4dcdc94, #fcfcfcf8); 
        padding: 0px;
    }
    .contentCarousel{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        box-shadow: 0px 2px 10px rgba(84, 84, 85, 0.842); 
        background-color: #fff;
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
        height: 198px;
    }
    .Detail{
        flex: none;
        margin: 10px;
        height: 60px;
    }
    .contentCarouselDetail{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        background-color: #fff;
        margin: 3px;
        padding: 10px;
        float: right;
    }
    .revenue{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        color: rgb(3, 63, 131);
        padding: 5px;
        margin-bottom: 5px;       
    }
    .revenue a{
        color: rgb(54, 113, 182);
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
    #imgCast{
        border-radius:20px 20px 0px 0px;
        width: 150px;
        height: 220px;
    }
    #nameCast{
        margin: 10px;
        color: rgb(20, 54, 94);
    }
</style>
