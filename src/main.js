import Vue from "vue";
import router from "./router.js";
import "./assets/global.css";
import MovieList from "./components/MovieList.vue";
import SelectedCard from "./components/SelectedCard.vue";
import Carousel from "./components/Carousel.vue";
import NotAvailable from "./components/NotAvailable.vue";
import GeneralInfo from "./components/GeneralInfo.vue";
import Form from "./components/Form.vue";
import AppMessage from "./components/AppMessage.vue";
import App from "./App.vue";
import { store } from "./store/store.js";

Vue.component("movie-list", MovieList);
Vue.component("selected-card", SelectedCard);
Vue.component("general-info", GeneralInfo);
Vue.component("not-available", NotAvailable);
Vue.component("photo-carousel", Carousel);
Vue.component("main-form", Form);
Vue.component("app-message", AppMessage);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
