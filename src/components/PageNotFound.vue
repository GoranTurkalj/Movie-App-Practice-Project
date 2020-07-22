<template>
  <section class="page-container">
    <general-info>
      <img slot="info-image" src="../assets/not-found-icon.png" alt="page not found icon" />
      <h2 slot="info-title">PAGE NOT FOUND! :(</h2>
      <p slot="info-tip-1">
        Please, go
        <router-link to="/">home</router-link>!
      </p>
    </general-info>
  </section>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.page-container {
  @include basicPageStyle();
}
</style>