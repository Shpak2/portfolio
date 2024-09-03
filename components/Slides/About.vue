<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="flex justify-between content-wrap">
      <div class="content">
        <Decorative :content="'p'" :className="'tag-item__text'" :tag="'wrap'">
          <h2 v-html="$t('aboutTitle')"/>
          <swiper
            v-if="!isMobile"
            :direction="'vertical'"
            :slidesPerView="'auto'"
            :freeMode="true"
            :scrollbar="true"
            :modules="modules"
            @reachEnd="handleFullSlider(true)"
            @reachBeginning="handleFullSlider(true)"
            @mouseenter="handleFullSlider(false)"
            @mouseleave="handleFullSlider(true)"
            @swiper="onSwiper"
            class="mySwiper"
          >
            <swiper-slide>
              <div class="scrollable-container"
              v-html="$t('aboutContent')"
              />
            </swiper-slide>
          </swiper>
          <div v-if="isMobile" class="wrapper">
            <div class="scrollable-container"
              v-html="$t('aboutContent')"
              />
          </div>
        </Decorative>
      </div>
      <div class="content-img">
        <img class="rounded" :src="myPhoto" width="350" height="286" alt="photo" loading="lazy"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Decorative from '~/components/DecorativeWrapper.vue';
  import photoPath from '~/assets/images/main/photo.webp';

  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

  export default {
    data() {
      return {
        swiper: null,
        myPhoto: photoPath,
        modules: [FreeMode, Scrollbar, Mousewheel],
      }
    },
    props: {
      isMobile: false
    },
    components: {
      Decorative,
      Swiper,
      SwiperSlide
    },
    watch: {
      '$store.state.preloader.isPlay'(newValue) {
        if(!newValue && this.swiper) {
          this.swiper.update()
        }
      },
    },
    methods: {
      onSwiper(swiper) {
        this.swiper = swiper;
      },
      handleFullSlider: function(val) {
        setTimeout(()=>{
          this.$store.commit('setAllowMouseScroll', val);
          !val ? this.swiper.mousewheel.enable() : this.swiper.mousewheel.disable()
        },300)
      },
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
  }
  .swiper {
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
  }
  .content {
    @include viewport(tabs) {
      width: 100%;
    }
    @include viewport(swap_tabs) {
      width: 70%;
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
        margin-right: vw_tabs(10px);
      }
    }
  }
</style>