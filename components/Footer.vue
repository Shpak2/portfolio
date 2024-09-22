<template>
  <footer class="footer">
    <div class="container flex items-center m-auto footer-inner">
      <Copyright :isMenu="false" />
      <Social :isMenu="false" />
    </div>
  </footer>
</template>

<script>
  import Copyright from '~/components/Footer/Copyright.vue';
  import Social from '~/components/Footer/Social.vue';

  export default {
    components: {
      Copyright,
      Social
    }
  };

</script>

<style lang="scss" scoped>
  .footer {
    position: absolute;
    bottom: vw_big_screen(24px);
    left: 0;
    width: 100%;
    z-index: 90;
    @include viewport(tabs) {
      bottom: vw_tabs(24px);
    }
    @include viewport(sm_mobile) {
      bottom: unset;
      top: 100%;
    }
    &-inner {
      @include viewport(sm_mobile) {
        flex-direction: column-reverse;
        justify-content: center;
      }
    }
  }
</style>
