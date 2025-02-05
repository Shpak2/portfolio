<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="flex justify-between content-wrap">
      <div class="content">
        <Decorative :content="'p'" :className="'tag-item__text'" :tag="'wrap'">
          <h2 v-html="$t('aboutTitle')"/>
          <div v-if="!isMobile" class="content-container"
              v-html="$t('aboutContent')"
              />
          <div v-else class="wrapper">
            <div class="scrollable-container"
              v-html="$t('aboutContent')"
              />
          </div>
        </Decorative>
      </div>
      <div class="content-img" :class="{ show: hideImg }">
        <img class="rounded" :src="myPhoto" width="350" height="286" alt="photo" loading="lazy"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Decorative from '~/components/DecorativeWrapper.vue';
  import photoPath from '~/assets/images/main/photo.webp';

  export default {
    data() {
      return {
        myPhoto: photoPath,
        hideImg: false
      }
    },
    props: {
      isMobile: false
    },
    components: {
      Decorative
    },
    watch: {
      '$store.state.activeItem'() {
        this.hideImg = true
      },
    },
    mounted() {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 30) {
          this.hideImg = true
        }
      });
    }
  };

</script>

<style lang="scss" scoped>

  .content-wrap {
    @include viewport(tabs) {
      flex-direction: column-reverse;
      margin: vw_tabs(140px) 0 auto;
    }
    @include viewport(swap_tabs) {
      flex-direction: unset;
      margin: vw_tabs(160px) 0 auto;
    }
    @include viewport(sm_mobile) {
      margin: 0 0 vmin_mobile(60px);
    }
  }
  .content-container {
    width: vw_big_screen(636px);
    max-height: vw_big_screen(320px);
    @include viewport(tabs) {
      width: 100%;
      max-height: unset;
    }
    @include viewport(swap_tabs) {
      max-height: vw_tabs(220px);
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
      margin-bottom: vmin_mobile(14px);
    }
  }
  .content {
    @include viewport(tabs) {
      width: 100%;
    }
    @include viewport(swap_tabs) {
      width: 62%;
    }
    & h2, & p {
      color: var(--secondary-color);
    }
    &-wrap {
      width: 100%;
      position: relative;
    }
    &-img {
      width: vw_big_screen(350px);
      padding-top: vw_big_screen(64px);
      @include viewport(tabs) {
        width: vw_tabs(240px);
        padding-top: vw_tabs(44px);
        transform: scale(-1, 1);
        margin-bottom: vw_tabs(20px);
      }
      @include viewport(swap_tabs) {
        width: vw_tabs(200px);
        transform: unset;
        margin-right: vw_tabs(30px);
      }
      @include viewport(sm_mobile) {
        width: vmin_mobile(240px);
        margin-bottom: vmin_mobile(20px);
      }
      @include viewport(mobile) {
        padding-top: 0;
      }
      @include viewport(port_mobile) {
        opacity: 0;
        translate: 0 25%;
      }
      @include viewport(swap_mobile) {
        padding-top: vmin_mobile(22px);
        margin-top: vmin_mobile(42px);
      }
      &.show {
        @include viewport(port_mobile) {
          opacity: 1;
          transition: 0.3s ease;
          translate: 0;
        }
      }
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