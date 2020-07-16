<template>
  <div class="selected-card">
    <div class="selected-card__preview">
      <div class="preview-img">
        <img :src="getSelectedTitle.fullPosterPath" alt="selected title image" />
      </div>
      <div class="preview-controls">
        <router-link
          class="preview-control"
          to="/title_details"
          active-class="active"
        >DETAILS</router-link>
        <router-link class="preview-control" to="/title_trailer" active-class="active">TRAILER</router-link>
      </div>
    </div>
    <router-view></router-view>
    <button class="close-btn" @click="closeSelectedTitle">
      <img src="../assets/close.svg" alt="close icon" />
    </button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSelectedTitle"])
  },
  methods: {
    ...mapActions(["closeSelectedTitle"])
  }
};
</script>
<style lang="scss" scoped>
.selected-card {
  width: 90%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  color: $accentColor;
  border: 2px solid $accentColor;
  border-radius: 1rem;
  position: fixed;
  left: 5%;
  top: 10vh;
  z-index: 10;
  display: flex;
  justify-content: space-between;
}

.selected-card__preview {
  height: 100%;
  width: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.preview-img {
  width: 22rem;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

.preview-controls {
  display: flex;
  justify-content: space-between;
}

.preview-control {
  transition: transform 200ms;
  width: 45%;

  padding-bottom: 0;
  background-color: transparent;
  color: $accentColor;
  border: none;
  font-family: "Bungee Inline";
  font-size: 1.5rem;
  letter-spacing: 1px;
  line-height: 1;
  text-decoration: none;
  outline: none;
  cursor: pointer;

  &:hover {
    color: white;
    transform: scale(1.04);
  }
}

.preview-control:last-of-type {
  text-align: right;
}

.close-btn {
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  width: 25px;
  height: 25px;
  transition: transform 200ms;
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.active {
  color: $activeColor;
}
</style>