<template>
  <form class="main-form" action>
    <slot></slot>
    <label for="username">Name</label>
    <input id="username" @blur="formData.name = $event.target.value" type="text" />
    <label for="email">Email</label>
    <input id="email" type="email" @blur="formData.email = $event.target.value" />
    <label for="password">Password</label>
    <input id="password" type="password" @blur="formData.password = $event.target.value" />
    <button @click.prevent="onSubmit">SUBMIT</button>
  </form>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      }
    };
  },

  methods: {
    //Depending on current route, so either /signup or /signin, onSubmit will execute a different method
    onSubmit: function() {
      console.log(this.$route.name);
      if (this.$route.name === "signup") {
        this.signUpUser();
      } else if (this.$route.name === "signin") {
        this.signInUser();
      }
    },

    signUpUser: function() {
      this.$store.dispatch("signUpAction", this.formData);
    },

    signInUser: function() {
      this.$store.dispatch("signInAction", this.formData);
    }
  }
};
</script>
<style lang="scss" scoped>
.main-form {
  min-width: 23rem;
  max-width: 30rem;
  height: 500px;
  border: 2px solid $accentColor;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 0.5rem;
  margin: 0 auto;
  padding: 0.5rem;
  color: white;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 1rem 0;
  text-align: center;
}

input {
  font-size: 1.4rem;
  padding: 0.2rem;
  margin-bottom: 1rem;
  background-color: black;
  border: 1px solid $accentColor;
  color: $textColor;
}

button {
  background-color: $accentColor;
  color: black;
  outline: none;
  cursor: pointer;
  border: none;
  font-size: 1.5rem;

  &:active {
    box-shadow: inset 2px 2px 2px 2px rgba(0, 0, 0, 0.6);
  }
}
</style>