<template>
  <section id="general-info">
    <slot name="info-image"></slot>
    <slot name="info-title">
      <h2>PAGE NOT FOUND!</h2>
    </slot>
    <hr />
    <slot name="info-tip-1"></slot>
    <slot name="info-tip-2"></slot>
  </section>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#general-info {
  margin-top: 3rem;
  max-width: 45rem;
  background-color: black;
  border: $borderNormal;
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
}

img {
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: -2rem;
  left: -1rem;
  animation: animateTip 5s linear infinite alternate-reverse;
}

h2 {
  @include orangeGreyText();
  font-size: 2rem;
}

hr {
  border-color: $accentColor;
  margin: 1rem 0;
  width: 75%;
}

p {
  color: $textColor;
  font-size: 1.2rem;
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    color: $accentColor;
    font-weight: bold;

    &:hover {
      color: white;
    }
  }
}

@keyframes animateTip {
  0% {
    transform: rotateZ(-20deg);
  }
  50% {
    transform: rotateZ(20deg);
  }
  100% {
    transform: rotateZ(-20deg);
  }
}

@media only screen and (max-width: 395px) {
  h2 {
    font-size: 1.4rem;
    text-align: center;
  }

  hr {
    width: 100%;
  }

  p {
    font-size: 1rem;
    text-align: center;
  }
}
</style>