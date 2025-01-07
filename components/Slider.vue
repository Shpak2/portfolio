<template>
  <Decorative :content="'html'" :className="'tag-item__html'" :tag="'open'" />
  <Decorative :content="'body'" :className="'tag-item__body tag-item__body-open'" :tag="'open'" />

  <swiper
    v-if="!isMobile"
    :slides-per-view="1"
    :modules="modules"
    :direction="'vertical'"
    :parallax="true"
    :observer="true"
    :effect="'fade'"
    :scrollbar="{
      el: '.swiper-scrollbar.custom-scrollbar',
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
  <div v-if="isMobile" class="wrapper-main">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      ref="slideItems"
      :class="{'mobile-overflow': slide.key === 'experience' || slide.key === 'portfolio'}"
      class="slide-item">
        <component :is="slide.component" :key="slide.key" :isMobile="isMobile" />
    </div>
  </div>
  <div v-if="!isMobile" class="swiper-scrollbar custom-scrollbar"></div>
  <DecorMouse/>
  <Decorative :content="'body'" :className="'tag-item__body tag-item__body-close'" :tag="'close'" />
  <Decorative :content="'html'" :className="'tag-item__html'" :tag="'close'" />
</template>

<script>
  import { useStore } from 'vuex';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Mousewheel, Keyboard, EffectFade, Parallax, Scrollbar } from 'swiper/modules';
  import MainSlide from '~/components/Slides/Main.vue';
  import AboutSlide from '~/components/Slides/About.vue';
  import ExperienceSlide from '~/components/Slides/Experience.vue';
  import PortfolioSlide from '~/components/Slides/Portfolio.vue';
  // import ClientsSlide from '~/components/Slides/Clients.vue';
  import ReviewsSlide from '~/components/Slides/Reviews.vue';
  import ContactsSlide from '~/components/Slides/Contacts.vue';
  import Decorative from '~/components/DecorativeWrapper.vue';
  import DecorMouse from '~/components/DecorMouse.vue';

  export default {
    data() {
      return {
        swiper: null,
        activeSlide: null,
        lastActiveSlide: null,
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
      // ClientsSlide,
      ReviewsSlide,
      ContactsSlide,
      Decorative,
      DecorMouse
    },
    props: {
      isMobile: false,
    },
    computed: {
      slides() {
        return [
          { component: MainSlide, key: 'home' },
          { component: AboutSlide, key: 'about' },
          { component: ExperienceSlide, key: 'experience' },
          { component: PortfolioSlide, key: 'portfolio' },
          // { component: ClientsSlide, key: 'clients' },
          { component: ReviewsSlide, key: 'reviews' },
          { component: ContactsSlide, key: 'contacts' },
        ];
      },
    },
    beforeMount() {
      const store = useStore();
      this.$store = store;
    },
    mounted() {
      if (this.isMobile) window.addEventListener('scroll', this.controlMenu);
    },
    beforeDestroy() {
      if (this.isMobile) window.removeEventListener('scroll', this.controlMenu);
    },
    watch: {
      '$store.state.activeItem'(newValue) {
        if (!this.isMobile) {
          this.changeSlide(newValue);
          this.swiper.mousewheel.enable()
        }
      },
      '$store.state.allowMouseScroll'(newValue) {
        newValue ? this.swiper.mousewheel.enable() : this.swiper.mousewheel.disable()
      },
      '$store.state.menuClick'(newValue) {
        if (newValue) {
          let numSlide = this.slides.findIndex(slide => slide.key === this.$store.state.activeItem)
          this.scrollToSlide(numSlide)
          this.$store.commit('setMenuClick', false);
        }
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
      scrollToSlide(key) {
        const slideElement = this.$refs.slideItems[key];
        if (slideElement) {
          const { top } = slideElement.getBoundingClientRect();
          window.scrollTo({
            top: window.pageYOffset + top - 90,
            behavior: 'smooth'
          });
        }
      },
      controlMenu() {
        const slideItems = this.$refs.slideItems;

        if (!slideItems || slideItems.length === 0) return;
        let activeSlide = null;

        slideItems.forEach((slide, index) => {
          const rect = slide.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

          if (isVisible) {
            activeSlide = this.slides[index];
          }
        });

        if (activeSlide && activeSlide.key !== this.lastActiveSlide) {
          this.lastActiveSlide = activeSlide.key;
          this.$store.commit('setActiveItem', activeSlide.key);
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .swiper {
    height: 100vh;
  }
</style>