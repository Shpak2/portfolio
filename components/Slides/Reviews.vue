<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="review-container">
      <Decorative :content="'section'" :className="'tag-item__text'" :tag="'wrap'">
        <h2 v-html="$t('reviewTitle')"></h2>
        <swiper
          :direction="'vertical'"
          :slidesPerView="'auto'"
          :freeMode="true"
          :parallax="true"
          :modules="modules"
          :navigation="navigation"
          :pagination="pagination"
          :preventInteractionOnTransition="true"
          @reachEnd="handleFullSlider(true)"
          @reachBeginning="handleFullSlider(true)"
          @mouseenter="handleFullSlider(false)"
          @mouseleave="handleFullSlider(true)"
          @swiper="onSwiper"
          class="review-slider"
        >
          <swiper-slide
            v-for="(item, index) in data"
            :key="index"
            style="pointer-events: none;"
            :style="{
              paddingBottom: index === data.length - 1 ? '150px' : ''
              }"
            >
            <div
              class="review-inner flex rounded"
              :style="{
                margin: index % 2 == 0 ? '0 auto 0 0' : '0 0 0 auto'
                }"
              :data-swiper-parallax-x="index % 2 == 0 ? '-5%' : '5%'"
              data-swiper-parallax-opacity="0"
              data-swiper-parallax-duration="400"
              >
              <div class="review-avatar">
                <img v-if="item.avatar" class="flex" :src="item.avatar" alt="photo">
                <IconUser v-if="!item.avatar"/>
              </div>
              <div class="review-body">
                <h5 v-html="item.name[$i18n.locale]"/>
                <div class="review-content" v-html="item.review[$i18n.locale]"/>
              </div>
              <svg v-if="index % 2 == 0" style="left: 2%;" width="49" height="22" viewBox="0 0 49 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.53944 2.41819C0.912333 7.4308 0.0219806 17.1314 0.000404575 21.1682C-0.0023175 21.6775 0.703969 21.8504 0.984679 21.4254C3.88326 17.0373 14.1245 4.99099 39.2039 4.991C69.8684 4.99101 18.3259 -4.0136 8.53944 2.41819Z" fill="var(--review-color)"/>
              </svg>
              <svg v-if="index % 2 != 0" style="right: 2%;" width="49" height="22" viewBox="0 0 49 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.4605 2.41819C48.0876 7.4308 48.978 17.1314 48.9996 21.1682C49.0023 21.6775 48.296 21.8504 48.0153 21.4254C45.1167 17.0373 34.8755 4.99099 9.79603 4.991C-20.8685 4.99101 30.674 -4.0136 40.4605 2.41819Z" fill="var(--review-color)"/>
              </svg>
            </div>
          </swiper-slide>
        </swiper>
        <div class="review-navigation flex items-center">
          <div class="review-button review-button-prev flex">
            <svg width="40" height="21" viewBox="0 0 40 21" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: scale(-1,1);">
              <path d="M1 10.5H39M39 10.5L29.5 1M39 10.5L29.5 20" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="review-button review-button-next flex">
            <svg width="40" height="21" viewBox="0 0 40 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 10.5H39M39 10.5L29.5 1M39 10.5L29.5 20" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="review-pagination flex"></div>
      </Decorative>
    </div>
  </div>
</template>

<script>

  import Decorative from '~/components/DecorativeWrapper.vue';
  import IconUser from '~/components/Svg/User.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { FreeMode, Mousewheel, Navigation, Pagination, Parallax } from 'swiper/modules';
  import { data } from '~/data/reviews'

  export default {
    data() {
      return {
        data,
        swiper: null,
        // lastScrollDelta: null,
        modules: [FreeMode, Mousewheel, Navigation, Pagination, Parallax],
        pagination: {
          el: ".review-pagination",
          clickable: true,
          bulletClass: 'review-bullet',
          bulletActiveClass: 'active',
          renderBullet: function () {
            return `<span class="review-bullet flex"></span>`;
          },
        },
        navigation: {
          disabledClass: 'disable',
          nextEl: '.review-button-next',
          prevEl: '.review-button-prev'
        }
      }
    },
    components: {
      Decorative,
      Swiper,
      SwiperSlide,
      IconUser
    },
    watch: {
      '$store.state.preloader.isPlay'(newValue) {
        if(!newValue) {
          this.swiper.update()
        }
      },
    },
    mounted() {
      // window.addEventListener('wheel',(e)=>{
      //   const deltaChange = e.deltaY < 0
      //   if(this.lastScrollDelta === !deltaChange){
      //     this.handleFullSlider(false)
      //   }
      // })
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
      // handleSlider: function(val) {
      //   setTimeout(()=>{
      //     this.$store.commit('setAllowMouseScroll', val);
      //     !val ? this.swiper.mousewheel.enable() : this.swiper.mousewheel.disable()
      //   },300)
        // this.handleScrollDirection()
      // },
      // handleScrollDirection() {
      //   const currentDelta = window.event.deltaY;
      //   this.lastScrollDelta = currentDelta < 0;
      // },
    }
  };

</script>

<style lang="scss" scoped>
  h2 {
    font-size: vw_big_screen(32px);
    margin: vw_big_screen(14px);
    font-weight: 900;
    width: 100%;
    text-align: center;
    @include viewport(tabs) {
      font-size: vw_tabs(32px);
      line-height: vw_tabs(52px);
      margin: vw_tabs(14px) 0;
    }
    @include viewport(swap_tabs) {
      font-size: vw_tabs(24px);
      line-height: vw_tabs(40px);
      margin: vw_tabs(8px) 0;
    }
    @include viewport(sm_mobile) {
      font-size: vmin_mobile(28px);
      line-height: vmin_mobile(32px);
      margin: 0 0 vmin_mobile(14px);
    }
  }
  .container {
    position: relative;
    @include viewport(sm_mobile) {
      margin-top: vmin_mobile(60px);
    }
  }

  .swiper {
    width: 100%;
    margin-left: 0;
    max-height: vw_big_screen(280px);
    padding-bottom: vw_big_screen(14px);
    mask-image: linear-gradient(180deg,transparent 0,#000 5%,#000 95%,transparent);
    @include viewport(tabs) {
      max-height: vw_tabs(480px);
      padding-bottom: vw_tabs(14px);
    }
    @include viewport(swap_tabs) {
      max-height: vw_tabs(170px);
    }
    @include viewport(sm_mobile) {
      max-height: vmin_mobile(280px);
      padding-bottom: vmin_mobile(14px);
    }
    &-slide {
      width: calc(100% - vw_big_screen(10px));
      margin: vw_big_screen(12px) 0;
      @include viewport(tabs) {
        width: calc(100% - vw_tabs(10px));
        margin: vw_tabs(12px) 0;
      }
      @include viewport(swap_tabs) {
        margin: vw_tabs(8px) 0;
      }
      @include viewport(sm_mobile) {
        width: calc(100% - vmin_mobile(10px));
        margin: vmin_mobile(14px) 0;
      }
      &:last-child {
        padding-bottom: 0 !important;
      }
    }
  }

  .review {
    &-container {
      @include viewport(swap_tabs) {
        margin-top: vw_tabs(60px);
      }
    }
    &-inner {
      background-color: var(--review-color);
      filter: drop-shadow(vw_big_screen(8px) vw_big_screen(14px) vw_big_screen(4px) var(--shadow-slide));
      width: 80%;
      position: relative;
      padding: vw_big_screen(22px);
      @include viewport(tabs) {
        filter: drop-shadow(8px 14px 4px var(--shadow-slide));
        padding: vw_tabs(22px);
      }
      @include viewport(sm_mobile) {
        padding: vmin_mobile(12px);
        width: 95%;
      }
      & svg {
        position: absolute;
        width: vw_big_screen(49px);
        bottom: 0;
        transform: translateY(78%);
        @include viewport(tabs) {
          width: vw_tabs(49px);
        }
        @include viewport(swap_tabs) {
          width: vw_tabs(31px);
        }
        @include viewport(sm_mobile) {
          width: vmin_mobile(49px);
        }
      }
    }
    &-avatar {
      width: vw_big_screen(60px);
      height: vw_big_screen(60px);
      border-radius: 50%;
      overflow: hidden;
      margin-right: vw_big_screen(24px);
      border: vw_big_screen(2px) solid var(--sidebar-color);
      @include viewport(tabs) {
        width: vw_tabs(60px);
        height: vw_tabs(60px);
        margin-right: vw_tabs(24px);
        border-width: vw_tabs(2px);
      }
      @include viewport(swap_tabs) {
        width: vw_tabs(38px);
        height: vw_tabs(38px);
        margin-right: vw_tabs(16px);
      }
      @include viewport(sm_mobile) {
        width: vmin_mobile(40px);
        height: vmin_mobile(40px);
        margin-right: vmin_mobile(8px);
        border-width: vmin_mobile(2px);
      }
    }
    &-body {
      width: 90%;
      @include viewport(sm_mobile) {
        width: 82%;
      }
      & h5 {
        margin: 0 0 vw_big_screen(12px);
        font-size: vw_big_screen(16px);
        font-weight: 800;
        @include viewport(tabs) {
          margin-bottom: vw_tabs(12px);
          font-size: vw_tabs(16px);
        }
        @include viewport(swap_tabs) {
          margin-bottom: vw_tabs(8px);
          font-size: vw_tabs(10px);
        }
        @include viewport(sm_mobile) {
          margin-bottom: vmin_mobile(6px);
          font-size: vmin_mobile(14px);
        }
      }
    }
    &-pagination {
      margin-bottom: vw_big_screen(20px);
      @include viewport(tabs) {
        margin-bottom: vw_tabs(20px);
      }
      @include viewport(swap_tabs) {
        margin-bottom: vw_tabs(14px);
      }
    }
    &-navigation {
      margin-bottom: vw_big_screen(16px);
      @include viewport(tabs) {
        margin-bottom: vw_tabs(16px);
      }
      @include viewport(swap_tabs) {
        margin-bottom: vw_tabs(10px);
      }
      @include viewport(sm_mobile) {
        margin-bottom: vmin_mobile(16px);
      }
    }
    &-button {
      width: vw_big_screen(24px);
      cursor: pointer;
      transition: 0.2s ease-in;
      @include viewport(tabs) {
        width: vw_tabs(24px);
      }
      @include viewport(swap_tabs) {
        width: vw_tabs(16px);
      }
      @include viewport(sm_mobile) {
        width: vmin_mobile(24px);
      }
      &-prev {
        margin-right: vw_big_screen(12px);
        @include viewport(tabs) {
          margin-right: vw_tabs(12px);
        }
        @include viewport(swap_tabs) {
          margin-right: vw_tabs(8px);
        }
        @include viewport(sm_mobile) {
          margin-right: vmin_mobile(12px);
        }
        &:active {
          transform: translateX(-10%) scale(0.9)
        }
      }
      &-next {
        &:active {
          transform: translateX(10%) scale(0.9)
        }
      }
      &.disable {
        opacity: 0.25;
        pointer-events: none;
      }
    }
  }

</style>