<template>
  <Decorative :content="'html'" :className="'tag-item__html'" :tag="'open'" />
  <Decorative :content="'body'" :className="'tag-item__body tag-item__body-open'" :tag="'open'" />

  <swiper
    :slides-per-view="1"
    :modules="modules"
    :direction="'vertical'"
    :parallax="true"
    :observer="true"
    :effect="'fade'"
    :scrollbar="{
      dragSize: 'auto',
      draggable: true
    }"
    :fadeEffect= "{
      crossFade: true
    }"
    :mousewheel="{
      invert: false,
      thresholdDelta: 20,
      thresholdTime: 1000
    }"
    :keyboard="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index" class="slide-item">
      <component :is="slide.component" :key="slide.key" />
    </swiper-slide>
  </swiper>
  <DecorMouse/>
  <Decorative :content="'body'" :className="'tag-item__body tag-item__body-close'" :tag="'close'" />
  <Decorative :content="'html'" :className="'tag-item__html'" :tag="'close'" />
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Mousewheel, Keyboard, EffectFade, Parallax, Scrollbar } from 'swiper/modules';
  import MainSlide from '~/components/Slides/Main.vue';
  import AboutSlide from '~/components/Slides/About.vue';
  import ExperienceSlide from '~/components/Slides/Experience.vue';
  import PortfolioSlide from '~/components/Slides/Portfolio.vue';
  import ClientsSlide from '~/components/Slides/Clients.vue';
  import ReviewsSlide from '~/components/Slides/Reviews.vue';
  import ContactsSlide from '~/components/Slides/Contacts.vue';
  import Decorative from '~/components/DecorativeWrapper.vue';
  import DecorMouse from '~/components/DecorMouse.vue';

  export default {
    data() {
      return {
        swiper: null,
        activeSlide: null,
        modules: [Mousewheel, Keyboard, EffectFade, Parallax, Scrollbar],
      };
    },
    components: {
      Swiper,
      SwiperSlide,
      MainSlide,
      AboutSlide,
      ExperienceSlide,
      PortfolioSlide,
      ClientsSlide,
      ReviewsSlide,
      ContactsSlide,
      Decorative,
      DecorMouse
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
      // this.$refs.splide.splide.on('move', this.handleSlideChange);
    },
    watch: {
      '$store.state.activeItem'(newValue, oldValue) {
        this.changeSlide(newValue);
        this.swiper.mousewheel.enable()
      },
      '$store.state.allowMouseScroll'(newValue, oldValue) {
        newValue ? this.swiper.mousewheel.enable() : this.swiper.mousewheel.disable()
      }
    },
    methods: {
      onSwiper(swiper) {
        this.swiper = swiper;
      },
      onSlideChange(swiper) {
        const itemKey = this.slides[swiper.activeIndex].key;
        this.$store.commit('setActiveItem', itemKey);
      },
      changeSlide(key) {
        const slideIndex = this.slides.findIndex(slide => slide.key === key);
        this.swiper.slideTo(slideIndex)
      },
      // isActiveSlide(slideKey) {
      //   // return this.activeSlideKey === slideKey;
      // },
      // handleSlideChange(slideIndex) {
      //   const currentIndex = slideIndex;
      //   // this.$store.commit('setActiveItem', this.slides[currentIndex].key);
      // },
    },
  };
</script>

<style lang="scss" scoped>
  .swiper {
    height: 100vh;
  }
</style>