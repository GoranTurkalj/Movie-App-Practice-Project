<template>
  <div class="message">
    <h1>
      NO AVAILABLE
      <slot></slot>
    </h1>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.message {
  width: 100%;
  height: 100%;
  background-color: green;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @include orangeGreyText();
}
</style>