<template>
  <section id="sign-up-page">
    <transition name="fade" mode="out-in">
      <main-form v-if="!authenticated">
        <h2>Sign Up!</h2>
      </main-form>
    </transition>
    <transition name="dropIn">
      <app-message v-if="$store.state.messageDisplayed">
        <h1>Welcome, {{$store.getters.getUser.name}}!</h1>
        <p slot="app-message">Congratulations! You have signed up successfully!</p>
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
#sign-up-page {
  @include basicPageStyle();
}
</style>