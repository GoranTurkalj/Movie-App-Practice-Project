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
import { mapGetters, mapActions } from "vuex";
import { routeGuardMixin } from "../mixins";
export default {
  mixins: [routeGuardMixin],
  computed: {
    ...mapGetters(["getSelectedTitleVideos"]),
    displayTrailer: function () {
      return `https://www.youtube.com/embed/${this.getSelectedTitleVideos}?autoplay=1&modestbranding=1&rel=0&loop=1&playlist=${this.getSelectedTitleVideos}`;
    },
  },

  methods: {
    ...mapActions(["closeSelectedTitle"]),
  },
};
</script>
<style lang="scss" scoped>

#title-video-container {
  width: calc(100% - 23rem); 
  height: auto;
 
}

//iframe
#player {
  width: 100%; 
  height: 100%;
}


 @media only screen and (max-width: 990px) {

   #title-video-container {
     width: 100vw;
     min-height: 25rem;
   }
 }


</style>
