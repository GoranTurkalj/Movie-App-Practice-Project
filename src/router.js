import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./components/HomePage.vue";
import WatchList from "./components/WatchList.vue";
import SignUpPage from "./components/SignUpPage.vue";
import SignInPage from "./components/SignInPage.vue";
import TitleInfo from "./components/TitleInfo.vue";
import TitleVideo from "./components/TitleVideo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "home",
    component: HomePage,
    children: [
      { path: "/title_details", name: "titleDetails", component: TitleInfo },
      { path: "/title_trailer", name: "titleTrailer", component: TitleVideo },
    ],
  },
  { path: "/watchlist", name: "watchlist", component: WatchList },
  { path: "/signup", name: "signup", component: SignUpPage },
  { path: "/signin", name: "signin", component: SignInPage },
];

export const router = new VueRouter({
  routes,
  mode: "history",
});
