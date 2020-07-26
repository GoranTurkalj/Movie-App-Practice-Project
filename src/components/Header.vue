<template>
  <header class="main-header" :class="{dark: $route.name === 'watchnow'}">
    <nav class="main-nav">
      <ul class="nav-list nav-list--left">
        <router-link to="/" class="nav-item" exact tag="li">
          <a>HOME</a>
        </router-link>
        <router-link v-if="isAuthenticated" to="/watchlist" class="nav-item" tag="li">
          <a>WATCHLIST</a>
        </router-link>
      </ul>
      <div id="title-container">
        <img id="logo" src="../assets/logo.png" alt="logo" />
        <h1 id="app-title">MOVIE APP</h1>
      </div>
      <ul class="nav-list nav-list--right">
        <router-link v-if="!isAuthenticated" to="/signup" class="nav-item" tag="li">
          <a>SIGN UP</a>
        </router-link>
        <router-link v-if="!isAuthenticated" to="/signin" class="nav-item" tag="li">
          <a>SIGN IN</a>
        </router-link>
        <router-link
          v-if="isAuthenticated"
          to="/signin"
          class="nav-item"
          tag="li"
          @click.native="logOutUser"
        >
          <a>LOG OUT</a>
        </router-link>
      </ul>
    </nav>
  </header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { disableFocusMixin } from "../mixins";
export default {
  mixins: [disableFocusMixin],
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["closeSelectedTitle", "logOutUser"]),
  },
};
</script>
<style lang="scss" scoped>
.main-header {
  height: 10vh;
  width: 100vw;
  padding: 0 3rem;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 300ms;
}

.main-nav {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.nav-list {
  width: 15rem;
  list-style-type: none;
  display: flex;
  align-items: center;
}

.nav-item a {
  display: inline-block;
  font-family: "Bungee Inline";
  transition: transform 200ms;
  color: $accentColor;
  text-decoration: none;
  font-size: 1.1rem;
  letter-spacing: 1px;
  margin-right: 2rem;

  &:hover {
    color: $textColor;
    transform: translateY(-3px);
  }

  &:focus {
    color: $textColor;
  }
}

.nav-list--right {
  justify-content: flex-end;

  a {
    margin-right: 0;
    margin-left: 2rem;
  }
}

#title-container {
  display: flex;
  align-items: center;
  position: relative;
}

#logo {
  width: 45px;
  position: absolute;
  left: 51%;
  transform: rotateZ(20deg);
}

#app-title {
  font-family: "Monoton";
  font-size: 2.5rem;
  letter-spacing: 2px;
  color: $accentColor;
  word-spacing: 45px;
  @include orangeGreyText();
}

.dark {
  background-color: black;
}
.router-link-active a {
  color: white;
}

//Media Queries XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 @media only screen and (max-width: 970px) {

   
 }
</style>
