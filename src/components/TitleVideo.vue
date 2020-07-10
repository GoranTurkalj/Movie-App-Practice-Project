<template>
  <div id="title-video-container" ref="trailerWindow">
    <iframe
      v-if="getSelectedTitleVideos"
      id="player"
      :src="displayTrailer"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media;"
      allowfullscreen
    ></iframe>
    <not-available v-else>VIDEOS</not-available>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getSelectedTitleVideos"]),
    displayTrailer: function() {
      return `https://www.youtube.com/embed/${this.getSelectedTitleVideos}?autoplay=1&modestbranding=1&rel=0&loop=1&playlist=${this.getSelectedTitleVideos}`;
    }
  }
};
</script>
<style lang="scss" scoped>
#title-video-container {
  width: calc(100% - 23rem);
  height: 100%;
}

#player {
  width: 100%;
  height: 100%;
}
</style>
