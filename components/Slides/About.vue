<template>
  <div class="container m-auto flex items-center full-height">
    <div class="flex justify-between content-wrap">
      <div class="content content-about">
        <Decorative :content="'p'" :className="'tag-item__text'" :tag="'wrap'">
          <h2>{{$t('aboutTitle')}}</h2>
          <div class="scrollable-container" v-html="$t('aboutContent')" @wheel="handleWheel" ref="scrollable"></div>
        </Decorative>
      </div>
      <div class="content-img">
        <img class="rounded" :src="myPhoto" width="350" height="286" alt="photo" loading="lazy">
      </div>
    </div>
  </div>
</template>

<script>
  import Decorative from '~/components/DecorativeWrapper.vue';
  import photoPath from '~/assets/images/main/photo.webp';

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
      handleWheel(event) {
        const deltaY = event.deltaY;
        const targetElement = this.$refs.scrollable;
        this.$store.commit('setAllowMouseScroll', false);

        const hasScrollableContent = targetElement.scrollHeight > targetElement.clientHeight;
        const isAtBottom = targetElement.scrollTop + targetElement.clientHeight >= targetElement.scrollHeight;

        const isAtTop = targetElement.scrollTop === 0;
        if (deltaY > 0 && hasScrollableContent && isAtBottom || deltaY < 0 && isAtTop) {
          this.$store.commit('setAllowMouseScroll', true);
        }
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
    }
    &-img {
      width: vw_big_screen(350px);
      padding-top: vw_big_screen(64px);
    }
  }
</style>