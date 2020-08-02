import axios from "axios";

const state = {
  resultsList: [],
};

const getters = {
  getResultsList: function(state) {
    return state.resultsList;
  },
};

const mutations = {
  //This mutation will fire from inside requestSearchResults action - when we get back the response from Movie Database.
  updateSearchResults: function(state, newList) {
    state.resultsList = newList;
  },

  //Clears resultsList - commited in logOutUser action
  clearSearchResults: function(state) {
    state.resultsList = [];
  },
};

const actions = {
  //Sends a request to the Movie Database
  requestSearchResults: function(context) {
    if (!this.state.searchedTitle) return;

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

        context.commit("updateSearchResults", filteredResults);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
