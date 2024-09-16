<template>
  <button
    :class="active ? 'menuexpanded' : ''"
    class="justify-center items-center rounded btn-toggle"
    @click="toggleMenu">
    <svg id="menu_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
      <g id="dashes">
        <path class="menu_icon_dash" id="dash_bottom" d="M145 609l609 0c74,0 74,111 0,111l-609 0c-74,0 -74,-111 0,-111z" fill="var(--secondary-color)"></path>
        <path class="menu_icon_dash" id="dash_middle" d="M146 394c203,0 406,0 609,0 74,0 74,111 0,111 -203,0 -406,0 -609,0 -74,0 -74,-111 0,-111z" fill="var(--secondary-color)"></path>
        <path class="menu_icon_dash" id="dash_top" d="M146 179l609 0c74,0 74,111 0,111l-609 0c-74,0 -74,-111 0,-111z" fill="var(--secondary-color)"></path>
      </g>
    </svg>
  </button>
</template>

<script>
  export default {
    data() {
      return {
        active: false
      }
    },
    methods: {
      toggleMenu() {
        this.active = !this.active
        this.$store.commit('setMenuActive', this.active);
      }
    },
    watch: {
      '$store.state.menuActive'(val) {
        this.active = val
      },
    },
  }
</script>

<style lang="scss" scoped>
  .btn-toggle {
    width: vw_tabs(44px);
    height: vw_tabs(44px);
    display: none;
    padding: 0;
    @include viewport(tabs) {
      display: flex;
    }
    @include viewport(sm_mobile) {
      width: vmin_mobile(44px);
      height: vmin_mobile(44px);
    }
    & svg {
      pointer-events: none;
      transform: scale(1.22);
    }
  }
  .menuexpanded {
    #dash_top {
      transform: translateY(16.75%) translateX(-16.9%) rotate(45deg);
    }
    #dash_bottom {
      transform: translateY(16.75%) translateX(16.9%) rotate(135deg);
    }
    #dash_middle {
      transform: rotate(135deg);
      opacity: 0;
    }
  }
  .menu_icon_dash {
    transform-origin: 50% 50%;
    opacity: 1;
    transition: transform .3s, opacity .3s;
  }
</style>