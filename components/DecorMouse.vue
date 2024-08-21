<template>
  <div class="flex items-center decor-wrap" :class="hideMouse ? 'hide' : ''">
    <div class="decor-text" v-html="$t('decorativeScroll')"/>
    <div class="decor-mouse">
      <div class="decor-mouse__wheel"/>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      hideMouse: false
    }
  },
  watch: {
    '$store.state.activeItem'() {
      this.hideMouse = true
    },
  },
};
</script>

<style lang="scss" scoped>

  @keyframes hideDecor {
    to {
      transform: translateY(30%) scale(1,0);
      opacity: 0;
    }
  }
  @keyframes breath {
    0%, 22% { transform: translate(var(--x-0, 0), var(--y-0, 0)); }
    100% { transform: translate(var(--x-100, 0), var(--y-100, 0)); }
  }

  .decor {
    &-wrap {
      position: absolute;
      bottom: vw_big_screen(70px);
      right: vw_big_screen(200px);
      &.hide {
        animation: hideDecor 0.2s ease forwards;
      }
    }
    &-mouse {
      width: vw_big_screen(28px);
      height: vw_big_screen(42px);
      border: vw_big_screen(2px) solid var(--secondary-color);
      border-radius: vw_big_screen(20px);
      &__wheel {
        width: vw_big_screen(2px);
        height: vw_big_screen(12px);
        margin: vw_big_screen(8px) auto;
        background-color: var(--secondary-color);
        border-radius: vw_big_screen(10px);
        position: relative;
        overflow: hidden;

        &::before {
          --y-0: -100%;
          --y-100: 200%;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 60%;
          width: 100%;
          background-image: linear-gradient(
            to bottom,
            var(--header-color),
            var(--primary-color),
            var(--header-color)
          );
          animation: breath 1s ease infinite;
          animation-delay: calc(1s * -0.38);
        }
      }
    }
    &-text {
      font-size: vw_big_screen(12px);
      color: var(--footer-color);
      font-weight: 600;
      margin-right: vw_big_screen(10px);
    }
  }
</style>
