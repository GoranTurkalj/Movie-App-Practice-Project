<template>
  <div class="screen">
    <transition name="fade" mode="out-in">
      <p class="message" v-if="messageVisible">
        <span
          :style="{animationDelay: 100 * (index + 2) + 'ms'}"
          class="message-letter"
          v-for="(letter, index) in createdMessage"
          :key="index"
        >{{letter}}</span>
      </p>
      <iframe
        v-else
        :src="fullTitle"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media;"
        allowfullscreen
      ></iframe>
    </transition>
  </div>
</template>
<script>
export default {
  mounted: function() {
    //When executed, it will  set messagaVisible to false after 3000ms, so that the animation for 'loading the movie' has time to play out before the video starts.
    this.playVideo();
  },

  data() {
    return {
      messageVisible: true
    };
  },

  computed: {
    fullTitle: function() {
      return `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0&loop=1`;
    },

    createdMessage: function() {
      const rawMessage = "LOADING  MOVIE...";

      return rawMessage;
    }
  },

  methods: {
    playVideo: function() {
      setTimeout(() => {
        this.messageVisible = false;
      }, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
.screen { 
  width: 100%;
  height: 80vh;
  background-color: black;

  iframe {
    width: 100%;
    height: 100%;
  }
}

.message {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
}

.message-letter {
  color: white;
  font-family: "Bungee Inline";
  font-size: 2.5rem;
  letter-spacing: 4px;
  opacity: 0;
  transform: translateX(20rem) rotateY(-180deg);
  animation: animateLetter 300ms linear 1 forwards;
}

@keyframes animateLetter {
  0% {
  }
  100% {
    opacity: 1;
    color: $accentColor;
    transform: translateX(0) rotateY(0deg);
  }
}

@media only screen and (max-width: 530px) {
  .message-letter {
    font-size: 1.2rem;
  }
}
</style>