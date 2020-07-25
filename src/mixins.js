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
        this.closeSelectedTitle();
        break;
    }

    next();
  },
};

//Koristim ga u TitleThumbnail da znam kad treba prikazati "owned" sticker na thumbnaili, te u ButtonCTA da znam na koje naslove se treba attachati "cta-button--watch" klasa i još u "displayButtonText" computed propertiju također u ButtonCTA komponenti
export const isOnWatchlistMixin = {
  computed: {
    isOnWatchlist: function() {
      if (this.isAuthenticated) {
        for (const title of this.getWatchlist) {
          if (title.id === this.recievedTitleID) {
            return true;
          }
        }
      }
    },
  },
};

//Ako je nešto od ovog true, disableati keyboard focus stavljanjem tabindex = -1
export const disableFocusMixin = {
  computed: {
    disableFocusMixin() {
      if (this.getAlertPrompt || this.getSelectedTitle) {
        return -1;
      }
    },
  },
};

//isProperRoute - returns true if passed in string of a route name is equal to current route

export const isProperRouteMixin = {
  methods: {
    isProperRouteMixin(routeName) {
      if (routeName === this.$route.name) return true;
    },
  },
};
