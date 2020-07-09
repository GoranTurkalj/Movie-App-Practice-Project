<template>
  <div id="carousel-wrapper">
    <div class="carousel">
      <button ref="leftArrow" class="carousel__button carousel__button--left" @click="moveLeft">
        <img src="../assets/left.svg" alt="left arrow button icon" />
      </button>
      <ul ref="carouselList" class="carousel__list">
        <li v-for="img in getSelectedTitleImages" :key="img.fullImagePath" class="carousel__item">
          <img :src="img.fullImagePath" alt="title poster images" />
        </li>
      </ul>
      <button ref="rightArrow" class="carousel__button carousel__button--right" @click="moveRight">
        <img src="../assets/right.svg" alt="right-arrow button icon" />
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  mounted: function() {
    this.track = this.$refs.carouselList;
    this.slides = Array.from(this.track.children);
    this.currentSlide = this.slides[0];
    this.currentSlide.classList.add("current-slide");

    window.addEventListener("resize", this.recalculateSlideWidth);
  },

  computed: {
    ...mapGetters(["getSelectedTitleImages"])
  },

  data() {
    return {
      slides: "",
      track: "",
      slideWidth: "",
      currentSlide: "",
      nextSlide: "",
      previousSlide: ""
    };
  },

  methods: {
    moveRight: function() {
      this.currentSlide = this.track.querySelector(".current-slide");
      this.nextSlide = this.currentSlide.nextElementSibling;

      if (!this.nextSlide) {
        this.nextSlide = this.slides[0];
      }

      this.nextSlide.classList.add("current-slide");
      this.currentSlide.classList.remove("current-slide");
    },

    moveLeft: function() {
      this.currentSlide = this.track.querySelector(".current-slide");
      this.previousSlide = this.currentSlide.previousElementSibling;

      if (!this.previousSlide) {
        this.previousSlide = this.slides[this.slides.length - 1];
      }

      this.previousSlide.classList.add("current-slide");
      this.currentSlide.classList.remove("current-slide");
    }
  }
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
}

.carousel__item {
  transition: opacity 300ms;
  opacity: 0;

  min-width: 100%;
  height: 100%;
  position: absolute;

  img {
    width: 100%;
    min-height: 100%;
  }
}

.current-slide {
  opacity: 1;
}
</style>



