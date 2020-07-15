<template>
  <div id="message-container">
    <h1>Welcome, {{$store.getters.getUser.name}}!</h1>
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#message-container {
  width: 300px;
  height: 500px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid $accentColor;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  color: white;
  text-align: center;
}

h2 {
  color: white;
  text-align: center;
}
</style>