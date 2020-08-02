import router from "../../router";

const state = {
  selectedTitle: "",
};
const getters = {
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
      keywords.push(genre.name);
    }

    return keywords.length ? keywords.join(", ") : "No available info";
  },
  getReviewText: function(state, getters) {
    return getters.getSelectedTitle.review;
  },

  //This getter returns video key of the selectedTitle
  getSelectedTitleVideos: function(state) {
    if (state.selectedTitle.videos.results.length) {
      return state.selectedTitle.videos.results[0].key;
    } else {
      return null;
    }
  },

  getSelectedTitleImages: function(state) {
    return state.selectedTitle.images;
  },

  getUserRating: function(state) {
    return state.selectedTitle.userRating;
  },
};
const mutations = {
  updateSelectedTitle: function(state, newTitle) {
    state.selectedTitle = newTitle;
    console.log(
      "Selected title was just MUTATED to this: ",
      state.selectedTitle
    );
  },

  //This mutations sets selectedTitle to "" after the close button is clicked on the SelectedCard component
  clearSelectedTitle: function(state) {
    state.selectedTitle = "";
  },

  updateReviewText: function(state, value) {
    state.selectedTitle.review = value;
  },

  deleteReview: function(state) {
    state.selectedTitle.review = "";
  },

  setUserRating(state, value) {
    state.selectedTitle.userRating = +value;
  },
};
const actions = {
  //This action commits a mutation which sets the selectedTitle to "" and this will close SelectedCard component
  //Pokrećem je kad kliknem na X na selectedCard, zatim u TitleDetails i TitleVideo preko importanog mixina kad se klika na određene rute.
  closeSelectedTitle: function(context, $event) {
    context.commit("clearSelectedTitle");

    //Ako je baš kliknut button na selectedCard onda izvrtiti switch statement
    if ($event) {
      switch (router.currentRoute.name) {
        case "titleStory":
        case "titleGallery":
        case "titleReview":
        case "titleTrailer":
          router.replace("/");
          break;
        case "watchlistTitleStory":
        case "watchlistTitleGallery":
        case "watchlistTitleReview":
        case "watchlistTitleTrailer":
          router.replace("/watchlist");
          break;
      }
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
