<template>
  <button
    @click="handleUserClick(recievedTitleID)"
    class="cta-button"
    :class="{'cta-button--disabled': !isAuthenticated, 'cta-button--static': isOnSelectedTitle, 'cta-button--watch': isOnWatchlist}"
  >{{buttonText}}</button>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    recievedTitleID: {
      type: Number
    }
  },
  data() {
    return {
      buttonText: "ADD TO WATCHLIST"
    };
  },
  computed: {
    ...mapGetters([
      "getResultsList",
      "getWatchlist",
      "isAuthenticated",
      "getSelectedTitle"
    ]),

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
    },

    isOnWatchlist: function() {
      //if this button is rendered on a title thumbnail which can be found on the watchlist, then this returns true
      if (!this.isAuthenticated) {
        return false;
      }

      for (const title of this.getWatchlist) {
        if (title.id === this.recievedTitleID) {
          this.buttonText = "WATCH NOW";
          return true;
        }
      }
    }
  },

  methods: {
    ...mapActions(["getDetailedTitleInfo"]),

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
  transition: all 200ms;
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
}

.cta-button--disabled {
  background-color: rgb(73, 72, 72);
  color: rgb(167, 164, 164);
}
</style>