<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="flex justify-between content-wrap">
      <div class="content">
        <Decorative :content="'p'" :className="'tag-item__text'" :tag="'wrap'">
          <h2 v-html="$t('expirienceTitle')"/>
          <swiper
            v-if="!isMobile"
            :direction="'vertical'"
            :slidesPerView="'auto'"
            :freeMode="true"
            :scrollbar="scrollbarOptions"
            :modules="modules"
            @reachEnd="handleFullSlider(true)"
            @reachBeginning="handleFullSlider(true)"
            @mouseenter="handleFullSlider(false)"
            @mouseleave="handleFullSlider(true)"
            @swiper="onSwiper"
            @scrollbarDragEnd="handleSlider"
            class="mySwiper"
          >
            <swiper-slide>
              <div class="scrollable-container"
              v-html="$t('expirienceContent')"
              />
            </swiper-slide>
            <div class="swiper-scrollbar"></div>
          </swiper>
          <div v-if="isMobile" class="wrapper">
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

  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

  export default {
    data() {
      return {
        scrollbarOptions: {
          el: '.swiper-scrollbar',
          enabled: true,
          draggable: true,
          hide: false,
        },
        modules: [FreeMode, Scrollbar, Mousewheel],
        swiper: null,
      }
    },
    components: {
      Decorative,
      Cloud,
      Swiper,
      SwiperSlide
    },
    props: {
      isMobile: false
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
      handleFullSlider(val) {
        setTimeout(()=>{
          this.$store.commit('setAllowMouseScroll', val);
          !val ? this.swiper.mousewheel.enable() : this.swiper.mousewheel.disable()
        },300)
      },
      handleSlider(swiper){
        let translate = swiper.previousTranslate
        setTimeout(()=>{
          swiper.setTranslate(translate);
        },1)
      }
    }
  };

</script>

<style lang="scss" scoped>
  .swiper {
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
      max-width: 65%;
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
        margin: vmin_mobile(60px) 0 0;
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
  }
</style>