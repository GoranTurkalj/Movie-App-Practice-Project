<template>
  <section id="watchlist">
    <transition name="fade">
      <div id="watchlist-controls">
        <button
          :tabindex="disableFocusMixin"
          class="watchlist-control"
          @click="saveWatchlist"
          :class="{'disabled-universal': getAlertPrompt || getSelectedTitle}"
        >
          <img src="../assets/save.svg" alt="save watchlist icon" />
        </button>
        <button
          v-if="getWatchlist && getWatchlist.length"
          :tabindex="disableFocusMixin"
          class="watchlist-control"
          :class="{'disabled-universal': getAlertPrompt || getSelectedTitle}"
          @click="openDeleteWatchlistRequest"
        >
          <img src="../assets/delete.svg" alt="delete watchlist icon" />
        </button>
      </div>
    </transition>
    <transition name="fade">
      <confirmation-alert
        v-if="isProperRouteMixin('watchlist') && getAlertPrompt"
        :confirm="deleteWatchlist"
      >
        <h2>Delete entire watchlist?</h2>
      </confirmation-alert>
    </transition>
    <transition name="fade" mode="out-in">
      <general-info v-if="getWatchlist && !getWatchlist.length">
        <img src="../assets/watchlist-logo.png" alt slot="info-image" />
        <h2 slot="info-title">{{getUser.name}}, you have no movies to watch!</h2>>
        <p slot="info-tip-1">
          You can search for movie titles
          <router-link to="/">here</router-link>, and add the ones you like to your watchlist.
        </p>
        <p slot="info-tip-2">Movies can be deleted by clicking the remove icon on the thumbnail.</p>
      </general-info>
      <movie-list v-else :titlesArray="getWatchlist" :displayTitle="showFullWatchlistTitle"></movie-list>
    </transition>
    <transition name="dropIn">
      <app-message v-if="$store.state.messageDisplayed">
        <h1 v-if="$route.name === 'watchlistTitleReview'">Review saved successfully!</h1>
        <h1 v-else>Watchlist saved successfully!</h1>
      </app-message>
    </transition>
    <transition name="fade">
      <selected-card v-if="getSelectedTitle"></selected-card>
    </transition>
  </section>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { disableFocusMixin, isProperRouteMixin } from "../mixins";

export default {
  mixins: [disableFocusMixin, isProperRouteMixin],
  beforeRouteLeave(to, from, next) {
    this.closeSelectedTitle();
    //close alert prompt 
    this.closeAlertPrompt(); 
    next();
  },

  computed: {
    ...mapGetters([
      "getWatchlist",
      "getUser",
      "getSelectedTitle",
      "getAlertPrompt",
    ]),
  },

  methods: {
    ...mapActions([
      "showFullWatchlistTitle",
      "saveWatchlist",
      "closeSelectedTitle",
      "deleteWatchlistAction",
    ]),
    ...mapMutations(["openAlertPrompt", "closeAlertPrompt"]),

    //Sets "deleteWatchlistRequest" to true - shows prompt
    openDeleteWatchlistRequest() {
      this.openAlertPrompt();
    },

    deleteWatchlist() {
      this.deleteWatchlistAction();
      this.closeAlertPrompt();
    },
  },
};
</script>


<style lang="scss" scoped>
#watchlist {
  @include basicPageStyle();
}

#watchlist-controls {
  width: 20rem;
  height: 2.5rem;
  border-bottom: 1px solid $accentColor;
}

.watchlist-control {
  height: 60%;

  img {
    height: 100%;
  }

  @include controlButtons();
}
</style>