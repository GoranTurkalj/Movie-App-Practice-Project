<template>
  <div id="app">
    <app-header></app-header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    appHeader: Header
  }
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

.active {
  color: red; 
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

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 250ms;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 250ms;
}
</style>
