<template>
  <section id="watchlist">
    <div id="watchlist-controls">
      <button class="watchlist-control" @click="storeWatchlist">
        <img src="../assets/save.svg" alt="save watchlist icon" />
      </button>
      <button class="watchlist-control">
        <img src="../assets/delete.svg" alt="delete watchlist icon" />
      </button>
      <button class="watchlist-control">
        <img src="../assets/download.svg" alt="download watchlist icon" @click="retrieveWatchlist" />
      </button>
    </div>
    <movie-list :titlesArray="getWatchlist" :displayTitle="displayWatchlistTitle"></movie-list>
  </section>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  created: function() {
    console.log("Watchlist component is created");
  },
  computed: {
    ...mapGetters(["getWatchlist"])
  },

  methods: {
    ...mapActions(["displayWatchlistTitle", "retrieveWatchlist"]),

    //Store your current watchlist to Firebase
    storeWatchlist: function() {
      //Get current watchlist data
      const currentWatchlist = this.getWatchlist;

      //Send a PUT request with Axios
      axios
        .put(
          "https://movie-app-project-d0dc7.firebaseio.com/watchlist.json",
          currentWatchlist
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
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
</style>