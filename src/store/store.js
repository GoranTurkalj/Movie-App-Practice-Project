import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  // State*******************************************************************
  state: {
    searchedTitle: "",
    resultsList: [],
    selectedTitleImg: "",
  },
  //Getters******************************************************************
  getters: {
    retrieveSearchedTitle: function(state) {
      return state.searchedTitle;
    },

    getResultsList: function(state) {
      return state.resultsList;
    },
  },
  //Mutations****************************************************************
  mutations: {
    //This mutation will fire on blur event in the input field when searching for movies or TV shows
    updateSearchedTitle: function(state, $event) {
      state.searchedTitle = $event.target.value;
    },

    //This mutation will fire from inside requestSearchResults action - when we get back the response from Movie Database.
    updateSearchResults: function(state, newList) {
      state.resultsList = newList;
    },
  },

  //Actions******************************************************************
  actions: {
    requestSearchResults: function(context) {
      if (!this.state.searchedTitle) {
        alert(
          "Please type in the name of a movie and then click the SEARCH button!"
        );
        return;
      }
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=9e612d73fdfb165c3aa123e0b09d606d&query=${this.state.searchedTitle}`
        )
        .then((response) => {
          const results = response.data.results;
          const basePosterURL = "https://image.tmdb.org/t/p/w200";

          //Filtering out titles which have a poster_path

          const filteredResults = results.filter((title) => {
            if (title.poster_path) {
              return title;
            }
          });
          //For every element in results - build the entire poster image URL
          filteredResults.forEach((title) => {
            title.fullPosterPath = `${basePosterURL}${title.poster_path}`;
          });

          //Then, update the resultsList in the state
          context.commit("updateSearchResults", filteredResults);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
