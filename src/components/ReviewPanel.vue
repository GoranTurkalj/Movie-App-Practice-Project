<template>
  <section id="review-panel">
    <div class="review-panel__ui">
      <div class="review-panel__controls">
        <button
          :tabindex="disableFocusMixin"
          class="review-panel__btn"
          :class="{'disabled-universal': getAlertPrompt}"
          @click="saveReview"
        >
          <img src="../assets/save.svg" alt="save review button icon" />
        </button>
        <button
          :tabindex="disableFocusMixin"
          v-if="getReviewText.length"
          class="review-panel__btn"
          :class="{'disabled-universal': getAlertPrompt}"
          @click="openDeleteReviewRequest"
        >
          <img src="../assets/delete.svg" alt="delete review button icon" />
        </button>
      </div>
      <user-rating></user-rating>
    </div>
    <textarea
      class="review-panel__area"
      cols="30"
      rows="10"
      maxlength="1000"
      placeholder="Write your review here (max 1000 characters)"
      v-model="updateReviewText"
    ></textarea>
    <transition name="fade">
      <confirmation-alert
        v-if="isProperRouteMixin('watchlistTitleReview') && getAlertPrompt"
        :confirm="deleteReview"
      >
        <h2>Delete review?</h2>
      </confirmation-alert>
    </transition>
  </section>
</template>
<script>
import UserRating from "./UserRating.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { disableFocusMixin, isProperRouteMixin } from "../mixins";

export default {
  mixins: [disableFocusMixin, isProperRouteMixin],

  components: {
    userRating: UserRating,
  },

  beforeRouteLeave(to, from, next) {
    this.closeAlertPrompt();
    next();
  },
  data() {
    return {
      deleteReviewRequest: false, //when true, confirmation alert becomes visible.
    };
  },

  computed: {
    ...mapGetters([
      "getWatchlist",
      "getSelectedTitle",
      "getReviewText",
      "getAlertPrompt",
    ]),

    //Ovom computed propertiju dajem setter pa mogu korititi v-model bez problema na textarea
    updateReviewText: {
      get() {
        return this.getReviewText;
      },

      set(value) {
        //Dispatch akcije koja commita mutaciju "updateReviewText" s value iz textarea
        return this.setReviewText(value);
      },
    },
  },

  methods: {
    ...mapActions(["setReviewText", "saveWatchlist", "deleteReviewAction"]),
    ...mapMutations(["openAlertPrompt", "closeAlertPrompt"]),

    saveReview: function () {
      this.saveWatchlist();
    },

    //Confirmation alert becomes visible, and backdrop becomes visible since it depends on alertPrompt being true.
    openDeleteReviewRequest: function () {
      this.openAlertPrompt();
    },

    //Dispatches action which commits delete review mutation, closes prompt and backdrop
    deleteReview: function () {
      this.deleteReviewAction();
      this.closeAlertPrompt();
    },
  },
};
</script>
<style lang="scss" scoped>
#review-panel {
  width: 100%;
  height: 90%;
  padding-top: 1rem;
}

.review-panel__ui {
   display: flex; 
   justify-content: space-between;
   align-items: center;
 
}

.review-panel__controls {
  display: flex;
  align-items: center;
 
}
.review-panel__btn {
  width: 1.5rem;
  height: 1.5rem;

  img {
    width: 100%;
    height: 100%;
  }

  @include controlButtons();
}

.review-panel__area {
  width: 100%;
  height: 70%;
  background-color: transparent;
  color: $textColor;
  font-size: 1.1rem;
  white-space: pre-wrap;
  overflow-x: hidden;
  border: none;
  resize: none;
  outline: none;
  margin: 1rem 0;
}

.review-panel__area::-webkit-scrollbar {
  width: 10px;
}
.review-panel__area::-webkit-scrollbar-track {
  background-color: transparent;
}
.review-panel__area::-webkit-scrollbar-thumb {
  background-color: $accentColor;
  border-radius: 0.5rem;
}


@media only screen and (max-width: 475px) {
   
   .review-panel__ui {
     flex-direction: column;
     justify-content: space-between;
   }

   .review-panel__controls {
     margin-bottom: 1rem;
   }

   .review-panel__area {
     font-size: 1rem;
   }

}



</style>

