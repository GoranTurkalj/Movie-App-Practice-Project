<template>
  <div id="carousel-wrapper">
    <div class="carousel" v-if="getSelectedTitleImages.length">
      <button
        v-show="slides.length > 1 "
        ref="leftArrow"
        class="carousel__button carousel__button--left"
        @click="moveToPrevious"
      >
        <img src="../assets/left.svg" alt="left arrow button icon" />
      </button>
      <ul ref="carouselList" class="carousel__list">
        <li v-for="img in getSelectedTitleImages" :key="img.fullImagePath" class="carousel__item">
          <img :src="img.fullImagePath" alt="title poster images" />
        </li>
      </ul>
      <button
        v-show="slides.length > 1"
        ref="rightArrow"
        class="carousel__button carousel__button--right"
        @click="moveToNext"
      >
        <img src="../assets/right.svg" alt="right-arrow button icon" />
      </button>
    </div>
    <not-available v-else>PHOTOS</not-available>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  mounted: function () {
    this.track = this.$refs.carouselList;

    if (!this.track) {
      return;
    }
    this.slides = Array.from(this.track.children);
    this.currentSlide = this.slides[0];

    if (!this.currentSlide) {
      return;
    }

    this.currentSlide.classList.add("current-slide");
  },

  computed: {
    ...mapGetters(["getSelectedTitleImages"]),
  },

  data() {
    return {
      slides: "",
      track: "",
      currentSlide: "",
      nextSlide: "",
      previousSlide: "",
    };
  },

  methods: {
    moveToNext: function () {
      this.currentSlide = this.track.querySelector(".current-slide");

      if (!this.currentSlide || this.slides.length <= 1) {
        return;
      }

      this.nextSlide = this.currentSlide.nextElementSibling;

      if (!this.nextSlide) {
        this.nextSlide = this.slides[0];
      }

      //Add the next-slide class to get the effect of movement
      this.nextSlide.classList.add("next-slide");
      setTimeout(() => {
        this.nextSlide.classList.remove("next-slide");
      });

      this.nextSlide.classList.add("current-slide");
      this.currentSlide.classList.remove("current-slide");
    },

    moveToPrevious: function () {
      this.currentSlide = this.track.querySelector(".current-slide");

      if (!this.currentSlide || this.slides.length <= 1) {
        return;
      }

      this.previousSlide = this.currentSlide.previousElementSibling;

      if (!this.previousSlide) {
        this.previousSlide = this.slides[this.slides.length - 1];
      }
      this.previousSlide.classList.add("previous-slide");
      setTimeout(() => {
        this.previousSlide.classList.remove("previous-slide");
      });

      this.previousSlide.classList.add("current-slide");
      this.currentSlide.classList.remove("current-slide");
    },
  },
};
</script>
<style lang="scss" scoped>
#carousel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.carousel {
  width: 90%;
  margin: 0 auto;
  padding-top: 1rem;
  height: 100%;
  overflow: hidden;
}

.carousel__button {
  position: absolute;
  top: 50%;
  transition: transform 200ms;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 10;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.1) translateY(-50%);
  }
}

.carousel__button--left {
  left: -0.5rem;

  &:active {
    transform: translateX(-0.5rem) translateY(-50%);
  }
}
.carousel__button--right {
  right: -0.5rem;

  &:active {
    transform: translateX(0.5rem) translateY(-50%);
  }
}

.carousel__list {
  height: 100%;
  width: 100%;
  list-style-type: none;
  position: relative;
  display: flex;
  align-items: center;
  background-color: green;
}

.carousel__item {
  transition: all 300ms ease-in;
  opacity: 0;
  min-width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  border: 1px solid red;

  img {
    width: 100%;
    height: 90%;
  }
}

.current-slide {
  opacity: 1;
  left: 0;
}

.previous-slide {
  left: -100%;
}

.next-slide {
  left: 100%;
}

//MEDIA QUERIES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

@media only screen and (max-width: 1300px) {
  .carousel__item {
    min-width: 100%;
    height: auto; //From 100%,
    position: absolute;
    display: flex;
    align-items: center;

    img {
      width: 100%;
      height: 90%;
    }
  }
}
</style>



