<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="content">
      <Decorative :content="'p'" :className="'tag-item__text'" :tag="'wrap'">
        experience
        <Vue3Lottie :animationData="logoLottie" :height="200" :width="200" />
      </Decorative>
    </div>
  </div>
</template>

<script>
  import Decorative from '~/components/DecorativeWrapper.vue';
  import logoData from '~/assets/images/logo.json';

  import { Vue3Lottie } from 'vue3-lottie'

  export default {
    components: {
      Decorative,
      Vue3Lottie
    },
    data() {
      return {
        logoLottie: logoData,
      }
    },
  };

</script>

<style lang="scss" scoped>

</style>