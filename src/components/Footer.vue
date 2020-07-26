<template>
  <footer class="main-footer" :class="{'fade-away': $route.name === 'watchnow'}">
    <img class="attribution-logo" src="../assets/tmdb.svg" alt="TMDB icon" />
    <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
    <p>Coded by Goran Turkalj</p>
  </footer>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
.main-footer {
  height: 10vh;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  transition: all 300ms;
}

.attribution-logo {
  height: 1rem;
}

p {
  color: $textColor;
  font-size: 0.8rem;
}

.fade-away {
  img,
  p {
    transform: scale(0);
  }
}
</style>