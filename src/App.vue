<template>
  <div id="app">
    <app-header></app-header>
    <transition name="fade">
      <app-backdrop v-if="getAlertPrompt"></app-backdrop>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    appHeader: Header,
  },

  computed: {
    ...mapGetters(["getAlertPrompt"]),
    
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto";
}

body {
  overflow-x: hidden;
  overflow-y: scroll;
}

#app {
  width: 100vw;
  min-height: 100vh;
  background-image: url("./assets/home-background.jpg");
  background-position: 0% 5%;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
