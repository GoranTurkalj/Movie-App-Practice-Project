<template>
  <section id="sign-in-page">
    <transition name="fade" mode="out-in">
      <main-form v-if="!authenticated">
        <h2>Sign In!</h2>
      </main-form>
       </transition>
      <transition name="dropIn">
         <app-message v-if="$store.state.messageDisplayed">
        <h1>Welcome, {{$store.getters.getUser.name}}!</h1>
        <p slot="app-message">You are now signed in!</p>
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
  @include basicPageStyle();
}

@media only screen and (max-width: 495px) {
  #sign-in-page {
    @include tinyPadding(); 
  }
}
</style>