<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="content container">
      <Decorative :content="'main'" :className="'tag-item__text'" :tag="'wrap'">
        <swiper
          :slides-per-view="1"
          :effect="'creative'"
          :modules="modules"
          :limitProgress="2"
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
              <div class="slide-header flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <div class="buttons-list">
                  <button>
                    <span><IconDesktop/></span>
                    <b>Desktop</b>
                  </button>
                </div>
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
                <img class="flex" :src="myPhoto" alt="asd" loading="lazy">
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div>
              <div class="slide-header flex items-center justify-between">
                <h4>01. hello</h4>
                <div class="rounded flex items-center tags-wrap">
                  <IconTool />
                  <div class="tags flex items-center ">
                    Vue, Nuxt, Contentful, GSAP
                  </div>
                </div>
              </div>
              <div class="rounded body-inner">
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

  import IconDesktop from '~/components/Slides/Portfolio/Icon/Desktop.vue'
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Keyboard, EffectCreative } from 'swiper/modules';

  import photoPath from '~/assets/images/portfolio/projects/pyrpose/main.webp'

  export default {
    data() {
      return {
        myPhoto: photoPath,
        modules: [Keyboard, EffectCreative],
      };
    },
    components: {
      Decorative,
      Swiper,
      SwiperSlide,
      // IconTool,
      IconDesktop
      // DecorMouse
    },
  };

</script>

<style lang="scss" scoped>
  .content {
    margin-top: 20vh;
    margin-bottom: auto;
  }

  .slide-header {
    font-family: 'SF Mono', sans-serif;
    font-weight: 500;
    margin-bottom: vw_big_screen(8px);
  }

  h4 {
    margin: 0;
    font-size: vw_big_screen(16px);
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
    &-active {
      & .tags-wrap {
        transform: scale(1,1);
        transition: transform 0.4s cubic-bezier(0.22, -0.01, 0.01, 1.02) 0.2s;
      }
      & .body-inner {
        box-shadow: vw_big_screen(8px) vw_big_screen(14px) vw_big_screen(4px) 0 var(--shadow-slide);
        transition: box-shadow 0.4s cubic-bezier(0.22, -0.01, 0.01, 1.02) 0.2s;
      }
    }
    &-next {
      & .tags-wrap {
        transform: scale(0,1);
        transition: transform 0s;
      }
      & .body-inner {
        box-shadow: 0 0 0 0 var(--shadow-slide);
        transition: box-shadow 0s;
      }
    }
  }

</style>