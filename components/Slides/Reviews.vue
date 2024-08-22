<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="content container">
      <Decorative :content="'h2'" :className="'tag-item__text'" :tag="'wrap'">
        <h2>Reviews</h2>
      </Decorative>
      <Decorative :content="'main'" :className="'tag-item__text'" :tag="'wrap'">
        <swiper
          :pagination="pagination"
          :slides-per-view="1"
          :modules="modules"
          :direction="'vertical'"
          :freeMode="true"
          :autoHeight="true"
          :keyboard="true"
          :spaceBetween="20"
        >
        <swiper-slide v-for="(item, index) in data" :key="index">
          <div v-html="item.review[$i18n.locale]"></div>
        </swiper-slide>
        </swiper>
      </Decorative>
    </div>
  </div>
</template>

<script>

  import Decorative from '~/components/DecorativeWrapper.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Keyboard, FreeMode, Pagination, Navigation, Grid } from 'swiper/modules';
  import { data } from '~/data/reviews'

  export default {
    data() {
      return {
        data,
        modules: [Keyboard, FreeMode, Pagination, Navigation, Grid],
      }
    },
    components: {
      Decorative,
      Swiper,
      SwiperSlide
    },
    mounted() {
      console.log(this.data)
    }
  };

</script>

<style lang="scss" scoped>
  h2 {
    font-size: vw_big_screen(32px);
    margin: 0;
    font-weight: 900;
  }
  .container {
    position: relative;
  }

  .swiper {
    width: 100%;
    // height: 400px;
    margin-left: 0;
    // overflow: unset;
    padding-bottom: vw_big_screen(14px);
    &-slide {
      // height: calc((100% - 60px) / 3) !important;
      height: fit-content !important;
      width: 100%;
      background: red;

    }
  }

</style>