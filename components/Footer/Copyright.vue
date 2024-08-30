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
    }
    &.menu-copyright {
      @include viewport(tabs) {
        font-size: vw_tabs(14px);
        margin: vw_tabs(18px) 0 vw_tabs(24px);
      }
    }
  }
</style>