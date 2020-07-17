export const determineRouteMixin = {
  computed: {
    isOnWatchlistRoute: function() {
      return this.$route.path.startsWith("/watchlist");
    },
  },
};

//Koristim u TitleDetails i TitleTrailer komponenentama - treba zatvoriti SelectedTitle (SelectedCard komponentu) kad se dolazi na sljedeće rute
export const routeGuardMixin = {
  beforeRouteLeave(to, from, next) {
    switch (to.name) {
      case "home":
      case "watchlist":
      case "signup":
      case "signin":
        this.closeSelectedTitle();
        break;
    }

    next();
  },
};
