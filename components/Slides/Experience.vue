<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="flex justify-between content-wrap">
      <div class="content">
        <Decorative :content="'p'" :className="'tag-item__text'" :tag="'wrap'">
          <h2 v-html="$t('expirienceTitle')"/>
          <swiper
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
              v-html="$t('expirienceContent')"
              />
            </swiper-slide>
          </swiper>
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
    watch: {
      '$store.state.preloader.isPlay'(newValue) {
        if(!newValue) {
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
  .swiper {
    width: vw_big_screen(636px);
    max-height: vw_big_screen(320px);
  }
  h2 {
    font-size: vw_big_screen(32px);
    line-height: vw_big_screen(52px);
    margin: vw_big_screen(4px) 0 vw_big_screen(12px);
    font-weight: 900;
  }
  .content {
    max-width: vw_big_screen(636px);
    & h2, & p {
      color: var(--secondary-color);
    }
    &-wrap {
      width: 100%;
    }
    &-img {
      width: vw_big_screen(350px);
      padding-top: vw_big_screen(64px);
    }
  }
</style>