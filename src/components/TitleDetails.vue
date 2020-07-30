<template>
  <div class="title-detail-container">
    <h1 class="title-name">
      {{getSelectedTitle.title}}
      <span class="info-year">{{extractYear}}</span>
    </h1>
    <div class="rating-container">
      <img src="../assets/star.svg" alt="user-rating icon" />
      <span>{{getSelectedTitle.rating}} / 10</span>
      <span id="votes">({{getSelectedTitle.votes}} votes)</span>
    </div>
    <!--CTA button komponenta ovdje prima id od onog titlea koji je trenutno selected-->
    <cta-button :recievedTitleID="getSelectedTitle.id"></cta-button>
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
        <br />
        <span>{{getGenres || "No available info"}}</span>
      </li>
      <li class="title-list__item">
        Release Date:
        <br />
        <span>{{getSelectedTitle.releaseDate | toNicerDate}}</span>
      </li>
      <li class="title-list__item">
        Run Time:
        <br />
        <span>{{getSelectedTitle.runtime}} min</span>
      </li>
    </ul>
    <div class="overview-panel">
      <nav class="overview-controls" v-if="!isOnWatchlistRoute">
        <router-link :to="{name: 'titleStory'}">STORY</router-link>
        <router-link :to="{name: 'titleGallery'}">GALLERY</router-link>
      </nav>
      <nav class="overview-controls" v-else>
        <router-link :to="{name: 'watchlistTitleStory'}">STORY</router-link>
        <router-link :to="{name: 'watchlistTitleGallery'}">GALLERY</router-link>
        <router-link :to="{name: 'watchlistTitleReview'}">REVIEW</router-link>
      </nav>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { determineRouteMixin, routeGuardMixin } from "../mixins";

export default {
  mixins: [determineRouteMixin, routeGuardMixin],

  filters: {
    toNicerDate(value) {
      const date = new Date(value);
      //I want a date to appear like this: April 4th 1992
      return date.toLocaleString("en-EN", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },
  },

  data() {
    return {
      overviewDisplayed: true,
      alreadyAdded: false,
    };
  },
  computed: {
    ...mapGetters([
      "getSelectedTitle",
      "getDirector",
      "getProducer",
      "getCast",
      "getGenres",
      "getWatchlist",
      "isAuthenticated",
    ]),
    //Returns only the year of the release date
    extractYear: function () {
      const date = this.getSelectedTitle.releaseDate;
      const year = date.split("-");
      return year[0];
    },
  },

  methods: {
    ...mapActions(["addToWatchlist", "closeSelectedTitle"]),
  },
};
</script>

<style lang="scss" scoped>
.title-detail-container {
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
.router-link-active {
  color: white !important;
}

//MEDIA QUERIES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

@media only screen and (max-width: 1300px) {
  .title-name {
    position: absolute;
    top: 0;
    left: -23rem;
  }

  .rating-container {
    position: absolute;
    top: 2rem;
    left: -23rem;
    width: 23rem;
  }

  .title-list {
    position: absolute;
    top: 60%;
    left: 0;
    width: 100%;
    height: min-content;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .title-list__item {
    min-width: 17rem;
    width: min-content;
    height: min-content;
    padding-bottom: 1.5rem;
    padding-right: 2rem;
  }

  .overview-panel {
    position: absolute;
    bottom: 0;
    top: 2.7rem;
    right: 0;
    left: 0;
    width: 100%;
    height: 50%;
  }
}

@media only screen and (max-width: 990px) {
  .title-detail-container {
    width: 100%;
    height: min-content;
    align-items: center;
  }

  .title-name {
    position: static;
    text-align: center;
  }

  .rating-container {
    position: static;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;

    img {
      margin-bottom: 1rem;
    }
    span {
      padding: 0;
    }
  }

  .title-list {
    width: 100%;
    position: static;
    margin: 4rem 0;
    justify-content: center;
  }

  

  .overview-panel {
    position: static;
    width: 100%;
    min-height: 30rem;
  }

  .overview-controls {
    justify-content: center;
  }
}


@media only screen and (max-width: 575px){

  .title-list__item {
    text-align: center;
  }
}

@media only screen and (max-width: 475px) {
  .title-name {
    font-size: 1.5rem;
  }

  .rating-container {
    span {
      font-size: 1.2rem;
    }

    #votes {
      font-size: 1rem;
    }
  }
}
</style>