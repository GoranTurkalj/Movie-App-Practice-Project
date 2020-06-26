import HomePage from "./components/HomePage.vue";
import WatchList from "./components/WatchList.vue";
import SignUpPage from "./components/SignUpPage.vue";
import SignInPage from "./components/SignInPage.vue";

export const routes = [
  { path: "", component: HomePage },
  { path: "/watchlist", component: WatchList },
  { path: "/signup", component: SignUpPage },
  { path: "/signin", component: SignInPage },
];
