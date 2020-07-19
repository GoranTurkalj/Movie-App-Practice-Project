<template>
  <button
    @click="watchFullTitle"
    class="cta-button"
    :class="{'cta-button--disabled': !isAuthenticated, 'cta-button--static': isOnSelectedTitle, 'cta-button--watch': isOnWatchlist}"
  >{{displayButtonText}}</button>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { isOnWatchlistMixin } from "../mixins";
export default {
  mixins: [isOnWatchlistMixin],
  props: {
    recievedTitleID: {
      type: Number
    }
  },

  computed: {
    ...mapGetters([
      "getResultsList",
      "getWatchlist",
      "isAuthenticated",
      "getSelectedTitle"
    ]),

    displayButtonText: function() {
      //ako isOnWatchlist (importan mixin) vrati true - onda tekst treba biti "WATCH NOW", ako ne, onda "ADD TO WATCHLIST"

      return this.isOnWatchlist ? "WATCH NOW" : "ADD TO WATCHLIST";
    },

    isOnSelectedTitle: function() {
      //if cta button component is rendered on a currently displayed SELECTED TITLE - then the "cta-button--static" class needs to applay to adjust it a bit.
      if (
        this.getSelectedTitle &&
        this.recievedTitleID === this.getSelectedTitle.id
      ) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    ...mapActions(["getDetailedTitleInfo"]),

    watchFullTitle: function() {
      this.$router.push("/watch_now");
      setTimeout(() => {

       
        this.$store.commit("turnOnIsPlaying");
      }, 3000);
    },

    handleUserClick: function(recievedTitleID) {
      //Kad kliknem na button - trazi se title s istim ID-om kao i recievedTitleID (primljen kao prop iz TitleThumbnail komponente
      for (const title of this.getResultsList) {
        if (title.id === recievedTitleID) {
          //Akciji passam payload objekt koji sadrzi ime mutacije koju treba commitati, zatim titleID - jer će trebati napraviti GET request za detaljnije podatke za taj naslov, te naposljetku, poster path jer svaki searched result na listi ima konstruiran path za povući poster img pa cu ga passati ovdje
          this.getDetailedTitleInfo({
            mutationName: "updateWatchlist",
            titleID: recievedTitleID,
            poster: title.fullPosterPath
          });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cta-button {
  width: 100%;
  height: 2.5rem;
  transition: all 300ms;
  background-color: $accentColor;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 0 0 0.5rem 0.5rem;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus {
    filter: brightness(150%);
  }
}

.cta-button--static {
  width: 14rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  border: 2px solid rgb(231, 214, 182);
}

.cta-button--watch {
  background-color: $btnBackgroundGreen;
  color: white;

  animation: animateTextWhite 300ms linear 1 forwards;
}

.cta-button--disabled {
  background-color: rgb(73, 72, 72);
  color: rgb(167, 164, 164);
}

@keyframes animateTextWhite {
  0% {
    color: transparent;
  }
  100% {
    color: white;
  }
}
</style>