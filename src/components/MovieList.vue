<template>
  <section id="movies-container">
    <!--displayTitle prop može biti ili "showFullTitle" ili "showFullWatchlistTitle" akcija - obje komitaju istu mutaciju "updateSelectedTitle". Klikom na image na listi se kreira "selectedTitle" i onda se disejblaju ostali images ako je "getSelectedTitle" true-->
    <ul
      id="movie-list"
      @click="displayTitle"
      :disabled="getSelectedTitle"
      :class="{disabled: getSelectedTitle }"
    >
      <!--Ova komponenta prima id od svih naslova iz arraya, assigna ih kao id na images, taj id dalje šaljem u "title-thumbnail" i "cta-button" komponentu, da mu se mijenja izgled i funkcionalnost ovisno o tome je li film već dodan na listu i je li user ulogiran-->
      <title-thumbnail
        v-for="result in titlesArray"
        :key="result.id"
        :recievedTitleID="result.id"
        :poster="result.fullPosterPath"
      ></title-thumbnail>
    </ul>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSelectedTitle"])
  },

  props: {
    titlesArray: {
      type: Array
    },
    displayTitle: {
      type: Function
    }
  }
};
</script>
<style lang="scss" scoped>
#movies-container {
  width: 100%;
}

#movie-list {
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
}
</style>
