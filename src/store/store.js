import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export const store = new Vuex.Store({
  // State*******************************************************************
  state: {
    token: null,
    userId: null,
    user: "",
    searchedTitle: "",
    resultsList: [],
    selectedTitle: "",
    baseImageURL: "https://image.tmdb.org/t/p/w500",
  },
  //Getters******************************************************************
  getters: {
    isAuthenticated: function(state) {
      return state.token !== null; //ovisno je li true ili false, prikazujem u Headeru watchlist link
    },

    getUser: function(state) {
      return state.user;
    },

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
        keywords.push(genre.name);
      }

      return keywords.length ? keywords.join(", ") : "No available info";
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

    getWatchlist: function(state) {
      return state.user.watchlist;
    },
  },
  //Mutations****************************************************************
  mutations: {
    //authenticateUser mutacija updejta userId i token, prima userData iz responsea koji primim s Firebasea
    authenticateUser: function(state, userData) {
      state.token = userData.idToken;
      state.userId = userData.localId; //ovo je user id iz responsa
    },

    //Storam u state podatke fetchanog usera iz databasea - mutacija se commita u fetchUserData akciji nakon što stigne response
    storeFetchedUser: function(state, fetchedUser) {
      state.user = fetchedUser;
    },

    //This mutation is commited from logOutUser action
    clearAuthData: function(state) {
      state.token = null;
      state.userId = null;
      state.user = ""; //podaci o user - ime, watchlist
      if (router.currentRoute.name !== "signin") {
        router.replace("signin");
      }
    },

    //This mutation will fire on blur event in the input field when searching for movies or TV shows
    updateSearchedTitle: function(state, $event) {
      state.searchedTitle = $event.target.value;
    },

    //This mutation will fire from inside requestSearchResults action - when we get back the response from Movie Database.
    updateSearchResults: function(state, newList) {
      state.resultsList = newList;
    },

    //Clears resultsList - commited in
    clearSearchResults: function(state) {
      state.resultsList = [];
    },

    updateSelectedTitle: function(state, newTitle) {
      state.selectedTitle = newTitle;
    },

    //This mutations sets selectedTitle to "" after the close button is clicked on the SelectedCard component
    clearSelectedTitle: function(state) {
      state.selectedTitle = "";
    },

    //When "Add to watchlist" button is pressed - the selectedTitle data is added as an object to the user.watchlist array
    updateWatchlist: function(state) {
      state.user.watchlist.push(state.selectedTitle);
      console.log(state.user.watchlist);
    },
  },

  //Actions******************************************************************
  actions: {
    //Dispatcha se unutar beforeEach globalnog route guarda u router.js
    attemptAutoLogin: function(context) {
      console.log("attemptAutoLogin runs");
      const retrievedToken = localStorage.getItem("movieAppIdToken");
      if (!retrievedToken) {
        console.log("No token, auto login failed");
        return;
      }
      const expirationDate = new Date(localStorage.getItem("movieAppExpDate"));
      const now = new Date();

      if (now >= expirationDate) {
        console.log(
          "Now > expirationDate",
          now >= expirationDate,
          "Auto Login failed"
        );
        return;
      }

      //Budući da još ima vremena do isteka validnosti tokena, commitati "authenticateUser"
      const userId = localStorage.getItem("movieAppUserId");
      console.log("Executing Auto Login...");
      context.commit("authenticateUser", {
        idToken: retrievedToken,
        localId: userId,
      });

      //setLogOutTimer se dispatcha u SignUpAction i SignInAction nakon što dobijemo response nazad s tokenom i "expiresIn" i zbog toga uredno odlogira usera nakon isteka timera
      //Treba ga dispatchati i kod autologina jer ako nema timera, neće napraviti automatski logout kad istekne expirationDate tokena

      const expiresIn = (expirationDate.getTime() - now.getTime()) / 1000; //pretvorimo u sekunde jer ce u timeru setTimeout jos pomnoziti s 1000 za ms.
      console.log(expiresIn);

      context.dispatch("setLogOutTimer", expiresIn);
    },

    //Ova akcija će se dispatchati unutar SignUpAction i prima userData kojeg joj passa SignUpAction, preuzeto iz submitanog signup forma.
    storeUserData: function(context, userData) {
      //Check je li token već u stateu
      if (!context.state.token) return;

      //Ako imam token - pokrećem Axios post request na koji appendam token na kraj, i RETURNAM promise kako bi mogao u .then nastaviti sa fetchUserData - ovo sve u SignUpAction se odrađuje.
      return axios
        .post(
          `https://movie-app-project-d0dc7.firebaseio.com/users.json?auth=${context.state.token}`,
          userData
        )
        .then((res) => console.log("STORED USER DATA TO DATABASE:", res))
        .catch((err) => console.log(err));
    },

    //Ova akcija će fetchati usera iz Firebase Databasea - dispatcham je unutar SignUP i SignIn akcija na kraju - recimo da zelim odmah po ulogiranji prikazat info od usera koji je kreiran
    fetchUserData: function(context) {
      //Check je li token već u stateu
      if (!context.state.token) {
        console.log("COULD NOT FIND TOKEN, FETCHING USER DATA ABORTED!");
        return;
      }
      //Ako imam token, kreće get request za fetchanje usera
      console.log("TOKEN FOUND, FETCHING USER DATA.");

      //Fetcham SAMO konkretnog usera, ne listu pa je prilagođen query da trazi prema uniqueID-u (localID je stavljen kao userId i uniqueID)
      axios
        .get(
          `https://movie-app-project-d0dc7.firebaseio.com/users.json?orderBy="uniqueID"&equalTo="${context.state.userId}"&auth=${context.state.token}`
        )
        .then((res) => {
          const fetchedUser = Object.values(res.data)[0];

          for (const key in res.data) {
            fetchedUser.userDatabaseKey = key;
          }
          //Prije commitanja storeFetchedmutacije, napraviti check ima li user svoj watchlist, ako ne, kreirati.
          if (!fetchedUser.watchlist) {
            fetchedUser.watchlist = [];
          }
          context.commit("storeFetchedUser", fetchedUser);
          console.log("THIS IS THE FETCHED USER: ", context.getters.getUser);
        })
        .catch((err) => console.log(err));
    },

    //Signs Up a new User!
    //UserData je passani formData iz Form komponente
    signUpAction: function(context, userData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArC3YYsF3y106dGvjbrf3vKC7WDZ4eNqY",
          {
            email: userData.email,
            password: userData.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log("RESPONSE NAKON SIGNUP POST REQUESTA: ", res);
          //Izvući iz responsa idToken i localId (user id)
          const data = {
            idToken: res.data.idToken,
            localId: res.data.localId,
          };

          //Auto login usera ako ode i vrati se na stranicu dok je token validan
          //Vrijeme u ovom trenutku, puni datum
          const now = new Date();
          //Expiration date tokena - prvo izračunati koliko je vremena prošlo od početka do sad pomoću getTime() - dobit ću milisekunde
          //zatim pribrojiti res.data.expiresIn također prebačen u milisekunde
          //Sve zajedno ubaciti u new Date() za dobiti točno vrijeme - sat vremena nakon now.
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );

          localStorage.setItem("movieAppExpDate", expirationDate);
          localStorage.setItem("movieAppIdToken", data.idToken);
          localStorage.setItem("movieAppUserId", data.localId);

          //Commitati authenticateUser mutaciju s potrebnim podacima
          context.commit("authenticateUser", data);
          //Pokrećem logout timer
          context.dispatch("setLogOutTimer", res.data.expiresIn);

          //Storing userData u database - prije toga dodam novi property "uniqueID" i assignam mu localId, ovo ću koristiti za fetchanje samo konkretnog usera a ne cijele liste usera iz databasea
          userData.uniqueID = data.localId;

          context.dispatch("storeUserData", userData).then(() => {
            //Fetching user FROM database - nakon što axios request returna promise fulfilled
            context.dispatch("fetchUserData");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Signs In existing User!
    signInAction: function(context, authData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArC3YYsF3y106dGvjbrf3vKC7WDZ4eNqY",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log(res);
          //Izvući iz responsa idToken i localId (user id)
          const data = {
            idToken: res.data.idToken,
            localId: res.data.localId,
          };

          //Auto login usera ako ode i vrati se na stranicu dok je token validan
          //Vrijeme u ovom trenutku, puni datum
          const now = new Date();
          //Expiration date tokena - prvo izračunati koliko je vremena prošlo od početka do sad pomoću getTime() - dobit ću milisekunde
          //zatim pribrojiti res.data.expiresIn također prebačen u milisekunde
          //Sve zajedno ubaciti u new Date() za dobiti točno vrijeme - sat vremena nakon now.
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("movieAppExpDate", expirationDate);
          localStorage.setItem("movieAppIdToken", data.idToken);
          localStorage.setItem("movieAppUserId", data.localId);

          //Commitati authenticateUser mutaciju s tim podacima
          context.commit("authenticateUser", data);
          //Pokrećem logout timer
          context.dispatch("setLogOutTimer", res.data.expiresIn);
          //Fetching user FROM database
          context.dispatch("fetchUserData");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Logs out user
    logOutUser: function({ commit }) {
      commit("clearAuthData");
      commit("clearSearchResults");
      localStorage.removeItem("movieAppExpDate");
      localStorage.removeItem("movieAppIdToken");
      localStorage.removeItem("movieAppUserId");
    },

    //Ova akcije je za automatski log out usera čim istekne validni token (3600s), dispatcham u responseu unutar signUpAction i signInAction
    setLogOutTimer: function({ dispatch }, expirationTime) {
      console.log("Automatic logout in: ", expirationTime);
      setTimeout(() => {
        dispatch("logOutUser");
      }, expirationTime * 1000); //response daje expiration time u sekundamaa pa ovdje treba prebaciti u ms
    },

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

          context.commit("updateSearchResults", filteredResults);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Displays more options and details for the clicked title - this action fires when a title img is clicked on.
    showFullTitle: function({ commit, state, getters }, $event) {
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
                const data = response.data;

                data.images.backdrops.forEach((image) => {
                  image.fullImagePath = `${this.state.baseImageURL}${image.file_path}`;
                });

                selectedTitleData = {
                  fullPosterPath: title.fullPosterPath,
                  id: data.id,
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
                router.push("/title_details");
              });
          }
        }
      }
    },

    showFullWatchlistTitle: function({ commit, getters }, $event) {
      if ($event.target.tagName === "IMG") {
        //Napraviti loop kroz Watchlist i ako kliknuti img ima isti id kao i title na listi, assignati ga kao selectedTitle
        for (const title of getters.getWatchlist) {
          if (+$event.target.id === title.id) {
            //Commitati mutaciju za updetjanje selectedTitle
            commit("updateSelectedTitle", title);
            router.push("/watchlist/title_details");
          }
        }
      }
    },

    //This action commits a mutation which sets the selectedTitle to ""
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

    //This action commits updateWatchlist mutation
    addToWatchlist: function(context, disableWatchlistBtn) {
      if (context.getters.getUser && context.getters.isAuthenticated) {
        context.commit("updateWatchlist");
        disableWatchlistBtn(375, "added", "animated");
      }
    },

    //This action will store / save user's watchlist to the database - not yet sure WHEN it should happen
    saveWatchlist: function(context) {
      //Get users watchlist
      const unsavedWatchlist = context.getters.getWatchlist;

      axios
        .put(
          `https://movie-app-project-d0dc7.firebaseio.com/users/${context.getters.getUser.userDatabaseKey}/watchlist.json?auth=${context.state.token}`,
          unsavedWatchlist
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
