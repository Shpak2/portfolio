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
            :scrollbar="scrollbarOptions"
            :modules="modules"
            @reachEnd = "slideEnd"
            @reachBeginning = "slideBegin"
            @mouseenter="handleFullSlider(false)"
            @mouseleave="handleFullSlider(true)"
            @swiper="onSwiper"
            class="mySwiper"
            @scrollbarDragEnd="handleSlider"
          >
            <swiper-slide>
              <div class="scrollable-container"
              v-html="$t('aboutContent')"
              />
            </swiper-slide>
            <div class="swiper-scrollbar"></div>
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
        scrollbarOptions: {
          el: '.swiper-scrollbar',
          enabled: true,
          draggable: true,
          hide: false,
        },
        modules: [FreeMode, Scrollbar, Mousewheel],
        isEnd: null,
        isBegin: null,
        scrollTimeout: null,
        isScrolling: false,
        timer: 100
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
      handleFullSlider(val) {

        if (!val) {
          // console.log(this.swiper?.el)
          this.swiper?.el.addEventListener('wheel', this.handleWheelEvent)
        }else {
          this.swiper?.el.removeEventListener('wheel', this.handleWheelEvent)
        }
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
      },
      handleWheelEvent(event) {
        clearTimeout(this.scrollTimeout);
        this.isScrolling = true;
        if (event.deltaY > 0) {
          this.isBegin = false
          if (this.swiper.translate === -1 * this.swiper.snapGrid[1] && this.isEnd) {
            this.scrollTimeout = setTimeout(() => {
              if (this.isScrolling) {
                this.$store.commit('setActiveItem', 'experience');
              }
            }, this.timer);
          }
        } else {
          this.isEnd = false
          if (this.swiper.translate === -1 * this.swiper.snapGrid[0] && this.isBegin) {
            this.scrollTimeout = setTimeout(() => {
              if (this.isScrolling) {
                this.$store.commit('setActiveItem', 'home');
              }
            }, this.timer);
          }
        }
        this.scrollTimeout = setTimeout(() => {
          this.isScrolling = false;
        }, this.timer);
      },
      slideEnd(){
        setTimeout(()=>{
          this.isEnd = true
        },this.timer)
      },
      slideBegin(){
        setTimeout(()=>{
          this.isBegin = true
        },this.timer)
      }
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
      margin: vmin_mobile(60px) 0 auto;
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
      @include viewport(swap_mobile) {
        padding-top: vmin_mobile(22px);
        margin-top: vmin_mobile(42px);
      }
    }
  }
  .wrapper {
    @include viewport(swap_mobile) {
      overflow: auto;
      max-height: vmin_mobile(200px);
    }
  }
</style>