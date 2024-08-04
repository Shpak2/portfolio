<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="flex justify-between content-wrap">
      <div class="content">
        <Decorative :content="'p'" :className="'tag-item__text'" :tag="'wrap'">
          <h2 v-html="$t('aboutTitle')"/>
          <div class="scrollable-container"
            v-html="$t('aboutContent')"
            @wheel="handleWheel"
            @mouseleave="enableSwiper"
            @touchend="enableSwiper"
            />
            <!-- if mobile need add controll for touch @touchstart="disableSwiper" @touchend="enableSwiper" -->
        </Decorative>
      </div>
      <div class="content-img">
        <img class="rounded" :src="myPhoto" width="350" height="286" alt="photo" loading="lazy"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Decorative from '~/components/DecorativeWrapper.vue';
  import photoPath from '~/assets/images/main/photo.webp';
  import { handleWheel, enableSwiper } from '~/utils/globalFunctions.js';

  export default {
    data() {
      return {
        myPhoto: photoPath,
      }
    },
    components: {
      Decorative
    },
    methods: {
      handleWheel: function(event) {
        handleWheel(event, this.$store);
      },
      enableSwiper: function() {
        enableSwiper(this.$store);
      }
    }
  };

</script>

<style lang="scss" scoped>
  h2 {
    font-size: vw_big_screen(32px);
    line-height: vw_big_screen(52px);
    margin: vw_big_screen(4px) 0 vw_big_screen(12px);
    font-weight: 900;
  }
  .content {
    max-width: vw_big_screen(636px);
    & h2, & p {
      color: var(--secondary-color);
    }
    &-wrap {
      width: 100%;
      position: relative;
    }
    &-img {
      width: vw_big_screen(350px);
      padding-top: vw_big_screen(64px);
    }
  }
</style>