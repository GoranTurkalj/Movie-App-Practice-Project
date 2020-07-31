<template>
  <div class="selected-card">
    <div class="selected-card__preview">
      <div class="preview-img">
        <img :src="getSelectedTitle.fullPosterPath" alt="selected title image" />
      </div>
      <div class="preview-controls" v-if="!isOnWatchlistRoute">
        <router-link class="preview-control" to="/title_details">DETAILS</router-link>
        <router-link class="preview-control" to="/title_trailer">TRAILER</router-link>
      </div>
      <div class="preview-controls" v-else>
        <router-link class="preview-control" to="/watchlist/title_details">DETAILS</router-link>
        <router-link class="preview-control" to="/watchlist/title_trailer">TRAILER</router-link>
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
import { determineRouteMixin } from "../mixins";

export default {
  mixins: [determineRouteMixin],
  computed: {
    ...mapGetters(["getSelectedTitle"]),
  },
  methods: {
    ...mapActions(["closeSelectedTitle"]),
  },
};
</script>
<style lang="scss" scoped>
.selected-card {
  width: 90%;
  max-width: 90rem;
  height: 87%;
  max-height: 56.25rem;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  color: $accentColor;
  border: $borderNormal;
  border-radius: 1rem;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 10vh;
  z-index: 51;
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

.router-link-active {
  color: white;
}

//Media Queries XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
@media only screen and (max-width: 1300px) {
  .selected-card {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    left: 0;
    top: 0;
    transform: translateX(0);
  }

  .selected-card__preview {
    justify-content: flex-end;
  }

  .preview-controls {
    margin-top: 1.5rem;
  }
}

@media only screen and (max-width: 990px) {
  .selected-card {
    overflow-y: auto;
    flex-direction: column;
    align-items: center;
  }

  .selected-card::-webkit-scrollbar {
    display: none;
  }

  .selected-card__preview {
    width: 100%;
    align-items: center;
  }

  .preview-img {
    width: 100%;
    height: 100%;

    img {
      object-fit: contain;
    }
  }

  .preview-controls {
    justify-content: space-between;
    width: min-content;
    margin-bottom: 2rem;
  }

  .preview-control {
    width: min-content;
  }

  .preview-control:first-of-type {
    margin-right: 1.5rem;
  }
  .preview-control:last-of-type {
    margin-left: 1.5rem;
  }
}
</style>