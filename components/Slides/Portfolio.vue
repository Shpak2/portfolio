<template>
  <div class="container m-auto" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="content">
      <div class="swiper-pagination-wrapper mono-font flex items-center">
        <div class="swiper-pagination-title">Projects:</div>
        <div class="swiper-pagination"></div>
      </div>
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
        <swiper-slide v-for="(project, index) in data" :key="index">
          <div class="slide-header mono-font flex items-center justify-between">
            <h4>{{ (index + 1).toString().padStart(2, '0') }}. {{ project.name }}</h4>
            <div class="rounded flex items-center tags-wrap"
              @mouseenter="handleMouseEnter(index)"
              @mouseleave="handleMouseLeave(index)">
              <IconTool />
              <div class="tags flex items-center">
                <span :ref="'tagsText' + index">{{ project.tools.join(', ') }}</span>
              </div>
            </div>
          </div>
          <div class="rounded body-inner">
            <div class="buttons-list flex items-center justify-center">
              <button v-if="project.img.desktop" class="flex flex-col items-center"
                @mouseover="fillDesktop = '#fff'"
                @mouseleave="fillDesktop = '#860CFB'"
                @click="showPopup(index, 'desktop')">
                <span class="rounded flex items-center justify-center"><IconDesktop :color="fillDesktop" /></span>
                <b>Desktop</b>
              </button>
              <button v-if="project.img.tablet" class="flex flex-col items-center"
                @mouseover="fillTablet = '#fff'"
                @mouseleave="fillTablet = '#860CFB'"
                @click="showPopup(index, 'tablet')">
                <span class="rounded flex items-center justify-center"><IconTablet :color="fillTablet" /></span>
                <b>Tablet</b>
              </button>
              <button v-if="project.img.mobile" class="flex flex-col items-center"
                @mouseover="fillMobile = '#fff'"
                @mouseleave="fillMobile = '#860CFB'"
                @click="showPopup(index, 'mobile')">
                <span class="rounded flex items-center justify-center"><IconMobile :color="fillMobile" /></span>
                <b>Mobile</b>
              </button>
            </div>
            <img class="flex" :src="project.img.main" :alt="project.name" loading="lazy">
          </div>
        </swiper-slide>
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

  import { useStore } from 'vuex';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Keyboard, EffectCreative, Pagination, Navigation } from 'swiper/modules';

  import { data } from '~/data/projects'

  export default {
    data() {
      return {
        data,
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
    },
    beforeMount() {
      const store = useStore();
      this.$store = store;
    },
    methods: {
      handleMouseEnter(index) {
        this.adjustTextOverflow(true, index);
      },
      handleMouseLeave(index) {
        this.adjustTextOverflow(false, index);
      },
      adjustTextOverflow(isHover, index) {
        this.$nextTick(() => {
          const tagsContainer = this.$el.querySelector('.tags');
          const tagsText = this.$refs['tagsText' + index][0];

          if (tagsText && tagsContainer) {
            const textWidth = tagsText.scrollWidth;
            const containerWidth = tagsContainer.clientWidth - 24;

            if (textWidth > containerWidth) {
              if (isHover) {
                const overflowWidth = textWidth - containerWidth;
                const transformValue = -overflowWidth;

                const maxTransitionDuration = 1.5;
                const percentage = Math.min(1, overflowWidth / containerWidth);
                const duration = 1+percentage * maxTransitionDuration;

                tagsText.style.transition = `transform ${duration}s linear`;
                tagsText.style.transform = `translateX(${transformValue}px)`;
              } else {
                tagsText.style.transition = `transform 0.4s linear`;
                tagsText.style.transform = 'translateX(0)';
              }
            } else {
              tagsText.style.transform = 'translateX(0)';
            }
          }
        });
      },
      showPopup(project, mode) {
        this.$store.commit('popup/setShowPopup', true);
        this.$store.commit('popup/setProjectPopup', project);
        this.$store.commit('popup/setModePopup', mode);
      },
    },
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
        & svg {
          animation: pulseNext 1s infinite;
        }
      }
    }
    &:active {
      transform: scale(0.8);
    }
    &.swiper-button-disabled {
      opacity: 0.25;
      pointer-events: none;
      & svg {
        animation: none !important;
      }
    }
  }

  .swiper-button-prev {
    &:hover {
      @include viewport(hover) {
        & svg {
          animation: pulsePrev 1s infinite;
        }
      }
    }
  }

  .swiper-button-next {
    margin-left: vw_big_screen(16px);
    &:hover {
      @include viewport(hover) {
        & svg {
          animation: pulseNext 1s infinite;
        }
      }
    }
  }

  .tags {
    padding: 0 vw_big_screen(12px);
    background-color: var(--tags-bg);
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    max-width: vw_big_screen(248px);
    &::after {
      content: '...';
      position: absolute;
      right: 0;
      padding: 0 vw_big_screen(5px) 0 0;
      background-color: var(--tags-bg);
      font-size: vw_big_screen(12px);
      letter-spacing: -0.36em;
    }
    & span {
      font-size: vw_big_screen(12px);
      display: inline-block;
    }
    &:hover::after {
      transition: opacity 0.1s ease-in-out;
      opacity: 0;
    }
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