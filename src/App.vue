<template>
  <div id="app" :style="watchMovieStyle">
    <app-header></app-header>
    <transition name="fade">
      <app-backdrop v-if="getAlertPrompt"></app-backdrop>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  },

  computed: {
    ...mapGetters(["getAlertPrompt"]),
    watchMovieStyle: function () {
      //when watching a movie, #app loses bg image and instead body color is shown which is black
      return this.$route.name === 'watchnow' ? {backgroundImage: "none"} : {backgroundColor: "black"}; 
    }
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
  background-color: black;
}

body::-webkit-scrollbar {
  display: none;
}

#app {
  width: 100vw;
  margin: 0 auto;
  min-height: 100vh;
  background-image: url("./assets/home-background.jpg");
  background-position: 0% 0%;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
}

@media only screen and (max-width: 1500px) {
  #app {
    background-position: 100% 0%;
  }
}
@media only screen and (max-width: 795px) {
  #app {
    background-position: 0% 50%;
    background-size: cover; 
    background-attachment: scroll;
  }
}
</style>
