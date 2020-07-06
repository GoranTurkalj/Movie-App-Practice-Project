<template>
  <header id="main-header">
    <nav class="main-nav">
      <ul class="nav-list nav-list--left">
        <router-link to="/" tag="li">
          <a href>HOME</a>
        </router-link>
        <router-link to="/watchlist" tag="li">
          <a href>WATCHLIST</a>
        </router-link>
      </ul>
      <div id="title-container">
        <img id="logo" src="../assets/logo.png" alt="logo" />
        <h1 id="app-title">MOVIE APP</h1>
      </div>
      <ul class="nav-list nav-list--right">
        <router-link to="/signup" tag="li">
          <a>SIGN UP</a>
        </router-link>
        <router-link to="/signin" tag="li">
          <a>SIGN IN</a>
        </router-link>
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
  width: 100vw;
  padding: 0 3rem;
  background-color: rgba(0, 0, 0, 0.5);
}

.main-nav {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.nav-list {
  width: 23rem;
  list-style-type: none;
  display: flex;
  align-items: center;

  a {
    display: inline-block;
    font-family: "Bungee Inline";
    transition: transform 200ms;
    color: $accentColor;
    text-decoration: none;
    font-size: 1.1rem;
    letter-spacing: 1px;
    margin-right: 2rem;

    &:hover {
      color: white;
      transform: translateY(-3px);
    }

    &:focus {
      color: white;
    }
  }
}

.nav-list--right {
  justify-content: flex-end;

  a {
    margin-right: 0;
    margin-left: 2rem;
  }
}

#title-container {
  display: flex;
  align-items: center;
  position: relative;
}

#logo {
  width: 45px;
  position: absolute;
  left: 51%;
  transform: rotateZ(20deg);
}

#app-title {
  font-family: "Monoton";
  font-size: 2.5rem;
  letter-spacing: 2px;
  color: $accentColor;
  word-spacing: 45px;
  @include orangeGreyText();
}
</style>
