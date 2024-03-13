<template>
  <div class="d-flex align-center position-relative parent-tail">
    <v-btn
      style="z-index: 10"
      density="compact"
      icon
      class="bg-background-light button"
      flat
    >
      <v-icon icon="custom:plus" size="x-small" />
    </v-btn>
    <div class="tail"></div>
  </div>
</template>
<script></script>
<style lang="scss">
.tail {
  width: 100%;
  height: 10px;
  z-index: 1;
  background: rgba(var(--v-theme-background-light));
  border-right: none;
  position: absolute;
  border-radius: 10px;
}
.parent-tail:hover {
  .tail {
    background: rgba(var(--v-theme-n050));
  }
  .button {

    background: rgba(var(--v-theme-n600));
  }
}
</style>
