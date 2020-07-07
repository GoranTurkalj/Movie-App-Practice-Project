<template>
  <section id="homepage">
    <div class="search-container">
      <input class="search-input" type="text" @blur="updateSearchedTitle" />
      <button id="search-btn" @click="requestSearchResults"></button>
    </div>
    <div class="homepage-greeting" v-if="$store.state.resultsList.length < 1">
      <ul class="info-list">
        <li class="info-list__item">
          <p>Search for your favourite movies and TV shows!</p>
        </li>
        <li class="info-list__item">
          <p>Gather information or watch a trailer!</p>
        </li>
        <li class="info-list__item">
          <p>Sign up to use the Watchlist feature!</p>
        </li>
      </ul>
    </div>
    <movie-list v-else></movie-list>
    <transition name="fade">
      <selected-card v-if="getSelectedTitle"></selected-card>
    </transition>
  </section>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSelectedTitle"])
  },
  methods: {
    //Updating searchedTitle in the state
    ...mapMutations(["updateSearchedTitle"]),
    ...mapActions(["requestSearchResults"])
  }
};
</script>

<style lang="scss">
#homepage {
  padding: 1.5rem 3rem;
  position: relative;
  min-height: 90vh;
}
.search-container {
  display: flex;
  height: 2.7rem;
}

.search-input {
  height: 100%;
  width: 35%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  border: 2px solid $accentColor;
  border-radius: 1rem 0 0 1rem;
  border-right: none;
}

#search-btn {
  transition: all 200ms;
  height: 100%;
  width: 4rem;
  padding: 0 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url("../assets/search.svg");
  background-size: 45%;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  border: 2px solid $accentColor;
  border-left: none;
  border-radius: 0 1rem 1rem 0;
  font-size: 1.1rem;
  cursor: pointer;
  outline: none;

  &:hover {
    background-size: 55%;
  }
}

.homepage-greeting {
  margin-top: 3rem;
  width: 40%;
  height: 15rem;
}

.info-list {
  list-style-type: none;
  color: $accentColor;
  padding-left: 2.2rem;

  li:first-of-type {
    font-family: "Monoton";
  }
}

.info-list__item {
  padding-bottom: 1rem;
  font-size: 1.1rem;
  position: relative;

  p::before {
    content: "";
    background-image: url("../assets/bulletpoint.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    width: 30px;
    height: 30px;

    position: absolute;
    left: -7%;
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
 transition: opacity 400ms;
}

.fade-leave-active {
  transition: opacity 400ms;
  opacity: 0;
}

</style>
