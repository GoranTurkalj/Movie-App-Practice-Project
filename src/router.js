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
];

export const router = new VueRouter({
  routes,
  mode: "history",
});
