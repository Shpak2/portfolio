<template>
  <button class="flex justify-center items-center rounded hover-effect btn-contact">
    {{ $t('contactButton') }}
  </button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .btn-contact {
    padding: 0 vw_big_screen(16px);
    margin-left: auto;
    height: vw_big_screen(44px);
    font-size: vw_big_screen(16px);
    font-weight: 600;
    background-color: var(--button-color);
    color: #fff;
  }
</style>