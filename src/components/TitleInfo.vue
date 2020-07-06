<template>
  <div class="title-info-container">
    <h1 class="title-name">
      {{getSelectedTitle.original_title}}
      <span class="info-year">{{extractYear}}</span>
    </h1>
    <div class="rating-container">
      <img src="../assets/star.svg" alt="user-rating icon" />
      <span>10 / 10</span>
    </div>
    <button class="watchlist-btn">ADD TO WATCHLIST</button>
    <ul class="title-list">
      <li class="title-list__item">Director:</li>
      <li class="title-list__item">Genres</li>
      <li class="title-list__item">Release Date</li>
      <li class="title-list__item">Run Time</li>
      <li class="title-list__item">Budget</li>
      <li class="title-list__item">Budget</li>
      <li class="title-list__item">Revenue</li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSelectedTitle"]),

    //Returns only the year of the release date
    extractYear: function() {
      const date = this.getSelectedTitle.release_date;
      const year = date.split("-");
      return year[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.title-info-container {
  width: calc(100% - 23rem);
  height: 100%;
  color: white;
}

.title-name {
  font-size: 2rem;
}

.info-year {
  @include orangeGreyText();
}

.watchlist-btn {
  width: 13rem;
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
  width: 9.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 2rem;
    height: 2rem;
  }

  span {
    font-size: 2rem;
    font-weight: bold;
    @include orangeGreyText();
  }
}

.title-list {
  list-style-type: none;
  width: 35%;
  background-color: rgb(160, 100, 100);
}
</style>