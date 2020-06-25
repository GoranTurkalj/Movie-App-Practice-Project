<template>
  <div id="app">
    <app-header></app-header>
    <input type="text" @input="searchInput = $event.target.value" />
    <button @click="getMovie">SEARCH</button>
    <hr />
    <h2>This is movie image:</h2>
    <img :src="picture" alt="" />
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Footer from "./components/header/Header.vue";
import axios from "axios";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  },

  //Data properties ******************************************
  data() {
    return {
      searchInput: "",
      picture: "",
      backdropPath: "",
      baseURL: ""
    };
  },
  //Methods****************************************************
  methods: {
    getMovie: function() {
      console.log(this.searchInput);
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=9e612d73fdfb165c3aa123e0b09d606d&query=${this.searchInput}`
        )
        .then(response => {
          let movieId = response.data.results[0].id;

          return axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=9e612d73fdfb165c3aa123e0b09d606d&append_to_response=videos,images`
          );
        })
        .then(response => {
          console.log(response.data);
          this.backdropPath = response.data.backdrop_path;

          this.picture = `https://image.tmdb.org/t/p/original/${this.backdropPath}`;
        });
    }
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
}
</style>
