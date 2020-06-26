import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes.js";
import App from "./App.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
