import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes.js";
import MovieList from "./components/MovieList.vue";
import SelectedCard from "./components/SelectedCard.vue";
import Carousel from "./components/Carousel.vue";
import NotAvailable from "./components/NotAvailable.vue";
import GeneralInfo from "./components/GeneralInfo.vue";
import App from "./App.vue";
import { store } from "./store/store.js";

Vue.component("movie-list", MovieList);
Vue.component("selected-card", SelectedCard);
Vue.component("general-info", GeneralInfo);
Vue.component("not-available", NotAvailable);
Vue.component("photo-carousel", Carousel);

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

/*

 moveRight: function() {
      //Determine currentSlide
      this.currentSlide = this.track.querySelector(".current-slide");
      //I need to determine the next slide
      this.nextSlide = this.currentSlide.nextElementSibling;

      if (!this.nextSlide) {
        this.nextSlide = this.slides[0];
      }

      // const slideWidth = this.nextSlide.getBoundingClientRect().width;
      this.track.style.transform = `translateX(-${this.slideWidth *
        this.slides.indexOf(this.nextSlide)}px)`;

      this.nextSlide.classList.add("current-slide");
      this.currentSlide.classList.remove("current-slide");
    },

    moveLeft: function() {
      //Determine currentSlide;
      this.currentSlide = this.track.querySelector(".current-slide");
      //I need to determine the previous slide
      this.previousSlide = this.currentSlide.previousElementSibling;

      if (!this.previousSlide) {
        this.previousSlide = this.slides[this.slides.length - 1];
      }

      //const slideWidth = this.previousSlide.getBoundingClientRect().width;
      this.track.style.transform = `translateX(-${this.slideWidth *
        this.slides.indexOf(this.previousSlide)}px)`;

      this.previousSlide.classList.add("current-slide");
      this.currentSlide.classList.remove("current-slide");
    }
  }












*/
