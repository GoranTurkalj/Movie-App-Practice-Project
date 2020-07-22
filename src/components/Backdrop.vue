<template>
  <div id="backdrop"></div>
</template>
<script>
export default {
  
};
</script>
<style lang="scss" scoped>
#backdrop {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
}
</style>