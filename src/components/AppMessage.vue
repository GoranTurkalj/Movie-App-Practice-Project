<template>
  <div id="message-container">
    <slot>
      <h1>Welcome, dear user!</h1>
    </slot>
    <slot name="app-message"></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#message-container {
  width: 25rem;
  position: fixed;
  top: 30%;
  left: calc(50% - 12.5rem);
  padding: 1rem;
  background-color: black;
  border: $borderThin;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 52;
}

h1 {
  @include orangeGreyText();
  text-align: center;
  margin-bottom: 0.5rem;
}

p {
  color: $textColor;
  letter-spacing: 1px;
  text-align: center;
}

@media only screen and (max-width: 695px) {
  #message-container {
    width: 100%;
    left: 0;
    border-left: none;
    border-right: none;
    border-radius: 0; 
  }
}
@media only screen and (max-width: 395px) {
  h1 {
    font-size: 1.5rem;
  }
}
</style>