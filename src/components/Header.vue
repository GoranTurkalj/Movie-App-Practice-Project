<template>
  <header class="main-header" :class="{dark: $route.name === 'watchnow'}">
    <div id="title-container-mobile">
      <img id="logo-mobile" src="../assets/logo.png" alt="logo" />
      <h1 id="app-title-mobile">MOVIE APP</h1>
    </div>
    <button class="hamburger-menu" @click="toggleMenu">
      <img src="../assets/hamburger.svg" alt="hamburger menu icon" :class="{skewed: showMenu}" />
    </button>

    <nav ref="mainNav" class="main-nav" @click="closeMenuOnClick">
      <ul class="nav-list nav-list--left">
        <router-link to="/" class="nav-item" exact tag="li">
          <a>HOME</a>
        </router-link>
        <router-link v-if="isAuthenticated" to="/watchlist" class="nav-item" tag="li">
          <a>WATCHLIST</a>
        </router-link>
      </ul>
      <div id="title-container">
        <img id="logo" src="../assets/logo.png" alt="logo" />
        <h1 id="app-title">MOVIE APP</h1>
      </div>
      <ul class="nav-list nav-list--right">
        <router-link v-if="!isAuthenticated" to="/signup" class="nav-item" tag="li">
          <a>SIGN UP</a>
        </router-link>
        <router-link v-if="!isAuthenticated" to="/signin" class="nav-item" tag="li">
          <a>SIGN IN</a>
        </router-link>
        <router-link
          v-if="isAuthenticated"
          to="/signin"
          class="nav-item"
          tag="li"
          @click.native="logOutUser"
        >
          <a>LOG OUT</a>
        </router-link>
      </ul>
    </nav>
  </header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { disableFocusMixin } from "../mixins";
export default {
  mixins: [disableFocusMixin],

  mounted: function () {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
      if (!this.isMobile) {
        this.showMenu = false;
        this.$refs.mainNav.style.display = "flex";
        this.$refs.mainNav.classList.remove("main-nav--visible");
      } else if (this.isMobile && this.showMenu) {
        this.$refs.mainNav.style.display = "flex";
      } else if (this.isMobile && !this.showMenu) {
        this.$refs.mainNav.style.display = "none";
      }
    });
  },

  data() {
    return {
      windowWidth: window.innerWidth,
      showMenu: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    isMobile() {
      return this.windowWidth <= 695;
    },
  },
  methods: {
    ...mapActions(["closeSelectedTitle", "logOutUser"]),
    toggleMenu() {
      this.showMenu = !this.showMenu;
      if (this.isMobile && this.showMenu) {
        this.$refs.mainNav.style.display = "flex";
        setTimeout(() => {
          this.$refs.mainNav.classList.add("main-nav--visible");
        }, 10);
      } else if (this.isMobile && !this.showMenu) {
        this.closeMobileMenu();
      }
    },

    closeMenuOnClick(event) {
      if (this.isMobile && event.target.tagName === "A") {
        this.showMenu = false;
        this.closeMobileMenu();
      }
    },

    closeMobileMenu() {
      //ako smo na mobile veličini i event target je link, onda zatvoriti menu nakon klika
      this.$refs.mainNav.classList.remove("main-nav--visible");
      //Delay zbog tranzicije kod micanja klase, zatim display none.
      setTimeout(() => {
        this.$refs.mainNav.style.display = "none";
      }, 300);
    },
  },
};
</script>
<style lang="scss" scoped>
.main-header {
  height: 10vh;
  width: 100%;
  padding: 0 3rem;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 300ms;
  display: flex;
  align-items: center;
}

.hamburger-menu {
  display: none;
  width: 2rem;
  height: 2rem;
  @include controlButtons();
  margin-right: 0;
  img {
    width: 100%;
    height: 100%;
    transition: transform 300ms;
  }
}

#title-container-mobile {
  display: none;
}

.main-nav {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.nav-list {
  width: 15rem;
  list-style-type: none;
  display: flex;
  align-items: center;
}

.nav-item a {
  display: inline-block;
  font-family: "Bungee Inline";
  transition: transform 200ms;
  color: $accentColor;
  text-decoration: none;
  font-size: 1.1rem;
  letter-spacing: 1px;
  margin-right: 2rem;

  &:hover {
    color: $textColor;
    transform: translateY(-3px);
  }

  &:focus {
    color: $textColor;
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
  width: 2.8rem;
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

.dark {
  background-color: black;
}
.router-link-active a {
  color: white;
}

//Media Queries XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
@media only screen and (max-width: 920px) {
  .nav-list {
    width: auto;
  }

  #logo {
    left: 50%;
    width: 2rem;
  }
  #app-title {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width: 695px) {
  .main-header {
    background-color: black;
    justify-content: space-between;
  }

  .hamburger-menu {
    display: block;
  }

  .main-nav {
    position: absolute;
    display: none;
    z-index: 60;
    right: 0;
    top: 10vh;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(0, 0, 0);
    width: 100%;
    height: 0;
    opacity: 0;
    border-radius: 0 0 5rem 5rem;
    transition: all 300ms;
  }

  .main-nav--visible {
    opacity: 1;
    height: 30vh;
  }

  .skewed {
    transform: skewX(45deg);
  }

  #title-container {
    display: none;
  }

  #title-container-mobile {
    display: flex;
    align-items: center;
    position: relative;
  }

  #logo-mobile {
    width: 2rem;
    position: absolute;
    left: 50%;
    transform: rotateZ(20deg);
  }

  #app-title-mobile {
    font-family: "Monoton";
    font-size: 1.5rem;
    letter-spacing: 2px;
    color: $accentColor;
    word-spacing: 45px;
    @include orangeGreyText();
  }

  .nav-list {
    flex-direction: column;
  }

  .nav-item a {
    margin-right: 0;
  }

  .nav-list--right {
    justify-content: center;

    a {
      margin-left: 0;
    }
  }
}

@media only screen and (max-width: 395px) {
  .main-header {
    padding: 0 1.5rem;
  }

  #app-title-mobile {
    font-size: 1rem;
  }

  #logo-mobile {
    width: 1.4rem;
  }
}
</style>
