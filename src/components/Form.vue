<template>
  <form class="main-form" action>
    <slot></slot>
    <label for="username">Username</label>
    <input
      id="username"
      @blur="formData.name = $event.target.value"
      type="text"
    />
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      @blur="formData.email = $event.target.value"
    />
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      @blur="formData.password = $event.target.value"
    />
    <label for="confirm-password">Confirm password</label>
    <input id="confirm-password" type="password" />
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
      },
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
    },
  },
};
</script>
<style lang="scss" scoped>
.main-form {
  min-width: 23rem;
  max-width: 25rem;
  border: 2px solid $accentColor;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 0.5rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 1rem 0;
  text-align: center;
  color: $accentColor;
  font-family: "Bungee Inline";
  letter-spacing: 2px;
}

label {
  color: $accentColor;
  font-family: "Bungee Inline";
  line-height: 1;
  font-size: 1.1rem;
  letter-spacing: 2px;
}

input {
  font-size: 1.1rem;
  padding: 0.2rem;
  margin: 0.5rem 0 2.5rem 0;
  background-color: black;
  border: none;
  border-bottom: 2px solid rgb(66, 66, 66);
  color: $textColor;
  outline: none;

  &:focus {
    border-bottom: 2px solid white;

  }
}

button {
  background-color: $accentColor;
  margin: 2rem auto;
  width: 75%;
  color: black;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Bungee Inline";
  line-height: 1;
  padding: 0.5rem 0;
  transition: letter-spacing 200ms, transform 100ms;

  &:hover, &:focus {
    letter-spacing: 3px;
    filter: brightness(120%);
  }
 
  &:active {
    transform: scale(0.95);
  }
}
</style>
