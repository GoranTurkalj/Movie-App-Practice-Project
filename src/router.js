import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./components/HomePage.vue";
import WatchList from "./components/WatchList.vue";
import SignUpPage from "./components/SignUpPage.vue";
import SignInPage from "./components/SignInPage.vue";
import TitleDetails from "./components/TitleDetails.vue";
import TitleTrailer from "./components/TitleTrailer.vue";
import GeneralInfo from "./components/GeneralInfo.vue";
import StoryPanel from "./components/StoryPanel.vue";
import GalleryPanel from "./components/GalleryPanel.vue";
import ReviewPanel from "./components/ReviewPanel.vue";
import { store } from "./store/store"; //Import storea radi pristupa stateu kod slaganja route guarda

Vue.use(VueRouter);

//This action returns a promise
const autoLogin = store.dispatch("attemptAutoLogin");

const routes = [
  {
    path: "",
    name: "home",
    component: HomePage,
    children: [
      {
        path: "/title_details",
        redirect: { name: "titleStory" },
        name: "titleDetails",
        component: TitleDetails,
        beforeEnter: function(to, from, next) {
          if (store.getters.getSelectedTitle) {
            next();
          } else {
            next("/");
          }
        },
        children: [
          { path: "story", name: "titleStory", component: StoryPanel },
          { path: "gallery", name: "titleGallery", component: GalleryPanel },
          { path: "review", name: "titleReview", component: ReviewPanel },
        ],
      },
      {
        path: "/title_trailer",
        name: "titleTrailer",
        component: TitleTrailer,
        beforeEnter: function(to, from, next) {
          if (store.getters.getSelectedTitle) {
            next();
          } else {
            next("/");
          }
        },
      },
    ],
  },
  {
    path: "/watchlist",
    name: "watchlist",
    component: WatchList,
    children: [
      {
        path: "/watchlist/title_details",
        redirect: { name: "watchlistTitleStory" },
        name: "watchlistTitleDetails",

        component: TitleDetails,
        beforeEnter: function(to, from, next) {
          if (store.getters.getSelectedTitle) {
            next();
          } else {
            next("/watchlist");
          }
        },
        children: [
          { path: "story", name: "watchlistTitleStory", component: StoryPanel },
          {
            path: "gallery",
            name: "watchlistTitleGallery",
            component: GalleryPanel,
          },
          {
            path: "review",
            name: "watchlistTitleReview",
            component: ReviewPanel,
          },
        ],
      },
      {
        path: "/watchlist/title_trailer",
        name: "watchlistTitleTrailer",
        component: TitleTrailer,
        beforeEnter: function(to, from, next) {
          if (store.getters.getSelectedTitle) {
            next();
          } else {
            next("/watchlist");
          }
        },
      },
    ],
    beforeEnter: function(to, from, next) {
      console.log("beforeEnter Watchlist guard runs");
      //Ako u stateu postoji token, onda moze nastaviti na /watchlist, a ako ne postoji, onda prebacim usera na /signin
      if (store.state.token) {
        next();
      } else {
        next("/signin");
      }
    },
  },
  { path: "/signup", name: "signup", component: SignUpPage },
  { path: "/signin", name: "signin", component: SignInPage },
  { path: "*", component: GeneralInfo },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

//Prvo sam probao u created() u App.vue dispatchati attemptAutoLogin - no ako user pokuša autologin dok je na /watchlist routeu koji je zaštićen s beforeEnter guardom koji gleda postoji li token ili ne - bit će prebačen na /signin makar validan token postojao u localStorageu

// beforeEnter se izvrti PRIJE App.vue created hooka i zato prebacuje na /signin jer u tom trenu token nije dohvaćen

//Solution (kind of) - spremiti promise koji vraća akcija "attemptAutoLogin" u varijablu autoLogin.
// Staviti global guard koji pokreće next() nakon što je promise resolved
router.beforeEach((to, from, next) => {
  autoLogin.then(() => {
    //Ako podaci o useru nisu u storeu, a imamo token - fetchati usera.
    if (!store.getters.getUser && store.getters.isAuthenticated) {
      store.dispatch("fetchUserData");
    }
    next();
  });
});

export default router;
