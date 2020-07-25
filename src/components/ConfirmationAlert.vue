<template>
  <div id="alert-container">
    <slot>
      <h2>Are you sure?</h2>
    </slot>
    <div class="alert-container__controls">
      <button class="alert-container__control" @click="confirm">
        <img src="../assets/ok.svg" alt="confirm button icon" />
      </button>
      <button class="alert-container__control" @click="closeAlertPrompt">
        <img src="../assets/remove.svg" alt="abort button icon" />
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    confirm: {
      type: Function,
      required: true,
    },
  },

  methods: {
    ...mapMutations(["closeAlertPrompt"]),
  },
};
</script>
<style lang="scss" scoped>
#backdrop-container {
  background-color: white;
  position: fixed;
  width: 100wv;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
#alert-container {
  background-color: black;
  border: $borderNormal;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 25rem;
  max-height: 15rem;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h2 {
  @include orangeGreyText();
  text-align: center;
  margin-bottom: 2rem;
}

.alert-container__controls {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.alert-container__control {
  width: 3rem;
  height: 3rem;
  border: none;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  transition: transform 150ms, background-color 500ms;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 70%;
    height: 70%;
  }

  &:first-of-type {
    img {
      width: 80%;
      height: 80%;
    }
  }
  &:hover,
  &:focus {
    background-color: rgb(12, 12, 12);
  }

  &:active {
    transform: scale(1.3);
  }
}
</style>