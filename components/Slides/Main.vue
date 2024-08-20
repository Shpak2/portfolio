<template>
  <Animation />
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="content content-main">
      <Decorative :content="'h1'" :className="'tag-item__title'" :tag="'wrap'">
        <h1 v-html="$t('mainTitle')"/>
        <h2 v-html="$t('mainSubtitle')"/>
      </Decorative>
      <Decorative :content="'button'" :className="'tag-item__btn'" :tag="'wrap'">
        <button class="flex justify-center items-center rounded btn-main" @click="toPortfolio">
          <p v-html="$t('mainButton')"/>
          <span class="flex">
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7H23M23 7L17.375 1.5M23 7L17.375 12.5" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
      </Decorative>
    </div>
  </div>
</template>

<script>
  import Decorative from '~/components/DecorativeWrapper.vue';
  // import Animation from '~/components/Slides/Main/Animation.vue';
  import Animation from '~/components/Slides/Main/Animation.vue';

  export default {
    components: {
      Decorative,
      Animation
    },
    methods: {
      toPortfolio() {
        this.$store.commit('setActiveItem', 'portfolio');
      }
    }
  };

</script>

<style lang="scss" scoped>
  .btn-main {
    height: vw_big_screen(64px);
    color: var(--primary-color);
    background-color: var(--secondary-color);
    transition: 0.3s ease;
    font-size: vw_big_screen(20px);
    font-weight: 600;
    padding: 0 vw_big_screen(32px);
    margin: vw_big_screen(16px) 0;
    & span {
      width: vw_big_screen(22px);
      margin-left: vw_big_screen(12px);
      transform: translate(0%,10%);
      & svg {
        & path {
          transition: 0.3s ease;
        }
      }
    }
    &:hover {
      @include viewport(hover) {
        animation: bounce .8s forwards;
        & span {
          animation: pulse 1s infinite;
        }
      }
    }
  }

</style>
