<template>
  <div class="container m-auto p-screen">
    <Decorative :content="'html'" :className="'tag-item__html'">
      <Decorative :content="'body'" :className="'tag-item__body'">
        About Me
      </Decorative>
    </Decorative>
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