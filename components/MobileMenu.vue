<template>
  <div
    :class="{show: showMenu, hide: hide}"
    class="menu-wrap items-center justify-center">
      <div class="menu-inner flex items-center justify-center flex-col">
        <Sidebar :isMenu="true"/>
        <LanguageSelector :isMenu="true"/>
        <Social :isMenu="true"/>
        <Copyright :isMenu="true"/>
      </div>
  </div>
</template>

<script>
  // import { useStore } from 'vuex';
  // import { data } from '~/data/projects'

  import Sidebar from '~/components/Sidebar.vue';
  import LanguageSelector from '~/components/Header/LanguageSelector.vue';
  import Copyright from '~/components/Footer/Copyright.vue';
  import Social from '~/components/Footer/Social.vue';
  // import IconTablet from '~/components/Svg/Tablet.vue';
  // import IconMobile from '~/components/Svg/Mobile.vue';

  export default {
    data() {
      return {
        showMenu: true,
        // data,
        // project: this.$store.state.popup.project,
        // mode: this.$store.state.popup.mode,
        // handleTitle: true,
        // handleDisplay: true,
      }
    },
    props: {
      hide: false
    },
    components: {
      Sidebar,
      LanguageSelector,
      Copyright,
      Social
      // IconTablet,
      // IconMobile
    },
    methods: {
      // closeMenu() {
      //   this.hidePopup = true
      //   setTimeout(()=>{
      //     this.$store.commit('popup/setShowPopup', false);
      //     this.hidePopup = false
      //   },500)
      // },
    },
  }
</script>

<style lang="scss" scoped>
  .menu {
    &-wrap {
      position: fixed;
      inset: 0;
      margin: auto;
      width: 100%;
      height: 100svh;
      height: calc(var(--vh, 1svh) * 100);
      z-index: 99;
      background: var(--primary-color);
      backdrop-filter: blur(5px);
      opacity: 0;
      transition: 0.3s ease-in;
      transform: scale(2);
      display: none;
      padding-top: vw_tabs(80px);
      // max-height: 100vh;
      @include viewport(tabs) {
        display: flex;
        flex-direction: column;
      }
      @include viewport(sm_mobile) {
        padding-top: vmin_mobile(80px);
      }
      &.show {
        animation: show 0.2s ease-in-out forwards;
      }
      &.hide {
        opacity: 1;
        transform: scale(1);
        animation: hide 0.2s ease-in forwards;
      }
    }
    &-inner {
      height: 100%;
      overflow: auto;
      @include viewport(swap_mobile) {
        width: 100%;
      }
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