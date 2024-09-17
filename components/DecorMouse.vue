<template>
  <div class="flex items-center decor-wrap" :class="hideMouse ? 'hide' : ''">
    <div class="decor-text" v-html="$t('decorativeScroll')"/>
    <div class="decor-mouse">
      <div class="decor-mouse__wheel"/>
    </div>
    <div class="decor-hand justify-center items-center">
      <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.50586 18.8465V3.21605C8.50586 1.99224 9.4981 1.00022 10.7219 1.00049V1.00049C11.9453 1.00076 12.937 1.99262 12.937 3.21605V15.2333V9.35577C12.937 8.14477 13.9187 7.16305 15.1297 7.16305V7.16305C16.3407 7.16305 17.3224 8.14477 17.3224 9.35578V15.7137V11.6016C17.3224 10.364 18.3256 9.36081 19.5632 9.36081V9.36081C20.8007 9.36081 21.8039 10.364 21.8039 11.6016V16.2743V13.6495C21.8039 12.4715 22.7589 11.5165 23.9369 11.5165V11.5165C25.1149 11.5165 26.0699 12.4715 26.0699 13.6495V22.4026C26.0699 27.7306 21.7507 32.0498 16.4227 32.0498V32.0498C12.9486 32.0498 9.74281 30.1818 8.02983 27.1594L2.10867 16.7119C1.5028 15.6429 1.90427 14.2845 2.99395 13.7166V13.7166C4.00545 13.1895 5.25241 13.5351 5.84821 14.5078L8.50586 18.8465Z" stroke="var(--secondary-color)" stroke-width="2" stroke-linejoin="round"/>
      </svg>
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
  mounted() {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 30) {
        this.hideMouse = true
      }
    });
  }
};
</script>

<style lang="scss" scoped>

  @keyframes handTap {
    0%, 100% {
      transform: rotateX(0deg) translateY(0);
    }
    20%{
      transform: rotateX(-15deg) translateY(0);
    }
    50% {
      transform: rotateX(-15deg) translateY(-50%);
    }
    70% {
      transform: rotateX(0deg) translateY(-50%);
    }
  }
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
      @include viewport(tabs) {
        bottom: vw_tabs(80px);
        right: vw_tabs(70px);
      }
      @include viewport(sm_mobile) {
        bottom: unset;
        top: calc(100vh - vmin_mobile(40px));
        right: vmin_mobile(20px);
      }
      &.hide {
        animation: hideDecor 0.2s ease forwards;
      }
    }
    &-mouse {
      width: vw_big_screen(28px);
      height: vw_big_screen(42px);
      border: vw_big_screen(2px) solid var(--secondary-color);
      border-radius: vw_big_screen(20px);
      @include viewport(tabs) {
        display: none;
      }
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
    &-hand {
      display: none;
      @include viewport(tabs) {
        display: flex;
        width: vw_tabs(26px);
        animation: handTap 2s cubic-bezier(0.785, 0.135, 0.150, 0.860) infinite;
        transform-origin: center bottom;
      }
      @include viewport(sm_mobile) {
        width: vmin_mobile(26px);
      }
    }
    &-text {
      font-size: vw_big_screen(12px);
      color: var(--footer-color);
      font-weight: 600;
      margin-right: vw_big_screen(10px);
      @include viewport(tabs) {
        font-size: vw_tabs(12px);
        margin-right: vw_tabs(10px);
      }
      @include viewport(sm_mobile) {
        font-size: vmin_mobile(10px);
        margin-right: vmin_mobile(6px);
      }
    }
  }
</style>
