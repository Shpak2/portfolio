<template>
  <div class="container m-auto flex items-center full-height" data-swiper-parallax-y="-10%" data-swiper-parallax-opacity="0" data-swiper-parallax-duration="400">
    <div class="content">
      <Decorative :content="'h2'" :className="'tag-item__text'" :tag="'wrap'">
        <h2>Reviews</h2>
      </Decorative>
      <Decorative :content="'main'" :className="'tag-item__text'" :tag="'wrap'">
        Reviews
      </Decorative>
    </div>
  </div>
</template>

<script>
  import Decorative from '~/components/DecorativeWrapper.vue';

  export default {
    components: {
      Decorative
    }
  };

</script>

<style lang="scss" scoped>

</style>