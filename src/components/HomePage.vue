<template>
  <section id="homepage">
    <div class="search-container">
      <input
        placeholder="Enter movie title here"
        class="search-input"
        type="text"
        @input="updateSearchedTitle"
        @keyup.enter="requestSearchResults"
      />
      <button id="search-btn" @click="requestSearchResults"></button>
    </div>
    <transition name="fade" mode="out-in">
      <general-info v-if="!getResultsList.length">
        <img src="../assets/home-logo.png" alt slot="info-image" />
        <h2 v-show="getUser.name" slot="info-title">Welcome to Movie App, {{ getUser.name }}!</h2>>
        <h2 v-show="!getUser.name" slot="info-title">Hello, welcome to Movie App!</h2>>
        <p slot="info-tip-1">
          You can search for your favourite movies here, just type the title name in
          the searchbar. You can add movies to your personal watchlist, rate them and
          write reviews!
        </p>
        <p slot="info-tip-2" v-show="!getUser.name">
          To use the watchlist, just
          <router-link to="/signin">sign-in </router-link>to your account.
          <br />If you don't have an account, create one by
          <router-link to="/signup">signing-up</router-link> now.
        </p>
      </general-info>
      <movie-list v-else :titlesArray="getResultsList" :displayTitle="showFullTitle"></movie-list>
    </transition>
    <transition name="dropIn">
      <app-message v-if="$store.state.messageDisplayed">
        <p slot="app-message">To access the watchlist, you need to sign up or sign in!</p>
      </app-message>
    </transition>
    <transition name="fade">
      <selected-card v-if="getSelectedTitle"></selected-card>
    </transition>
  </section>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  beforeRouteLeave(to, from, next) {
    this.closeSelectedTitle();
    next();
  },

  computed: {
    ...mapGetters(["getResultsList", "getSelectedTitle", "getUser"]),
  },
  methods: {
    //Updating searchedTitle in the state
    ...mapMutations(["updateSearchedTitle"]),
    ...mapActions([
      "requestSearchResults",
      "showFullTitle",
      "closeSelectedTitle",
    ]),
  },
};
</script>

<style lang="scss">
#homepage {
  @include basicPageStyle();
}
.search-container {
  display: flex;
  height: 2.7rem;
}

.search-input {
  height: 100%;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  border: $borderNormal;
  border-radius: 1rem 0 0 1rem;
  border-right: none;
  transition: border-color 200ms;

  &:focus {
    border: 2px solid $activeColor;
    border-right: none;
  }

  &:focus + #search-btn {
    border: 2px solid $activeColor;
    border-left: none;
  }
}

#search-btn {
  transition: all 200ms;
  height: 100%;
  width: 4rem;
  padding: 0 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url("../assets/search.svg");
  background-size: 45%;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  border: 2px solid $accentColor;
  border-left: none;
  border-radius: 0 1rem 1rem 0;
  font-size: 1.1rem;
  cursor: pointer;
  outline: none;

  &:hover {
    background-size: 50%;
  }
}
@media only screen and (max-width: 520px) {
  .search-input {
    font-size: 0.8rem;
    width: 85%;
  }

  #search-btn {
    width: 15%;
  }
}

@media only screen and (max-width: 395px) {
  #homepage {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
