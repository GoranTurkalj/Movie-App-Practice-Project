<template>
  <div id="title-video-container" ref="trailerWindow">
    <youtube
      :video-id="getSelectedTitleVideos"
      :player-width="videoWidth"
      :player-height="videoHeight"
    ></youtube>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    window.addEventListener("resize", this.getDimensions);
    this.getDimensions();
  },

  data() {
    return {
      videoWidth: "",
      videoHeight: "",
    };
  },

  computed: {
    ...mapGetters(["getSelectedTitleVideos"]),
  },

  methods: {
    getDimensions: function() {
      this.videoWidth = this.$refs.trailerWindow.clientWidth;
      this.videoHeight = this.$refs.trailerWindow.clientHeight;
    },
  },
};
</script>
<style lang="scss" scoped>
#title-video-container {
  width: calc(100% - 23rem);
  height: 100%;
}
</style>
