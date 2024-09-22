<template>
  <span class="copyright" :class="{'menu-copyright': isMenu}">
    Yevhenii Shpakov | 2019 - 2024
  </span>
</template>

<script>
  export default {
    props: {
      isMenu: false,
    },
  };
</script>

<style lang="scss" scoped>
  .copyright {
    font-size: vw_big_screen(12px);
    margin-left: auto;
    transition: 0.3s ease;
    color: var(--footer-color);
    @include viewport(tabs) {
      font-size: vw_tabs(12px);
      margin: vmin_mobile(16px) 0 vmin_mobile(22px);
    }
    @include viewport(sm_mobile) {
      font-size: vmin_mobile(12px);
    }
    &.menu-copyright {
      @include viewport(tabs) {
        font-size: vw_tabs(14px);
        margin: vw_tabs(18px) 0 vw_tabs(24px);
      }
      @include viewport(swap_tabs) {
        font-size: vw_tabs(12px);
      }
      @include viewport(sm_mobile) {
        margin: vmin_mobile(18px) 0 vmin_mobile(24px);
        font-size: vmin_mobile(12px);
      }
      @include viewport(tabs) {
        font-size: vw_tabs(14px);
        margin: vw_tabs(18px) 0 vw_tabs(24px);
      }
    }
  }
</style>