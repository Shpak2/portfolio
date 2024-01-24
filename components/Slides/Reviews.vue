<template>
  <div class="container m-auto flex items-center full-height">
    <div class="content">
      <Decorative :content="'p'" :className="'tag-item__text'" :tag="'wrap'">
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