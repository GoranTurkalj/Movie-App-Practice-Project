import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes.js";
import MovieList from "./components/MovieList.vue";
import SelectedCard from "./components/SelectedCard.vue";
import VueYoutubeEmbed from "vue-youtube-embed";
import App from "./App.vue";
import { store } from "./store/store.js";

Vue.component("movie-list", MovieList);
Vue.component("selected-card", SelectedCard);

Vue.use(VueYoutubeEmbed);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
