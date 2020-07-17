export const determineRouteMixin = {
  computed: {
    isOnWatchlist: function() {
      return this.$route.path.startsWith("/watchlist");
    },
  },
};
