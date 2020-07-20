<template>
  <li class="movie-item">
    <button @click="removeClickedTitle({event: $event, recievedTitleID})" v-show="determineWhenVisible" class="remove-title-btn" ref="removeTitleBtn">
      <img class="remove-img" src="../assets/remove.svg" alt="remove title button icon" />
    </button>
    <div id="sticker-container">
      <transition name="fade">
        <p v-show="isOnWatchlist && !determineWhenVisible">OWNED</p>
      </transition>
    </div>
    <img :id="recievedTitleID" class="movie-img" :src="poster" alt="movie poster" />
    <!--MovieList šalje prop "recievedTitleID" u TitleThumbnail a onda se šalje dalje u ButtonCTA-->
    <cta-button :recievedTitleID="recievedTitleID"></cta-button>
  </li>
</template>
<script>
import { isOnWatchlistMixin } from "../mixins";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [isOnWatchlistMixin],

  props: {
    recievedTitleID: {
      type: Number,
      required: true
    },
    poster: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(["isAuthenticated", "getWatchlist"]),

    determineWhenVisible: function() {
      if (this.isAuthenticated)
        return this.isOnWatchlist && this.$route.name === "watchlist";
    }
  },

  methods: {

    ...mapActions(["removeClickedTitle"]), 
    

  }

};
</script>
<style lang="scss" scoped>
.movie-item {
  position: relative;
  width: 250px;
  height: 400px;
  border: 2px solid black;
  background-color: black;
  border-radius: 0.5rem;
  transition: all 500ms;
  margin-right: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  &:hover {
    transform: scale(1.1);
    border: 2px solid white;

    .movie-img {
      border-radius: 0.5rem;
    }

    button:last-child {
      width: 85%;
      border-radius: 0.5rem;
    }
  }
}

.remove-title-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: 3px solid #c00909;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 200ms;
  cursor: pointer;
  outline: none;

  &:hover {
    transform: scale(1.2);
    .remove-img {
      transform: scale(0.7);
    }
  }
}
.remove-img {
  width: 75%;
  height: 75%;
  transition: transform 200ms;
}

.movie-img {
  cursor: pointer;
  transition: all 200ms;
  width: 100%;
  height: calc(100% - 2.5rem);
  border-radius: 0.5rem 0.5rem 0 0;
}

.disabled li {
  filter: grayscale(100);
  pointer-events: none;
}

#sticker-container {
  background-color: $btnBackgroundGreen;
  position: absolute;
  width: 10rem;
  top: 0;
  left: 0;
  transform-origin: center;
  transform: translateX(-45%) rotateZ(-45deg) translateY(150%);

  p {
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 1px;
    color: $textColor;
  }
}
</style>
