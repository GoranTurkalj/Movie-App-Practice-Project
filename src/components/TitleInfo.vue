<template>
  <div class="title-info-container">
    <h1 class="title-name">
      {{getSelectedTitle.title}}
      <span class="info-year">{{extractYear}}</span>
    </h1>
    <div class="rating-container">
      <img src="../assets/star.svg" alt="user-rating icon" />
      <span>{{getSelectedTitle.rating}} / 10</span>
      <span id="votes">({{getSelectedTitle.votes}} votes)</span>
    </div>
    <button
      ref="watchlistBtn"
      class="watchlist-btn"
      @click="addToWatchlist(disableWatchlistBtn)"
      :disabled="alreadyAdded"
    >ADD TO WATCHLIST</button>
    <ul class="title-list">
      <li class="title-list__item">
        Director:
        <br />
        <span>{{getDirector}}</span>
      </li>
      <li class="title-list__item">
        Producer:
        <br />
        <span>{{getProducer}}</span>
      </li>
      <li class="title-list__item">
        Cast:
        <br />
        <span>{{getCast}}</span>
      </li>
      <li class="title-list__item">
        Genres:
        <span>{{getGenres || "No available info"}}</span>
      </li>
      <li class="title-list__item">
        Release Date:
        <span>{{getSelectedTitle.releaseDate}}</span>
      </li>
      <li class="title-list__item">
        Run Time:
        <span>{{getSelectedTitle.runtime}} min</span>
      </li>
    </ul>
    <div class="overview-panel">
      <nav class="overview-controls">
        <router-link to="/title_details/story">STORY</router-link>
        <router-link to="/title_details/gallery">GALLERY</router-link>
        <router-link to="/title_details/review">REVIEW</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  beforeRouteLeave(to, from, next) {
    switch (to.name) {
      case "home":
      case "watchlist":
      case "signup":
      case "signin":
        this.closeSelectedTitle();
        break;
    }

    next();
  },

  mounted: function() {
    this.checkIfAdded();
  },

  data() {
    return {
      overviewDisplayed: true,
      alreadyAdded: false
    };
  },
  computed: {
    ...mapGetters([
      "getSelectedTitle",
      "getDirector",
      "getProducer",
      "getCast",
      "getGenres",
      "getWatchlist"
    ]),
    //Returns only the year of the release date
    extractYear: function() {
      const date = this.getSelectedTitle.releaseDate;
      const year = date.split("-");
      return year[0];
    }
  },

  methods: {
    ...mapActions(["addToWatchlist", "closeSelectedTitle"]),

    checkIfAdded: function() {
      const selectedTitle = this.getSelectedTitle;
      const watchlist = this.getWatchlist;

      for (const item of watchlist) {
        if (item.id === selectedTitle.id) {
          this.disableWatchlistBtn(0, "added");
          return true;
        }
      }
    },

    //Called from inside checkIfAdded and also passed as payload to addToWatchlist action
    disableWatchlistBtn: function(delay, added, animated) {
      this.$refs.watchlistBtn.classList.add(added, animated);
      setTimeout(() => {
        this.$refs.watchlistBtn.textContent = "TITLE ADDED";
      }, delay);

      this.alreadyAdded = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.title-info-container {
  position: relative;
  width: calc(100% - 23rem);
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title-name {
  font-size: 2rem;
}

.info-year {
  @include orangeGreyText();
}

.watchlist-btn {
  width: 14rem;
  height: min-content;
  transition: transform 200ms;

  background-color: $accentColor;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem;
  border: 2px solid black;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    transform: scale(1.03);
  }
}

.rating-container {
  margin-top: 1rem;
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 2rem;
    height: 2rem;
  }

  span {
    padding-left: 1.5rem;
    font-size: 2rem;
    font-weight: bold;
    @include orangeGreyText();
  }

  #votes {
    font-size: 1.1rem;
    font-weight: 500;
  }
}

.title-list {
  margin-top: 1.5rem;
  list-style-type: none;
  width: 40%;
  height: 70%;
}

.title-list__item {
  color: $accentColor;
  font-size: 1.2rem;
  padding-bottom: 0.9rem;
  span {
    color: $textColor;
    font-size: 1rem;
  }

  a {
    color: $textColor;
    font-size: 1rem;

    &:hover,
    &:active,
    &:focus {
      color: $accentColor;
    }
  }
}

.overview-panel {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 55%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.overview-controls {
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $accentColor;

  a {
    text-decoration: none;
    transition: all 200ms;
    color: $accentColor;
    padding-right: 1.5rem;
    background-color: transparent;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    font-size: 1rem;
    font-family: "Bungee Inline";
    line-height: 1;
    letter-spacing: 1px;

    &:hover,
    &:active,
    &:focus {
      color: white;
    }
  }
}

.added {
  pointer-events: none;
  background: white;
  color: $accentColor;
}

.animated {
  animation: flipButton 750ms linear 1 forwards;
}

@keyframes flipButton {
  0% {
    background-color: $accentColor;
  }
  10% {
    background-color: white;
  }

  25% {
    color: transparent;
  }

  50% {
    color: transparent;
  }

  75% {
    color: $accentColor;
  }

  100% {
  }
}
</style>