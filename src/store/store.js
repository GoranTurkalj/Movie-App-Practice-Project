import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  // State*******************************************************************
  state: {
    searchedTitle: "",
    resultsList: [],
    selectedTitle: "",
  },
  //Getters******************************************************************
  getters: {
    retrieveSearchedTitle: function(state) {
      return state.searchedTitle;
    },

    getResultsList: function(state) {
      return state.resultsList;
    },

    getSelectedTitle: function(state) {
      return state.selectedTitle;
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

    updateSelectedTitle: function(state, newTitle) {
      state.selectedTitle = newTitle;
    },
  },

  //Actions******************************************************************
  actions: {
    //Sends a request to the Movie Database
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
          const basePosterURL = "https://image.tmdb.org/t/p/w300";

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

    //Displays more options and details for the selected title - this action fires when a title img is clicked on.
    displaySelectedTitle: function({ commit, state, getters }, $event) {
      if ($event.target.tagName === "IMG") {
        for (const title of getters.getResultsList) {
          if (+$event.target.id === title.id) {
            //napraviti novi HTTP request za dobiti detaljnije podatke o filmu pomoću id-a
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${title.id}?api_key=9e612d73fdfb165c3aa123e0b09d606d&append_to_response=videos,images,credits`
              )
              .then((response) => {
                console.log(response);
              });

            commit("updateSelectedTitle", title);
            console.log(state.selectedTitle);
          }
        }

        //Axios call with the id of the movie
      }
    },
  },
});
