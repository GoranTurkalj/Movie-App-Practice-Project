import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./components/HomePage.vue";
import WatchList from "./components/WatchList.vue";
import SignUpPage from "./components/SignUpPage.vue";
import SignInPage from "./components/SignInPage.vue";
import TitleInfo from "./components/TitleInfo.vue";
import TitleVideo from "./components/TitleVideo.vue";
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
        name: "titleDetails",
        component: TitleInfo,
        children: [
          {
            path: "/title_details/story",
            name: "titleStory",
            component: StoryPanel,
          },
          {
            path: "/title_details/gallery",
            name: "titleGallery",
            component: GalleryPanel,
          },
          {
            path: "/title_details/review",
            name: "titleReview",
            component: ReviewPanel,
          },
        ],
      },
      { path: "/title_trailer", name: "titleTrailer", component: TitleVideo },
    ],
  },
  {
    path: "/watchlist",
    name: "watchlist",
    component: WatchList,
    //route guard koji onemogućuje ulazak na ovaj route ako user nije authenticated
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
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

//Prvo sam probao u created() u App.vue dispatchati attemptAutoLogin - no ako user pokuša autologin dok je na /watchlist routeu koji je zaštićen s beforeEnter guardom koji gleda postoji li token ili ne - bit će prebačen na /signin makar validan token postojao u localStorageu

// beforeEnter se izvrti PRIJE App.vue created hooka i zato prebacuje na /signin jer u tom trenu token nije dohvaćen

//Solution (kind of) - spremiti promise koji vraća akcija "attemptAutoLogin" u varijablu autoLogin.
// Staviti global guard koji pokreće next() nakon što je promise resolvd
router.beforeEach((to, from, next) => {
  autoLogin.then(() => {
    next();
  });
});

export default router;
