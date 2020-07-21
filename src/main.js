import Vue from "vue";
import router from "./router.js";
import Vuelidate from "vuelidate";
import "./assets/global.css";
import MovieList from "./components/MovieList.vue";
import SelectedCard from "./components/SelectedCard.vue";
import Carousel from "./components/Carousel.vue";
import NotAvailable from "./components/NotAvailable.vue";
import GeneralInfo from "./components/GeneralInfo.vue";
import Form from "./components/Form.vue";
import AppMessage from "./components/AppMessage.vue";
import ButtonCTA from "./components/ButtonCTA.vue";
import TitleThumbnail from "./components/TitleThumbnail.vue";
import App from "./App.vue";
import { store } from "./store/store.js";

Vue.use(Vuelidate);

Vue.component("movie-list", MovieList);
Vue.component("selected-card", SelectedCard);
Vue.component("general-info", GeneralInfo);
Vue.component("not-available", NotAvailable);
Vue.component("photo-carousel", Carousel);
Vue.component("main-form", Form);
Vue.component("app-message", AppMessage);
Vue.component("cta-button", ButtonCTA);
Vue.component("title-thumbnail", TitleThumbnail);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
