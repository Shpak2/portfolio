<template>
  <div class="container m-auto">
    <div class="content">
      <div class="swiper-pagination-wrapper mono-font flex items-center">
        <div class="swiper-pagination-title">Projects:</div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="swiper-navigation flex items-center" style="z-index: 10;">
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
      <Decorative :content="'main'" :className="'tag-item__text'" :tag="'wrap'">
        <swiper
          :pagination="pagination"
          :slides-per-view="1"
          :effect="'creative'"
          :modules="modules"
          :limitProgress="2"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }"
          :creativeEffect="{
            prev: {
              translate: [0, 0, -400],
              opacity: 0
            },
            next: {
              translate: ['95%', '-17.5%', 0],
              scale: 0.65
            },
          }"
          :keyboard="true"
        >
          <swiper-slide>
            <div>
              <div class="slide-header mono-font flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <div class="buttons-list flex items-center justify-center">
                  <button class="flex flex-col items-center"
                    @mouseover="fillDesktop = '#fff'"
                    @mouseleave="fillDesktop = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconDesktop :color="fillDesktop"/></span>
                      <b>Desktop</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillTablet = '#fff'"
                    @mouseleave="fillTablet = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconTablet :color="fillTablet"/></span>
                      <b>Tablet</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillMobile = '#fff'"
                    @mouseleave="fillMobile = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconMobile :color="fillMobile"/></span>
                      <b>Mobile</b>
                  </button>
                </div>
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header mono-font flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <div class="buttons-list flex items-center justify-center">
                  <button class="flex flex-col items-center"
                    @mouseover="fillDesktop = '#fff'"
                    @mouseleave="fillDesktop = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconDesktop :color="fillDesktop"/></span>
                      <b>Desktop</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillTablet = '#fff'"
                    @mouseleave="fillTablet = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconTablet :color="fillTablet"/></span>
                      <b>Tablet</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillMobile = '#fff'"
                    @mouseleave="fillMobile = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconMobile :color="fillMobile"/></span>
                      <b>Mobile</b>
                  </button>
                </div>
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header mono-font flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <div class="buttons-list flex items-center justify-center">
                  <button class="flex flex-col items-center"
                    @mouseover="fillDesktop = '#fff'"
                    @mouseleave="fillDesktop = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconDesktop :color="fillDesktop"/></span>
                      <b>Desktop</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillTablet = '#fff'"
                    @mouseleave="fillTablet = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconTablet :color="fillTablet"/></span>
                      <b>Tablet</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillMobile = '#fff'"
                    @mouseleave="fillMobile = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconMobile :color="fillMobile"/></span>
                      <b>Mobile</b>
                  </button>
                </div>
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header mono-font flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <div class="buttons-list flex items-center justify-center">
                  <button class="flex flex-col items-center"
                    @mouseover="fillDesktop = '#fff'"
                    @mouseleave="fillDesktop = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconDesktop :color="fillDesktop"/></span>
                      <b>Desktop</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillTablet = '#fff'"
                    @mouseleave="fillTablet = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconTablet :color="fillTablet"/></span>
                      <b>Tablet</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillMobile = '#fff'"
                    @mouseleave="fillMobile = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconMobile :color="fillMobile"/></span>
                      <b>Mobile</b>
                  </button>
                </div>
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header mono-font flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <div class="buttons-list flex items-center justify-center">
                  <button class="flex flex-col items-center"
                    @mouseover="fillDesktop = '#fff'"
                    @mouseleave="fillDesktop = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconDesktop :color="fillDesktop"/></span>
                      <b>Desktop</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillTablet = '#fff'"
                    @mouseleave="fillTablet = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconTablet :color="fillTablet"/></span>
                      <b>Tablet</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillMobile = '#fff'"
                    @mouseleave="fillMobile = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconMobile :color="fillMobile"/></span>
                      <b>Mobile</b>
                  </button>
                </div>
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header mono-font flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <div class="buttons-list flex items-center justify-center">
                  <button class="flex flex-col items-center"
                    @mouseover="fillDesktop = '#fff'"
                    @mouseleave="fillDesktop = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconDesktop :color="fillDesktop"/></span>
                      <b>Desktop</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillTablet = '#fff'"
                    @mouseleave="fillTablet = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconTablet :color="fillTablet"/></span>
                      <b>Tablet</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillMobile = '#fff'"
                    @mouseleave="fillMobile = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconMobile :color="fillMobile"/></span>
                      <b>Mobile</b>
                  </button>
                </div>
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header mono-font flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <div class="buttons-list flex items-center justify-center">
                  <button class="flex flex-col items-center"
                    @mouseover="fillDesktop = '#fff'"
                    @mouseleave="fillDesktop = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconDesktop :color="fillDesktop"/></span>
                      <b>Desktop</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillTablet = '#fff'"
                    @mouseleave="fillTablet = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconTablet :color="fillTablet"/></span>
                      <b>Tablet</b>
                  </button>
                  <button class="flex flex-col items-center"
                    @mouseover="fillMobile = '#fff'"
                    @mouseleave="fillMobile = '#860CFB'"
                    >
                      <span class="rounded flex items-center justify-center"><IconMobile :color="fillMobile"/></span>
                      <b>Mobile</b>
                  </button>
                </div>
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <!-- <swiper-slide v-for="(slide, index) in slides" :key="index">
            <component :is="slide.component" :key="slide.key" />
          </swiper-slide> -->
        </swiper>
      </Decorative>
    </div>
  </div>
</template>

<script>
  import Decorative from '~/components/DecorativeWrapper.vue';

  import IconTool from '~/components/Svg/Tool.vue';
  import IconDesktop from '~/components/Svg/Desktop.vue';
  import IconTablet from '~/components/Svg/Tablet.vue';
  import IconMobile from '~/components/Svg/Mobile.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Keyboard, EffectCreative, Pagination, Navigation } from 'swiper/modules';

  import photoPath from '~/assets/images/portfolio/projects/pyrpose/main.webp'

  export default {
    data() {
      return {
        myPhoto: photoPath,
        modules: [Keyboard, EffectCreative, Pagination, Navigation],
        fillDesktop: '#860CFB',
        fillTablet: '#860CFB',
        fillMobile: '#860CFB',
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            let formattedNumber = (index + 1).toString().padStart(2, '0');
            return `<span class="${className}">${formattedNumber}</span>`;
          },
        },
      };
    },
    components: {
      Decorative,
      Swiper,
      SwiperSlide,
      IconTool,
      IconDesktop,
      IconTablet,
      IconMobile
      // DecorMouse
    },
    mounted() {
      this.$nextTick(() => {
        const paginationEl = document.querySelector('.swiper-pagination');
        if (paginationEl) {
          paginationEl.setAttribute('title', 'Номер сторінки');
        }
      });
    }
  };

</script>

<style lang="scss" scoped>
  .content {
    margin-top: 20vh;
    margin-bottom: auto;
    position: relative;
  }

  .slide-header {
    font-weight: 500;
    margin-bottom: vw_big_screen(8px);
  }

  .body-inner {
    position: relative;
  }

  h4 {
    margin: 0;
    font-size: vw_big_screen(16px);
  }

  .swiper-pagination {
    &-wrapper {
      color: var(--footer-color);
      position: absolute;
      top: vw_big_screen(-50px);
      right: 0;
      font-weight: 500;
      user-select: none;
    }
    &-title {
      font-size: vw_big_screen(12px);
      margin-right: vw_big_screen(8px);
    }
  }

  .swiper-navigation {
    position: absolute;
    top: vw_big_screen(-10px);
    right: 0;
  }

  .swiper-button-next, .swiper-button-prev {
    width: vw_big_screen(38px);
    cursor: pointer;
    transition: 0.2s ease-in;
    &:hover {
      @include viewport(hover) {
        opacity: 0.7;
      }
    }
  }

  .swiper-button-prev {
    &.swiper-button-disabled {
      opacity: 0.25;
    }
  }

  .swiper-button-next {
    margin-left: vw_big_screen(16px);
    &.swiper-button-disabled {
      opacity: 0.25;
    }
  }

  .tags {
    padding: 0 vw_big_screen(12px);
    font-size: vw_big_screen(12px);
    background-color: var(--tags-bg);
    height: 100%;
    &-wrap {
      height: vw_big_screen(32px);
      transform-origin: center right;
    }
  }

  .rounded {
    overflow: hidden;
  }

  .swiper {
    width: vw_big_screen(600px);
    margin-left: 0;
    overflow: unset;
    padding-bottom: vw_big_screen(14px);
  }

  .swiper-slide {
    width: 100%;
    overflow: unset;
    &:not(.swiper-slide-next,&-active) {
      opacity: 0 !important;
    }
  }

  .buttons-list {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: rgba(20, 18, 22, 0.6);
    gap: vw_big_screen(20px);
    & button {
      padding: 0;
      &:hover span {
        background-color: #860CFB;
      }
    }
    & span {
      width: vw_big_screen(80px);
      height: vw_big_screen(80px);
      background-color: #fff;
      transition: 0.2s ease-in;
    }
    & b {
      font-size: vw_big_screen(12px);
      font-weight: 600;
      color: #fff;
      margin-top: vw_big_screen(6px);
    }
  }

</style>