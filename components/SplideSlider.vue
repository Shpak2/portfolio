<template>
  <Decorative :content="'html'" :className="'tag-item__html'" :tag="'open'" />
  <Decorative :content="'body'" :className="'tag-item__body tag-item__body-open'" :tag="'open'" />
  <Splide :options="splideOptions" class="slider-wrap" ref="splide">
    <SplideSlide v-for="(slide, index) in slides" :key="index" class="slide-item">
      <component :is="slide.component" :key="slide.key" />
    </SplideSlide>
  </Splide>
  <Decorative :content="'body'" :className="'tag-item__body tag-item__body-close'" :tag="'close'" />
  <Decorative :content="'html'" :className="'tag-item__html'" :tag="'close'" />
</template>

<script>
  import {Splide, SplideSlide } from '@splidejs/vue-splide';
  import MainSlide from '~/components/Slides/Main.vue';
  import AboutSlide from '~/components/Slides/About.vue';
  import ExperienceSlide from '~/components/Slides/Experience.vue';
  import PortfolioSlide from '~/components/Slides/Portfolio.vue';
  import ClientsSlide from '~/components/Slides/Clients.vue';
  import ReviewsSlide from '~/components/Slides/Reviews.vue';
  import ContactsSlide from '~/components/Slides/Contacts.vue';
  import Decorative from '~/components/DecorativeWrapper.vue';

  export default {
    data() {
      return {
        activeSlide: null,
        splideOptions: {
          type       : 'fade',
          keyboard: 'global',
          wheelMinThreshold: 5,
          wheelSleep: 1000,
          // direction   : 'ttb',
          height      : '100vh',
          perMove : 1,
          // rewind: true,
          pagination : false,
          arrows     : false,
          cover      : true,
          releaseWheel: true,
          wheel    : this.$store.state.allowMouseScroll,
          easing : 'cubic-bezier(0.645,  0.045, 0.355, 1.000)'
          // easing : 'cubic-bezier(0.215,  0.610, 0.355, 1.000)'
          // breakpoints: {
          //   600: {
          //     heightRatio: 0.7,
          //   },
          //   800: {
          //     heightRatio: 0.8,
          //   },
          // },
        }
      };
    },
    components: {
      Splide,
      SplideSlide,
      MainSlide,
      AboutSlide,
      ExperienceSlide,
      PortfolioSlide,
      ClientsSlide,
      ReviewsSlide,
      ContactsSlide,
      Decorative
    },
    computed: {
      slides() {
        return [
          { component: MainSlide, key: 'home' },
          { component: AboutSlide, key: 'about' },
          { component: ExperienceSlide, key: 'experience' },
          { component: PortfolioSlide, key: 'portfolio' },
          { component: ClientsSlide, key: 'clients' },
          { component: ReviewsSlide, key: 'reviews' },
          { component: ContactsSlide, key: 'contacts' },
        ];
      },
    },
    mounted() {
      this.$refs.splide.splide.on('move', this.handleSlideChange);
    },
    watch: {
      '$store.state.activeItem'(newValue, oldValue) {
        this.changeSlide(newValue);
      },
      '$store.state.allowMouseScroll'(newValue, oldValue) {
        this.reinitSplide(newValue);
        this.splideOptions.wheel = newValue
      }
    },
    methods: {
      reinitSplide(val){
        // console.log(val)
         // Отримання екземпляра Splide за допомогою $refs
    const splideInstance = this.$refs.splide.splide;
    this.splideOptions = {
      wheel: val
    }
    console.log(splideInstance)

    this.$refs.splide.splide.refresh();
      },
      changeSlide(key) {
        const slideIndex = this.slides.findIndex(slide => slide.key === key);
        // console.log(slideIndex)
        this.$refs.splide.splide.go(slideIndex)
      },
      isActiveSlide(slideKey) {
        return this.activeSlideKey === slideKey;
      },
      handleSlideChange(slideIndex) {
        const currentIndex = slideIndex;
        this.$store.commit('setActiveItem', this.slides[currentIndex].key);
      },
    },
  };
</script>

<style lang="scss" scoped>
  // .splide__track--fade > .splide__list > .splide__slide.is-active {
  //   opacity: 1;
  // }
</style>