<template>
  <div id="carousel-wrapper">
    <div class="carousel">
      <button ref="leftArrow" class="carousel__button carousel__button--left" @click="moveSlide">
        <img src="../assets/left.svg" alt="left arrow button icon" />
      </button>
      <ul ref="carouselList" class="carousel__list">
        <li class="carousel__item">
          <img src="../assets/pic1.jpg" alt />
        </li>
        <li class="carousel__item">
          <img src="../assets/pic2.jpg" alt />
        </li>
        <li class="carousel__item">
          <img src="../assets/pic3.jpg" alt />
        </li>
      </ul>
      <button ref="rightArrow" class="carousel__button carousel__button--right" @click="moveSlide">
        <img src="../assets/right.svg" alt="right-arrow button icon" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentSlide: "",
      numberOfSlides: "",
      clicks: 1
    };
  },

  methods: {
    moveSlide: function(event) {
      const trackEl = this.$refs.carouselList;
      trackEl.style.transition = "transform 300ms ease-in";
      const slides = Array.from(this.$refs.carouselList.children);

      //Determine current slide
      if (!this.currentSlide) {
        this.currentSlide = slides[0];
        this.currentSlide.classList.add("current-slide");
      }
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
}

.carousel__button--left {
  left: -0.5rem;
}
.carousel__button--right {
  right: -0.5rem;
}

.carousel__list {
  height: 100%;
  width: 100%;
  list-style-type: none;
  display: flex;
}

.carousel__item {
  width: 100%;

  img {
    height: 100%;
  }
}

.current-slide {
  filter: grayscale(100);
}
</style>