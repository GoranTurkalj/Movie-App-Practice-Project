<template>
  <section id="movies-container">
    <ul
      id="movie-list"
      @click="displayTitle"
      :disabled="getSelectedTitle"
      :class="{disabled: getSelectedTitle }"
    >
      <li class="movie-item" v-for="result in titlesArray" :key="result.id">
        <img :id="result.id" class="movie-img" :src="result.fullPosterPath" alt="movie poster" />
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    titlesArray: {
      type: Array
    },
    displayTitle: {
      type: Function
    }
  },

  computed: {
    ...mapGetters(["getResultsList", "getWatchlist", "getSelectedTitle"])
  },

  methods: {
    ...mapActions(["displaySelectedTitle"])
  }
};
</script>
<style lang="scss" scoped>
#movies-container {
  width: 100%;
}

#movie-list {
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
}

.movie-item {
  padding-bottom: 1.5rem;
  padding-right: 1.5rem;
  width: 250px;
  height: 350px;
}

.movie-img {
  cursor: pointer;
  border: 2px solid black;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: black;
  box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.5);
  transition: transform 500ms, border-color 500ms;

  &:hover {
    transform: scale(1.1);
    position: relative;
    z-index: 1;
    border: 2px solid white;
  }
}

.disabled li {
  filter: grayscale(100);
  pointer-events: none;
}
</style>
