<template>
  <section class="story-panel">
    <ul>
      <li class="title-list__item">
        Tagline
        <br />
        <span>{{getSelectedTitle.tagline || "Not available"}}</span>
      </li>
      <li class="title-list__item">
        Overview
        <br />
        <span>{{getSelectedTitle.overview || "Not available"}}</span>
      </li>
      <li class="title-list__item">
        Homepage:
        <br />
        <a class="homepage-link" :href="getSelectedTitle.homepage">{{getSelectedTitle.homepage || "Not available"}}</a>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getSelectedTitle"]),
  },
};
</script>
<style lang="scss" scoped>
.title-list__item {
  color: $accentColor;
  font-size: 1.2rem;
  padding-bottom: 0.9rem;
  span {
    color: $textColor;
    font-size: 1rem;
  }

  a {
    color: $textColor;
    font-size: 1rem;

    &:hover,
    &:active,
    &:focus {
      color: $accentColor;
    }
  }
}

.homepage-link {
  word-break: break-all;
}

.story-panel {
  height: 90%;
  width: 100%;
  color: $textColor;
 

  ul {
    list-style-type: none;
  }
}



@media only screen and (max-width: 475px) {
  .title-list__item {
    text-align: center;
  }
}
</style>
