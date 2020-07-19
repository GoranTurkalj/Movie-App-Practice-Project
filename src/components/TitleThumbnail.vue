<template>
  <li class="movie-item">
    <img class="favorite-img" src="../assets/star.svg" alt="favorite movie icon" />
    <div id="sticker-container">
      <p>OWNED</p>
    </div>
    <img :id="resultID" class="movie-img" :src="poster" alt="movie poster" />
    <!--Šaljem dalje id kao prop u button-->
    <cta-button :recievedTitleID="resultID"></cta-button>
  </li>
</template>
<script>
export default {
  props: {
    resultID: {
      type: Number,
      required: true
    },
    poster: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.movie-item {
  position: relative;
  width: 250px;
  height: 400px;
  border: 2px solid black;
  background-color: black;
  border-radius: 0.5rem;
  transition: all 500ms;
  margin-right: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  &:hover {
    transform: scale(1.1);
    border: 2px solid white;

    .movie-img {
      border-radius: 0.5rem;
    }

    button {
      width: 85%;
      border-radius: 0.5rem;
    }
  }
}

.favorite-img {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  width: 2rem;
  height: 2rem;
  transform: rotateZ(-45deg);
}

.movie-img {
  cursor: pointer;
  transition: all 200ms;
  width: 100%;
  height: calc(100% - 2.5rem);
  border-radius: 0.5rem 0.5rem 0 0;
}

.disabled li {
  filter: grayscale(100);
  pointer-events: none;
}

#sticker-container {
  background-color: $btnBackgroundGreen;
  position: absolute;
  width: 10rem;
  top: 0;
  left: 0;
  transform-origin: center;
  transform: translateX(-45%) rotateZ(-45deg) translateY(150%);

  p {
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 1px;
    color: $textColor;
  }
}
</style>
