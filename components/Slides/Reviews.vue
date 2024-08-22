<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="container">
      <Decorative :content="'main'" :className="'tag-item__text'" :tag="'wrap'">
        <h2>Reviews</h2>
        <swiper
          :direction="'vertical'"
          :slidesPerView="'auto'"
          :freeMode="true"
          :mousewheel="true"
          :parallax="true"
          :modules="modules"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }"
          :pagination="pagination"
          @reachEnd="handleFullSlider(true)"
          @reachBeginning="handleFullSlider(true)"
          @mouseenter="handleFullSlider(false)"
          @mouseleave="handleFullSlider(true)"
          class="mySwiper"
        >
        <swiper-slide v-for="(item, index) in data" :key="index">
          <div
            class="review-inner flex rounded"
            :style="{
              margin: index % 2 == 0 ? '0 auto 0 0' : '0 0 0 auto'
              }"
            :data-swiper-parallax-x="index % 2 == 0 ? '-10%' : '10%'"
            data-swiper-parallax-opacity="0"
            data-swiper-parallax-duration="400"
            >
            <div class="review-avatar">
              <img v-if="item.avatar" :src="item.avatar" alt="photo">
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
        <swiper-slide style="height: 150px;"></swiper-slide>
        </swiper>
        <div class="swiper-navigation flex items-center">
          <div class="swiper-button-prev flex">
            <svg width="40" height="21" viewBox="0 0 40 21" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: scale(-1,1);">
              <path d="M1 10.5H39M39 10.5L29.5 1M39 10.5L29.5 20" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="swiper-button-next flex">
            <svg width="40" height="21" viewBox="0 0 40 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 10.5H39M39 10.5L29.5 1M39 10.5L29.5 20" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="reviews-pagination"></div>
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

  import { handleWheel, enableSwiper } from '~/utils/globalFunctions.js';

  export default {
    data() {
      return {
        data,
        modules: [FreeMode, Mousewheel, Navigation, Pagination, Parallax],
        pagination: {
          el: ".reviews-pagination",
          clickable: true,
        },
      }
    },
    components: {
      Decorative,
      Swiper,
      SwiperSlide,
      IconUser
    },
    mounted() {
      // console.log(this.data)
    },
    methods: {
      handleFullSlider: function(val) {
        this.$store.commit('setAllowMouseScroll', val);
      }
    }
  };

</script>

<style lang="scss" scoped>
  h2 {
    font-size: vw_big_screen(32px);
    margin: vw_big_screen(14px);
    font-weight: 900;
  }
  .container {
    position: relative;
  }

  .swiper {
    width: 100%;
    margin-left: 0;
    max-height: vw_big_screen(280px);
    padding-bottom: vw_big_screen(14px);
    mask-image: linear-gradient(180deg,transparent 0,#000 10%,#000 90%,transparent);
    &-slide {
      width: calc(100% - vw_big_screen(10px));
      margin-top: vw_big_screen(24px);
    }
  }

  .review {
    &-inner {
      background-color: var(--review-color);
      filter: drop-shadow(vw_big_screen(8px) vw_big_screen(14px) vw_big_screen(4px) var(--shadow-slide));
      width: 80%;
      position: relative;
      padding: vw_big_screen(22px);
      & svg {
        position: absolute;
        width: vw_big_screen(49px);
        bottom: 0;
        transform: translateY(78%);
      }
    }
    &-avatar {
      width: vw_big_screen(60px);
      height: vw_big_screen(60px);
      border-radius: 50%;
      overflow: hidden;
      margin-right: vw_big_screen(24px);
      border: vw_big_screen(2px) solid var(--sidebar-color);
    }
    &-body {
      width: 90%;
      & h5 {
        margin: 0 0 vw_big_screen(12px);
        font-size: vw_big_screen(16px);
        font-weight: 800;
      }
    }
  }

</style>