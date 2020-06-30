<template>
  <section v-if="getResultsList.length > 0" id="movies-container">
    <ul id="movie-list">
      <li class="movie-item" v-for="result in getResultsList" :key="result.id">
        <img class="movie-img" :src="result.fullPosterPath" alt />
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getResultsList"])
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
  filter: grayscale(100);

  transition: transform 500ms, filter 500ms;

  &:hover {
    transform: scale(1.1);
    filter: grayscale(0);
    position: relative;
    z-index: 1;
  }
}
</style>
