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
    <button class="watchlist-btn">ADD TO WATCHLIST</button>
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
      <div class="overview-controls">
        <button @click="overviewDisplayed = true">OVERVIEW</button>
        <button @click="overviewDisplayed = false">GALLERY</button>
      </div>
      <section class="overview-panel__story" :class="{displayed: overviewDisplayed}">
        <ul>
          <li class="title-list__item">
            Tagline
            <br />
            <span>{{getSelectedTitle.tagline || "Not available"}}</span>
          </li>
          <li class="title-list__item">
            Overview
            <br />
            <span>{{getSelectedTitle.overview || "Not available"}}</span>
          </li>
        </ul>
      </section>
      <section class="overview-panel__gallery" :class="{displayed: !overviewDisplayed}">
        <photo-carousel></photo-carousel>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      overviewDisplayed: true
    };
  },
  computed: {
    ...mapGetters([
      "getSelectedTitle",
      "getDirector",
      "getProducer",
      "getCast",
      "getGenres"
    ]),

    //Returns only the year of the release date
    extractYear: function() {
      const date = this.getSelectedTitle.releaseDate;
      const year = date.split("-");
      return year[0];
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
  background: linear-gradient(rgb(107, 103, 103), $accentColor);
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

  &:active,
  &:focus {
    color: white;
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
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    transition: all 200ms;
    color: $accentColor;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    outline: none;
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

.overview-panel__story {
  height: 90%;
  width: 100%;
  display: none;
  color: $textColor;
  border-top: 1px solid $accentColor;
  padding-top: 1rem;

  ul {
    list-style-type: none;
  }
}
.overview-panel__gallery {
  border-top: 1px solid $accentColor;
  display: none;
  height: 90%;
  width: 100%;
}

.displayed {
  display: block;
}
</style>