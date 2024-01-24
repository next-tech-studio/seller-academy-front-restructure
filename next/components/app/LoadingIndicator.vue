<template>
  <div class="loading" id="loading">
    <div class="loading__content">
      <strong>D</strong>
      <strong>I</strong>
      <strong>G</strong>
      <strong>I</strong>
      <strong>N</strong>
      <strong>E</strong>
      <strong>X</strong>
      <strong>T</strong>
    </div>
  </div>
</template>

<style lang="scss">
// html:has(.loading) {
//   overflow: hidden;
// }
html:has(.loading:not([style*="display: none"])) {
  overflow: hidden;
}
.loading {
  font-family: "Roboto";
  height: 100vh;
  background-color: rgba(#1f1f1f, 80%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  z-index: 100000;
  backdrop-filter: blur(5px);
}
.loading__content strong {
  color: #fff;
  letter-spacing: 30px;
  font-size: 60px;
  animation: loading 5s ease infinite;
  opacity: 0;

  @include respond(md) {
    font-size: 40px;
    letter-spacing: 20px;
  }

  @include respond(sm) {
    font-size: 20px;
    letter-spacing: 10px;
  }
}
.loading__content strong:nth-child(1) {
  animation-delay: 0.2s;
}
.loading__content strong:nth-child(2) {
  animation-delay: 0.4s;
}
.loading__content strong:nth-child(3) {
  animation-delay: 0.6s;
}
.loading__content strong:nth-child(4) {
  animation-delay: 0.8s;
}
.loading__content strong:nth-child(5) {
  animation-delay: 1s;
}
.loading__content strong:nth-child(6) {
  animation-delay: 1.2s;
}
.loading__content strong:nth-child(7) {
  animation-delay: 1.4s;
}
.loading__content strong:nth-child(8) {
  animation-delay: 1.6s;
}
@keyframes loading {
  50% {
    opacity: 1;
  }
}
</style>
