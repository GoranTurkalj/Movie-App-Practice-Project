<template>
  <section id="movies-container">
    <!--displayTitle prop može biti ili "showFullTitle" ili "showFullWatchlistTitle" akcija - obje komitaju istu mutaciju "updateSelectedTitle". Klikom na image na listi se kreira "selectedTitle" i onda se disejblaju ostali images ako je "getSelectedTitle" true-->
    <transition-group
      @before-leave="beforeLeave"
      type="animation"
      name="slide"
      tag="ul"
      id="movie-list"
      @click.native="displayTitle"
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
    </transition-group>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    titlesArray: {
      type: Array
    },
    displayTitle: {
      type: Function
    }
  },

  methods: {
    beforeLeave: function(el) {
      el.style.left = el.offsetLeft + "px";
      el.style.top = el.offsetTop + "px";
    }
  },

  computed: {
    ...mapGetters(["getSelectedTitle"])
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

.slide-leave-active {
  animation: slideOut 1s ease-out 1 forwards;
  position: absolute;
}

.slide-move {
  transition: transform 500ms;
  transition-delay: 1000ms;
}

@keyframes slideOut {
  0% {
  }

  15% {
    transform: translateY(30px);
  }

  40% {
    transform: translateY(-90px);
    opacity: 0.1;
  }

  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
}
</style>

