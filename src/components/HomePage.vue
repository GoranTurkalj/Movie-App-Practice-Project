<template>
  <section id="homepage">
    <div class="search-container">
      <input class="search-input" type="text" @blur="updateSearchedTitle" />
      <button id="search-btn" @click="requestSearchResults">SEARCH</button>
    </div>
    <movie-list></movie-list>
  </section>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  methods: {
    //Updating searchedTitle in the state
    ...mapMutations(["updateSearchedTitle"]),
    ...mapActions(["requestSearchResults"])
  },

  computed: {}
};
</script>

<style lang="scss">
#homepage {
  padding: 1.5rem 3rem;

  min-height: 90vh;
}
.search-container {
  display: flex;
  height: 2.2rem;
}

.search-input {
  height: 100%;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  border: 1px solid $accentColor;
  border-right: none;
}

#search-btn {
  height: 100%;
  padding: 0 1rem;

  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: 1px solid $accentColor;
  font-size: 1.1rem;
  cursor: pointer;
  outline: none;

  &:hover,
  &:active {
    color: $accentColor;
  }
}
</style>
