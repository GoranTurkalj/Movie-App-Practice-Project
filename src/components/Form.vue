<template>
  <form class="main-form" action>
    <slot></slot>
    <div class="main-form-group">
      <label for="username">Username</label>
      <input
        id="username"
        :class="{'invalid-input': $v.name.$error, 'valid-input': !$v.name.$invalid}"
        v-model="name"
        type="text"
        @blur="$v.name.$touch()"
      />
      <p class="invalid-message" v-if="$v.name.$error">Username must be 3-12 characters long.</p>
    </div>
    <div class="main-form-group">
      <label for="email">Email</label>
      <input
        id="email"
        :class="{'invalid-input': $v.email.$error, 'valid-input': !$v.email.$invalid}"
        type="email"
        v-model="email"
        @blur="$v.email.$touch()"
      />
      <p class="invalid-message" v-if="$v.email.$error">Please enter valid email.</p>
    </div>
    <div class="main-form-group">
      <label for="password">Password</label>
      <input
        id="password"
        :class="{'invalid-input': $v.password.$error, 'valid-input': !$v.password.$invalid}"
        type="password"
        v-model="password"
        @blur="$v.password.$touch()"
      />
      <p class="invalid-message" v-if="$v.password.$error">Password must be between 6-12 characters.</p>
    </div>
    <div class="main-form-group">
      <label for="confirm-password">Confirm password</label>
      <input
        id="confirm-password"
        :class="{'invalid-input': $v.confirmPassword.$error, 'valid-input': !$v.confirmPassword.$invalid && !$v.password.$invalid}"
        type="password"
        v-model="confirmPassword"
        @blur="$v.confirmPassword.$touch()"
      />
      <p class="invalid-message" v-if="$v.confirmPassword.$error">Passwords do not match!</p>
    </div>
    <button
      :disabled="$v.$invalid"
      :class="{'disabled-submit': $v.$invalid}"
      @click.prevent="onSubmit"
    >SUBMIT</button>
  </form>
</template>
<script>
import axios from "axios";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
export default {
  validations: {
    name: {
      required,
      minimumLength: minLength(3),
      maximumLength: maxLength(12)
    },

    email: {
      required,
      email
    },
    password: {
      required,
      minimumLength: minLength(6),
      maximumLength: maxLength(12)
    },

    confirmPassword: {
      sameAs: sameAs("password")
    }
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
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
      this.$store.dispatch("signUpAction", {
        name: this.name,
        email: this.email,
        password: this.password
      });
    },

    signInUser: function() {
      this.$store.dispatch("signInAction", {
        name: this.name,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.main-form {
  min-width: 23rem;
  max-width: 25rem;
  border: $borderNormal;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 0.5rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
}

.main-form-group {
  display: flex;
  flex-direction: column;
  position: relative;
}

h2 {
  margin: 1rem 0 0.5rem 0;
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
  margin: 0.5rem 0 2.4rem 0;
  background-color: black;
  border: none;
  border-bottom: 1px solid rgb(66, 66, 66);
  color: $textColor;
  outline: none;
  transition: border-color 250ms;

  &:focus {
    border-bottom: 1px solid white;
  }
}


input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  box-shadow: 0 0 0 30px rgb(0, 0, 0) inset !important;
  -webkit-box-shadow: 0 0 0 30px rgb(0, 0, 0) inset !important;
}

input:-webkit-autofill {
  -webkit-text-fill-color: $textColor !important;
}

button {
  background-color: $accentColor;
  margin: 1.75rem auto;
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
  transition: all 200ms;

  &:hover,
  &:focus {
    letter-spacing: 3px;
    filter: brightness(120%);
  }

  &:active {
    transform: scale(0.95);
  }
}

.invalid-input {
  border-bottom: 1px solid red;
}
.valid-input {
  border-bottom: 1px solid $btnBackgroundGreen;
}

.disabled-submit {
  background-color: grey;
  pointer-events: none;
}

.invalid-message {
  position: absolute;
  left: 0;
  top: 63%;
  color: $accentColor;
}
</style>
