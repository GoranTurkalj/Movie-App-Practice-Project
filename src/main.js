import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes.js";
import MovieList from "./components/MovieList.vue"; 
import App from "./App.vue";
import {store} from "./store/store.js"; 

Vue.component("movie-list", MovieList); 

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