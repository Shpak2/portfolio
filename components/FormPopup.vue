<template>
  <div
    :class="{show: showPopup, hide: hidePopup}"
    class="mask-popup flex items-center justify-center">
    <LogoLoader v-if="onLogoLoader"/>
    <div v-if="!onLogoLoader" class="popup-wrap flex items-center flex-col rounded">
      <button class="btn-close flex items-center justify-center" @click="closePopup">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.39339 1.39355L22.6066 22.6068" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round"/>
          <path d="M22.6066 1.39355L1.39339 22.6068" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <IconStatus :hasError="error" />
      <h4 v-if="!error" v-html="$t('popupSuccessTitle')"></h4>
      <h4 v-if="error" v-html="$t('popupErrorTitle')"></h4>
      <p v-if="!error" v-html="$t('popupSuccessMessage')"></p>
      <p v-if="error" v-html="message"></p>
      <button v-if="!error" class="btn-ok flex items-center justify-center rounded" @click="closePopup">OK</button>
      <button v-if="error" class="btn-ok flex items-center justify-center rounded" @click="closePopup" v-html="$t('popupErrorBtn')"></button>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import LogoLoader from '~/components/Slides/Contacts/LogoLoader.vue'
  import IconStatus from '~/components/Svg/Status.vue'

  export default {
    data() {
      return {
        showPopup: true,
        hidePopup: false,
        onLogoLoader: true
        // project: this.$store.state.popup.project,
        // mode: this.$store.state.popup.mode,
        // handleTitle: true,
        // handleDisplay: true
      }
    },
    props: {
      error: false,
      message: ''
    },
    watch: {
      '$store.state.logoLoader'(newValue) {
        this.onLogoLoader = newValue
      },
    },
    components: {
      LogoLoader,
      IconStatus
    },
    mounted() {
      // console.log(this.$store.state.hasError)
    },
    beforeMount() {
      // const store = useStore();
      // this.$store = store;
    },
    methods: {
      closePopup() {
        this.hidePopup = true
        this.showPopup = false
        setTimeout(()=>{
          this.$store.commit('setFormPopup', false);
          this.hidePopup = false
        },400)
        // this.$store.commit('popup/setShowPopup', false);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .mask-popup {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 101;
    background: rgba(20, 18, 22, 0.6);
    backdrop-filter: blur(5px);
    filter: blur(100px);
    opacity: 0;
    transition: 0.3s ease-in;
    transform: scale(2);
    @include viewport(sm_mobile) {
      position: fixed;
    }
    &.show {
      animation: show 0.2s ease-in-out forwards;
    }
    &.hide {
      animation: hide 0.2s ease-in forwards;
    }
  }

  .btn-close {
    width: vw_big_screen(32px);
    height: vw_big_screen(32px);
    transition: transform 0.2s ease;
    position: absolute;
    top: vw_big_screen(20px);
    right: vw_big_screen(20px);
    @include viewport(tabs) {
      width: vw_tabs(32px);
      height: vw_tabs(32px);
      top: vw_tabs(20px);
      right: vw_tabs(20px);
    }
    @include viewport(swap_tabs) {
      width: vw_tabs(20px);
      height: vw_tabs(20px);
      top: vw_tabs(14px);
      right: vw_tabs(14px);
    }
    @include viewport(sm_mobile) {
      width: vmin_mobile(32px);
      height: vmin_mobile(32px);
      top: vmin_mobile(20px);
      right: vmin_mobile(20px);
    }
    &:active {
      transform: scale(0.8);
    }
    &:hover svg {
      animation: closeHover 0.6s cubic-bezier(0.44, 1.2, 0.54, 0.31) forwards;
    }
  }

  .btn-ok {
    background-color: var(--secondary-color);
    font-size: vw_big_screen(16px);
    font-weight: 600;
    line-height: vw_big_screen(19px);
    padding: vw_big_screen(12.5px) vw_big_screen(16px);
    margin-top: vw_big_screen(24px);
    transition: opacity 0.2s ease;
    color: var(--tags-bg);
    @include viewport(tabs) {
      font-size: vw_tabs(16px);
      line-height: vw_tabs(19px);
      padding: vw_tabs(12.5px) vw_tabs(16px);
      margin-top: vw_tabs(24px);
    }
    @include viewport(swap_tabs) {
      font-size: vw_tabs(10px);
      line-height: vw_tabs(12px);
      padding: vw_tabs(8.5px) vw_tabs(10px);
      margin-top: vw_tabs(15px);
    }
    @include viewport(sm_mobile) {
      font-size: vmin_mobile(16px);
      line-height: vmin_mobile(19px);
      padding: vmin_mobile(12.5px) vmin_mobile(16px);
      margin-top: vmin_mobile(24px);
    }
    &:hover {
      @include viewport(hover) {
        opacity: 0.75;
      }
    }
  }

  h4 {
    margin: vw_big_screen(16px) 0 vw_big_screen(8px);
    font-size: vw_big_screen(32px);
    font-weight: 900;
    line-height: vw_big_screen(52px);
    text-align: center;
    @include viewport(tabs) {
      margin: vw_tabs(16px) 0 vw_tabs(8px);
      font-size: vw_tabs(32px);
      line-height: vw_tabs(52px);
    }
    @include viewport(swap_tabs) {
      margin: vw_tabs(10px) 0 vw_tabs(6px);
      font-size: vw_tabs(20px);
      line-height: vw_tabs(20px);
    }
    @include viewport(mobile) {
      margin: vmin_mobile(16px) 0 vmin_mobile(8px);
      font-size: vmin_mobile(32px);
      line-height: vmin_mobile(52px);
    }
    @include viewport(swap_mobile) {
      margin: vmin_mobile(12px) 0 vmin_mobile(8px);
      font-size: vmin_mobile(28px);
      line-height: vmin_mobile(44px);
    }
  }

  p {
    margin: 0;
    font-size: vw_big_screen(16px);
    font-weight: 500;
    line-height: vw_big_screen(20px);
    text-align: center;
    max-height: vw_big_screen(220px);
    overflow: auto;
    word-break: break-word;
    padding: 0 vw_big_screen(4px);
    @include viewport(tabs) {
      font-size: vw_tabs(16px);
      line-height: vw_tabs(20px);
      max-height: vw_tabs(220px);
      padding: 0 vw_tabs(4px);
    }
    @include viewport(swap_tabs) {
      font-size: vw_tabs(10px);
      line-height: vw_tabs(14px);
      max-height: vw_tabs(140px);
      padding: 0 vw_tabs(4px);
    }
    @include viewport(sm_mobile) {
      max-height: vmin_mobile(220px);
      padding: 0 vmin_mobile(4px);
    }
    @include viewport(mobile) {
      font-size: vmin_mobile(16px);
      line-height: vmin_mobile(20px);
    }
    @include viewport(swap_mobile) {
      font-size: vmin_mobile(14px);
      line-height: vmin_mobile(18px);
    }
  }

  .popup-wrap {
    width: vw_big_screen(400px);
    padding: vw_big_screen(78px) vw_big_screen(52px) vw_big_screen(66px);
    background-color: var(--primary-color);
    position: relative;
    box-shadow: 0 vw_big_screen(20px) vw_big_screen(40px) 0 var(--sidebar-color);
    @include viewport(tabs) {
      width: vw_tabs(400px);
      padding: vw_tabs(78px) vw_tabs(52px) vw_tabs(66px);
      box-shadow: 0 20px 40px 0 var(--sidebar-color);
    }
    @include viewport(swap_tabs) {
      width: vw_tabs(254px);
      padding: vw_tabs(50px) vw_tabs(34px) vw_tabs(42px);
    }
    @include viewport(sm_mobile) {
      width: vmin_mobile(350px);
    }
    @include viewport(mobile) {
      padding: vmin_mobile(78px) vmin_mobile(52px) vmin_mobile(66px);
    }
    @include viewport(swap_mobile) {
      height: 90vh;
      justify-content: center;
      padding: vmin_mobile(18px) vmin_mobile(52px) vmin_mobile(16px);
    }
  }

  @keyframes show {
    to {
      filter: blur(0);
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes hide {
    from {
      filter: blur(0);
      opacity: 1;
      transform: scale(1);
    }
    to {
      filter: blur(100px);
      opacity: 0;
      transform: scale(2);
    }
  }

</style>