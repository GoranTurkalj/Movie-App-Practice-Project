<template>
  <button class="cta-button" :class="applyClasses">{{buttonText }}</button>
</template>
<script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["getResultsList", "getWatchlist", "isAuthenticated"]),

    applyClasses: function() {
      //Ako nismo logged in samo resultsList se gleda
      if (!this.isAuthenticated) {
        for (const title of this.getResultsList) {
          if (title.id === this.recievedTitleID) {
            this.buttonText = "ADD TO WATCHLIST";
            return { "cta-button--disabled": true };
          }
        }
      }

      //Ako postoji lista znači da jesmo authenticated - ALI lista moze biti prazna pa testiram length
      if (this.getWatchlist.length) {
        for (const title of this.getWatchlist) {
          if (title.id === this.recievedTitleID) {
            this.buttonText = "WATCH NOW";
            return { "cta-button--watch": true };
          }
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
  padding: 0.5rem;
  border: none;
  border-radius: 0 0 0.5rem 0.5rem;
  outline: none;
  cursor: pointer;
  //z-index: 2;

  &:hover,
  &:focus {
    filter: brightness(150%);
  }
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