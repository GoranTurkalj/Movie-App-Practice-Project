<template>
  <section id="sign-in-page">
    <transition name="fade" mode="out-in">
      <main-form v-if="!authenticated">
        <h2>Sign In!</h2>
      </main-form>
      <app-message v-else>
        <h2>You are signed in!</h2>
      </app-message>
    </transition>
  </section>
</template>

<script>
export default {
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>


<style lang="scss" scoped>
#sign-in-page {
  padding: 1.5rem 3rem;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 500ms;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 500ms;
}
</style>