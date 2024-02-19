<template>
  <div class="loading">
    <v-card width="149" height="123">
      <v-card-text class="text-center">
        <v-img class="mx-auto pt-4" width="85" src="/images/logo/5.svg"></v-img>
        <div class="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss">
@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}
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
.bouncing-loader {
  display: flex;
  justify-content: center;
}
.bouncing-loader > div {
  width: 8px;
  height: 8px;
  margin: 2rem 0.2rem;
  background: rgba(var(--v-theme-primary-base));
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
