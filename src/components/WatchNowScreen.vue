<template>
  <div class="screen" ref="screen">
    <iframe
      :src="fullTitle"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media;"
      allowfullscreen
    ></iframe>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  beforeRouteLeave: function(to, from, next) {
    this.$store.commit("turnOffIsPlaying");
    next();
  },
  computed: {
    ...mapGetters(["getIsPlaying"]),
    fullTitle: function() {
      return this.getIsPlaying
        ? `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0&loop=1`
        : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.screen {
  position: fixed;
  width: 100%;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.7);

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>