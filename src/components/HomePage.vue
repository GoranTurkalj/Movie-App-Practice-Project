<template>
  <section id="homepage">
    <div class="search-container">
      <input class="search-input" type="text" @blur="updateSearchedTitle" />
      <button id="search-btn" @click="requestSearchResults"></button>
    </div>
    <transition name="fade" mode="out-in">
      <general-info v-if="!getResultsList.length">
        <img src="../assets/home-logo.png" alt slot="info-image" />
        <h2 v-show="getUser.name" slot="info-title">Welcome to Movie App, {{getUser.name}}!</h2>>
        <h2 v-show="!getUser.name" slot="info-title">Welcome to Movie App, random citizen!</h2>>
        <p
          slot="info-tip-1"
        >This is the Homepage - you can search for your favourite TV shows or movies here.</p>
        <p
          slot="info-tip-2"
        >You can add titles to your watchlist. To use the watchlist, sign-up or sign-in.</p>
      </general-info>
      <movie-list v-else :titlesArray="getResultsList" :displayTitle="showFullTitle"></movie-list>
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
    ...mapGetters(["getResultsList", "getSelectedTitle", "getUser"])
  },
  methods: {
    //Updating searchedTitle in the state
    ...mapMutations(["updateSearchedTitle"]),
    ...mapActions([
      "requestSearchResults",
      "showFullTitle",
      "closeSelectedTitle"
    ])
  }
};
</script>

<style lang="scss">
#homepage {
  padding: 1.5rem 3rem;
  position: relative;
  min-height: 90vh;
  width: 100%;
}
.search-container {
  display: flex;
  height: 2.7rem;
}

.search-input {
  height: 100%;
  width: 35%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  border: 2px solid $accentColor;
  border-radius: 1rem 0 0 1rem;
  border-right: none;
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
    background-size: 55%;
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 400ms;
}

.fade-leave-active {
  transition: opacity 400ms;
  opacity: 0;
}
</style>
