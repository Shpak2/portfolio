<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="flex justify-between content-wrap">
      <div class="content">
        <Decorative :content="'p'" :className="'tag-item__text'" :tag="'wrap'">
          <h2 v-html="$t('expirienceTitle')"/>
          <div v-if="!isMobile" class="content-container"
              v-html="$t('expirienceContent')"
              />
          <div v-else class="wrapper">
            <div class="scrollable-container"
              v-html="$t('expirienceContent')"
              />
          </div>
        </Decorative>
      </div>
      <Cloud/>
    </div>
  </div>
</template>

<script>
  import Decorative from '~/components/DecorativeWrapper.vue';
  import Cloud from '~/components/Slides/Experience/Cloud.vue';

  export default {
    components: {
      Decorative,
      Cloud
    },
    props: {
      isMobile: false
    }
  };

</script>

<style lang="scss" scoped>
  .content-container {
    width: vw_big_screen(636px);
    max-height: vw_big_screen(320px);
    @include viewport(tabs) {
      width: 100%;
      max-height: vw_tabs(320px);
    }
    @include viewport(swap_tabs) {
      max-height: vw_tabs(230px);
    }
  }
  h2 {
    font-size: vw_big_screen(32px);
    line-height: vw_big_screen(52px);
    margin: vw_big_screen(4px) 0 vw_big_screen(12px);
    font-weight: 900;
    @include viewport(tabs) {
      font-size: vw_tabs(32px);
      line-height: vw_tabs(52px);
      margin: 0 0 vw_tabs(12px);
    }
    @include viewport(swap_tabs) {
      font-size: vw_tabs(24px);
      line-height: vw_tabs(40px);
      margin: 0 0 vw_tabs(8px);
    }
    @include viewport(sm_mobile) {
      font-size: vmin_mobile(28px);
      line-height: vmin_mobile(32px);
      margin: 0 0 vmin_mobile(14px);
    }
  }
  .content {
    max-width: vw_big_screen(636px);
    @include viewport(tabs) {
      max-width: unset;
    }
    @include viewport(swap_tabs) {
      max-width: 62%;
    }
    & h2, & p {
      color: var(--secondary-color);
    }
    &-wrap {
      width: 100%;
      @include viewport(tabs) {
        margin: vw_tabs(160px) 0 auto;
      }
      @include viewport(sm_mobile) {
        margin: 0;
        position: relative;
      }
      @include viewport(mobile) {
        padding-bottom: vmin_mobile(340px);
      }
    }
    &-img {
      width: vw_big_screen(350px);
      padding-top: vw_big_screen(64px);
    }
  }
  .wrapper {
    @include viewport(swap_mobile) {
      overflow: auto;
      max-height: vmin_mobile(200px);
    }
    @include viewport(mobile) {
      overflow: auto;
      max-height: vmin_mobile(250px);
    }
  }
</style>