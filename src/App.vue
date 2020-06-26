<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    appHeader: Header,
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

#app {
  width: 100vw;
  min-height: 100vh;
  background-image: url("./assets/home-background.jpg");
  background-position: 0% 5%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
