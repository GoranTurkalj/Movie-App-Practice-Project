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
    baseImageURL: "https://image.tmdb.org/t/p/w500",
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

    getDirector: function(state, getters) {
      const crew = getters.getSelectedTitle.crew;
      const directors = [];
      for (const person of crew) {
        if (person.job === "Director") {
          directors.push(person.name);
        }
      }
      return directors.length ? directors.join(", ") : "No available info";
    },

    getProducer: function(state, getters) {
      const crew = getters.getSelectedTitle.crew;
      const producers = [];
      for (const person of crew) {
        if (producers.length < 3 && person.job === "Executive Producer") {
          producers.push(person.name);
        }
      }
      return producers.length ? producers.join(", ") : "No available info";
    },

    getCast: function(state, getters) {
      const cast = getters.getSelectedTitle.cast;
      const mainCast = [];

      for (const person of cast) {
        if (cast.length && mainCast.length < 4) {
          mainCast.push(person.name);
        }
      }

      return mainCast.length ? mainCast.join(", ") : "No available info";
    },

    getGenres: function(state, getters) {
      const genres = getters.getSelectedTitle.genres;
      const keywords = [];
      for (const genre of genres) {
        console.log(genre.name);
        keywords.push(genre.name);
      }

      return keywords.length ? keywords.join(", ") : "No available info";
    },

    //This getter returns video key of the selectedTitle
    getSelectedTitleVideos: function(state) {
      return state.selectedTitle.videos.results[0].key;
    },

    getSelectedTitleImages: function(state) {
      return state.selectedTitle.images;
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

    //This mutations sets selectedTitle to "" after the close button is clicked on the SelectedCard component
    clearSelectedTitle: function(state) {
      state.selectedTitle = "";
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

          //Filtering out titles which have a poster_path

          const filteredResults = results.filter((title) => {
            if (title.poster_path) {
              return title;
            }
          });
          //For every element in results - build the entire poster image URL
          filteredResults.forEach((title) => {
            title.fullPosterPath = `${this.state.baseImageURL}${title.poster_path}`;
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
        //Create new empty variable - this will hold the necessary detailed data from the response
        let selectedTitleData = null;

        //Napraviti loop kroz listu rezultata i ako kliknuti img ima isti id kao i title na listi, napraviti HTTP request s tim title id-om za dobiti detaljnije podatke
        for (const title of getters.getResultsList) {
          if (+$event.target.id === title.id) {
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${title.id}?api_key=9e612d73fdfb165c3aa123e0b09d606d&append_to_response=videos,images,credits`
              )
              .then((response) => {
                console.log(response.data);
                const data = response.data;

                data.images.backdrops.forEach((image) => {
                  image.fullImagePath = `${this.state.baseImageURL}${image.file_path}`;
                });

                selectedTitleData = {
                  fullPosterPath: title.fullPosterPath,
                  overview: data.overview,
                  tagline: data.tagline,
                  budget: data.budget,
                  language: data.original_language,
                  genres: data.genres,
                  homepage: data.homepage,
                  images: data.images.backdrops,
                  runtime: data.runtime,
                  revenue: data.revenue,
                  releaseDate: data.release_date,
                  originalTitle: data.original_title,
                  title: data.title,
                  videos: data.videos,
                  rating: data.vote_average,
                  votes: data.vote_count,
                  cast: data.credits.cast,
                  crew: data.credits.crew,
                };

                //Commitati mutaciju za updetjanje selectedTitle
                commit("updateSelectedTitle", selectedTitleData);
                console.log(state.selectedTitle);
              });
          }
        }
      }
    },

    //This action commits a mutation which sets the selectedTitle to ""
    closeSelectedTitle: function(context) {
      context.commit("clearSelectedTitle");
    },
  },
});
