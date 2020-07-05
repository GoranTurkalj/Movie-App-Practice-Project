import HomePage from "./components/HomePage.vue";
import WatchList from "./components/WatchList.vue";
import SignUpPage from "./components/SignUpPage.vue";
import SignInPage from "./components/SignInPage.vue";
import TitleInfo from "./components/TitleInfo.vue";
import TitleVideo from "./components/TitleVideo.vue";

export const routes = [
  {
    path: "",
    component: HomePage,
    children: [
      { path: "/details", component: TitleInfo },
      { path: "/trailer", component: TitleVideo },
    ],
  },
  { path: "/watchlist", component: WatchList },
  { path: "/signup", component: SignUpPage },
  { path: "/signin", component: SignInPage },
  { path: "/trailer", component: TitleVideo },
];
