<template>
  <section id="watchlist">
    <div id="watchlist-controls">
      <button class="watchlist-control" @click="saveWatchlist">
        <img src="../assets/save.svg" alt="save watchlist icon" />
      </button>
      <button class="watchlist-control">
        <img src="../assets/delete.svg" alt="delete watchlist icon" />
      </button>
    </div>
    <general-info v-if="getWatchlist && !getWatchlist.length">
      <img src="../assets/home-logo.png" alt slot="info-image" />
      <h2 slot="info-title">Your Watchlist is empty, {{getUser.name}}!</h2>>
      <p
        slot="info-tip-1"
      >When you search for your favourite titles, you can add them here to watch later.</p>
      <p slot="info-tip-2">Make sure to have fun!</p>
    </general-info>
    <movie-list v-else :titlesArray="getWatchlist" :displayTitle="showFullWatchlistTitle"></movie-list>
    <transition name="fade">
      <selected-card
        v-if="getSelectedTitle"        
      ></selected-card>
    </transition>
  </section>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  beforeRouteLeave(to, from, next) {
    this.closeSelectedTitle();
    next();
  },
  created: function() {
    console.log("Watchlist component is created");
  },

  computed: {
    ...mapGetters([
      "getWatchlist",
      "getUser",
      "getSelectedTitle",
      "getSelectedWatchlistTitle"
    ])
  },

  methods: {
    ...mapActions([
      "showFullWatchlistTitle",
      "saveWatchlist",
      "closeSelectedTitle"
    ])
  }
};
</script>


<style lang="scss" scoped>
#watchlist {
  padding: 1.5rem 3rem;
  position: relative;
  min-height: 90vh;
  width: 100%;
}

#watchlist-controls {
  width: 20rem;
  height: 2.5rem;
  border-bottom: 1px solid $accentColor;
}

.watchlist-control {
  transition: transform 200ms;
  height: 60%;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin-right: 1.5rem;

  img {
    height: 100%;
  }

  &:hover,
  &:active {
    transform: scale(1.2);
  }

  &:focus {
    outline: auto;
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