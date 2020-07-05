<template>
  <div class="title-info-container">
    <h1>
      {{getSelectedTitle.original_title}}
      <span class="info-year">{{extractYear}}</span>
    </h1>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSelectedTitle"]),

    //Returns only the year of the release date
    extractYear: function() {
      const date = this.getSelectedTitle.release_date;
      const year = date.split("-");
      return year[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.title-info-container {
  width: calc(100% - 23rem);
  height: 100%;
  color: white;
}

.info-year {
  color: $accentColor;
}
</style>