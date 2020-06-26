<template>
  <header id="main-header">
    <nav class="main-nav">
      <ul class="nav-list">
        <router-link to="/" tag="li"><a href="">HOME</a></router-link>
        <router-link to="/watchlist" tag="li"
          ><a href="">WATCHLIST</a></router-link
        >
      </ul>
      <ul class="nav-list">
        <router-link to="/signup" tag="li"><a href="">SIGN UP</a></router-link>
        <router-link to="/signin" tag="li"><a href="">SIGN IN</a></router-link>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#main-header {
  height: 10vh;
  padding: 0 3rem;
  background-color: rgba(0, 0, 0, 0.5);
}

.main-nav {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.nav-list {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 13%;

  a {
    transition: transform 200ms;
    display: inline-block;
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    letter-spacing: 1px;

    &:hover,
    &:focus {
      color: gold;
      transform: translateY(-3px);
    }
  }
}
</style>
