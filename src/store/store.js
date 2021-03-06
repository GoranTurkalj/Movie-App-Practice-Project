import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import resultsList from "./modules/resultsList";
import selectedTitle from "./modules/selectedTitle";
import alertPrompt from "./modules/alertPrompt";
import scrollDistance from "./modules/scrollDistance";

Vue.use(Vuex);

export const store = new Vuex.Store({
  //Imported modules*******************************************************

  modules: {
    resultsList,
    selectedTitle,
    alertPrompt,
    scrollDistance, //distance which is scrolled on selectedCard component when window.innerWidth is less than 990px, so that the position of confirmationAlert component can be adjusted when on review panel.
  },

  // State*******************************************************************
  state: {
    token: null,
    userId: null,
    user: "",
    searchedTitle: "",
    baseImageURL: "https://image.tmdb.org/t/p/w500",
    messageDisplayed: false,
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

    //When "Add to watchlist" button is pressed - the addedTitle data is added as an object to the user's watchlist array
    updateWatchlist: function(state, addedTitle) {
      state.user.watchlist.push(addedTitle);
      console.log("THIS IS THE WATCHLIST", state.user.watchlist);
    },

    //This mutation removes a title from the watchlist when a user clicks on button on the thumbnail, which displays only when the route is "/watchlist"
    removeWatchlistTitle: function(state, titleToRemove) {
      state.user.watchlist.splice(
        state.user.watchlist.indexOf(titleToRemove),
        1
      );
    },
    //When user confirms watchlist deletion, deleteWatchlistAction commits this mutation
    deleteWatchlist: function(state) {
      state.user.watchlist = [];
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

    //Ova akcija će fetchati usera iz Firebase Databasea - dispatcham je unutar SignUP i SignIn akcija na kraju - recimo da zelim odmah po loginu fetchati watchlist od usera koji se ulogirao
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
          //Pošto Firebase ne vraća propertije koji su prazni, kad sejvam watchlist prvo JSON stringify cijeli array i stavim ga property "stringifiedArray od "savedData" objekta, a ovdje onda JSON.parse treba napraviti da dobijem nazad watchlist array bez izbrisanih praznih propertija što Firebase inače radi.
          if (fetchedUser.watchlist) {
            fetchedUser.watchlist = JSON.parse(
              fetchedUser.watchlist.stringifiedArray
            );
          }
          //Prije commitanja storeFetchedUser mutacije, napraviti check ima li user svoj watchlist, ako ne, kreirati.
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
            //Displaying app message and changing route after a small delay
            context.state.messageDisplayed = true;

            setTimeout(() => {
              context.state.messageDisplayed = false;
            }, 2300);

            setTimeout(() => {
              router.replace("/");
            }, 3000);
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
          //Displaying app message and changing route after a small delay
          context.state.messageDisplayed = true;

          setTimeout(() => {
            context.state.messageDisplayed = false;
          }, 2300);

          setTimeout(() => {
            router.replace("/");
          }, 3000);
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

    //Displays more options and details for the clicked title - this action fires when a title img is clicked on.
    showFullTitle: function({ dispatch, getters }, $event) {
      if (
        $event.target.tagName === "IMG" &&
        $event.target.classList.contains("movie-img")
      ) {
        //Napraviti loop kroz listu rezultata i ako kliknuti img ima isti id kao i title na listi, napraviti HTTP request s tim title id-om za dobiti detaljnije podatke
        for (const title of getters.getResultsList) {
          if (+$event.target.id === title.id) {
            console.log(
              "Show Full Title just dispatched 'getDetailedTitleInfo'"
            );
            dispatch("getDetailedTitleInfo", {
              mutationName: "updateSelectedTitle",
              titleID: title.id,
              poster: title.fullPosterPath,
            });
          }
        }
      }
    },

    showFullWatchlistTitle: function({ commit, getters }, $event) {
      if (
        $event.target.tagName === "IMG" &&
        $event.target.classList.contains("movie-img")
      ) {
        //Napraviti loop kroz Watchlist i ako kliknuti img ima isti id kao i title na listi, assignati ga kao selectedTitle
        for (const title of getters.getWatchlist) {
          if (+$event.target.id === title.id) {
            console.log(
              "show full watchlist title runs and is committing 'updateSelectedTitle' with: ",
              title
            );
            //Commitati mutaciju za updejtanje selectedTitle
            commit("updateSelectedTitle", title);
            router.push("/watchlist/title_details");
          }
        }
      }
    },

    //Akcija se dispatcha u ButtonCTA komponenti - u metodi "addToWatchlist", i u "showFullTitle" akciji kad se klikne na neki thumbnail onda se napravi novi "selectedTitle" objekt
    getDetailedTitleInfo: function(context, { mutationName, titleID, poster }) {
      // Akcija prima payload objekt s imenom mutacije koju treba commitati i title objektom - oboje su destrukturirani u parametrima
      //objekt title ima id i treba napraviti GET request pomoću tog id-a za detaljnije podatke o filmu

      //Create new empty variable - this will hold the necessary detailed data from the response
      let newTitleData = null;

      axios
        .get(
          `https://api.themoviedb.org/3/movie/${titleID}?api_key=9e612d73fdfb165c3aa123e0b09d606d&append_to_response=videos,images,credits`
        )
        .then((response) => {
          const data = response.data;

          data.images.backdrops.forEach((image) => {
            image.fullImagePath = `${this.state.baseImageURL}${image.file_path}`;
          });

          newTitleData = {
            fullPosterPath: poster,
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
            review: "",
            userRating: "",
          };

          //Commitati mutaciju updateWatchlist - na cta button click,  ILI committati mutaciju updateSelectedTitle kad se klikne na thumbnail na resultsList.
          context.commit(mutationName, newTitleData);

          if (mutationName === "updateSelectedTitle") {
            router.push("/title_details");
          }
        });
    },

    //This action will store / save user's watchlist to the database
    saveWatchlist: function(context) {
      //Get users watchlist and stringify it because Firebase would otherwise not return any property that was empty.
      const savedData = {};
      savedData.stringifiedArray = JSON.stringify(context.getters.getWatchlist);
      console.log(savedData);

      axios
        .put(
          `https://movie-app-project-d0dc7.firebaseio.com/users/${context.getters.getUser.userDatabaseKey}/watchlist.json?auth=${context.state.token}`,
          savedData
        )
        .then((response) => {
          console.log(response);
          //show message to user
          context.state.messageDisplayed = true;
          setTimeout(() => {
            context.state.messageDisplayed = false;
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Commits a mutation when "removeTitleBtn" is clicked
    removeClickedTitle: function({ commit, getters }, payload) {
      if (payload.event.currentTarget.tagName === "BUTTON") {
        for (const title of getters.getWatchlist) {
          if (title.id === payload.recievedTitleID) {
            commit("removeWatchlistTitle", title);
          }
        }
      }
    },

    deleteWatchlistAction: function(context) {
      context.commit("deleteWatchlist");
    },

    //Dispatched in ReviePanel component as a setter for a computed property
    setReviewText: function(context, value) {
      context.commit("updateReviewText", value);
    },

    deleteReviewAction: function(context) {
      context.commit("deleteReview");
    },
  },
});
