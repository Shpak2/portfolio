<template>
  <div v-if="isPlay" class="preloader" :class="{ complete: completeLoop }">
    <Vue3Lottie
      v-if="isPlay"
      :speed="0.9"
      :autoplay="1"
      :loop="1"
      :animationData="checkTheme() ? logoBlack : logoWhite"
      :height="'30%'"
      :width="checkWidth() ? '70%' : '35%'"
      />
  </div>
</template>

<script>
  import { Vue3Lottie } from 'vue3-lottie'
  import { useStore } from 'vuex';
  import logoJsonWhite from '~/store/logo-white.json';
  import logoJsonBlack from '~/store/logo-black.json';

  export default {
    components: {
      Vue3Lottie
    },
    data() {
      return {
        logoWhite: logoJsonWhite,
        logoBlack: logoJsonBlack,
        isPlay: false,
        completeLoop: false,
      }
    },
    beforeMount() {
      const store = useStore();
      this.$store = store;
      this.checkWidth()
    },
    watch: {
      '$store.state.preloader.isPlay'(newValue) {
        this.isPlay = newValue
      },
      '$store.state.preloader.completeLoop'(newValue) {
        this.completeLoop = newValue
      },
    },
    mounted() {
      // hack=)
      setTimeout(
        ()=>{
          setTimeout(this.loopComplete,3000)
          this.$store.commit('preloader/setIsPlay', true);

        }, 1)
    },
    methods: {
      checkTheme: function () {
        return this.$store.state.theme.darkMode;
      },
      loopComplete: function () {
        this.completeLoop = true
        this.$store.commit('preloader/setCompleteLoop', true);
        setTimeout(()=>{
          this.$store.commit('preloader/setIsPlay', false);
        }, 1000)
      },
      checkWidth: function () {
        return screen.width <= 1440 ? true : false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .preloader {
    // display: none;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: var(--primary-color);
    z-index: 5000;
    &.complete {
      animation: blur 1s forwards;
    }
  }

  @keyframes blur {
    to {
      opacity: 0;
      transform: scale(1.5);
      filter: blur(10px);
    }
  }
</style>