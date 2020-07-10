<template>
  <section id="watchlist">
    <general-info>
      <img src="../assets/watchlist-logo.png" alt slot="info-image" />
      <h2 slot="info-title">Your WatchList is currently empty!</h2>>
      <p
        slot="info-tip-1"
      >You can add titles to your watchlist, rate them and write your own reviews!</p>
      <p slot="info-tip-2">To save your watchlist, you need to sign-up or sign-in!</p>
    </general-info>
  </section>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
#watchlist {
  padding: 1.5rem 3rem;
  position: relative;
  min-height: 90vh;
  width: 100%;
}
</style>