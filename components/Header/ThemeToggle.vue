<template>
  <button class="flex justify-center items-center rounded hover-effect btn-toggle" @click="toggleTheme">
    <svg v-if="!$store.state.theme.darkMode" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.07778 2.78889C6.87778 3.5 6.77778 4.24444 6.77778 5C6.77778 9.53333 10.4667 13.2222 15 13.2222C15.7556 13.2222 16.5 13.1222 17.2111 12.9222C16.0556 15.7667 13.2556 17.7778 10 17.7778C5.71111 17.7778 2.22222 14.2889 2.22222 10C2.22222 6.74444 4.23333 3.94444 7.07778 2.78889ZM10 0C4.47778 0 0 4.47778 0 10C0 15.5222 4.47778 20 10 20C15.5222 20 20 15.5222 20 10C20 9.48889 19.9556 8.97778 19.8889 8.48889C18.8 10.0111 17.0222 11 15 11C11.6889 11 9 8.31111 9 5C9 2.98889 9.98889 1.2 11.5111 0.111111C11.0222 0.0444443 10.5111 0 10 0Z" fill="#FFA800"/>
    </svg>
    <svg v-if="$store.state.theme.darkMode" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 7.27273C11.5 7.27273 12.7273 8.5 12.7273 10C12.7273 11.5 11.5 12.7273 10 12.7273C8.5 12.7273 7.27273 11.5 7.27273 10C7.27273 8.5 8.5 7.27273 10 7.27273ZM10 5.45455C7.49091 5.45455 5.45455 7.49091 5.45455 10C5.45455 12.5091 7.49091 14.5455 10 14.5455C12.5091 14.5455 14.5455 12.5091 14.5455 10C14.5455 7.49091 12.5091 5.45455 10 5.45455ZM0.909091 10.9091H2.72727C3.22727 10.9091 3.63636 10.5 3.63636 10C3.63636 9.5 3.22727 9.09091 2.72727 9.09091H0.909091C0.409091 9.09091 0 9.5 0 10C0 10.5 0.409091 10.9091 0.909091 10.9091ZM17.2727 10.9091H19.0909C19.5909 10.9091 20 10.5 20 10C20 9.5 19.5909 9.09091 19.0909 9.09091H17.2727C16.7727 9.09091 16.3636 9.5 16.3636 10C16.3636 10.5 16.7727 10.9091 17.2727 10.9091ZM9.09091 0.909091V2.72727C9.09091 3.22727 9.5 3.63636 10 3.63636C10.5 3.63636 10.9091 3.22727 10.9091 2.72727V0.909091C10.9091 0.409091 10.5 0 10 0C9.5 0 9.09091 0.409091 9.09091 0.909091ZM9.09091 17.2727V19.0909C9.09091 19.5909 9.5 20 10 20C10.5 20 10.9091 19.5909 10.9091 19.0909V17.2727C10.9091 16.7727 10.5 16.3636 10 16.3636C9.5 16.3636 9.09091 16.7727 9.09091 17.2727ZM4.53636 3.25455C4.18182 2.9 3.6 2.9 3.25455 3.25455C2.9 3.60909 2.9 4.19091 3.25455 4.53636L4.21818 5.5C4.57273 5.85455 5.15455 5.85455 5.5 5.5C5.84545 5.14545 5.85455 4.56364 5.5 4.21818L4.53636 3.25455ZM15.7818 14.5C15.4273 14.1455 14.8455 14.1455 14.5 14.5C14.1455 14.8545 14.1455 15.4364 14.5 15.7818L15.4636 16.7455C15.8182 17.1 16.4 17.1 16.7455 16.7455C17.1 16.3909 17.1 15.8091 16.7455 15.4636L15.7818 14.5ZM16.7455 4.53636C17.1 4.18182 17.1 3.6 16.7455 3.25455C16.3909 2.9 15.8091 2.9 15.4636 3.25455L14.5 4.21818C14.1455 4.57273 14.1455 5.15455 14.5 5.5C14.8545 5.84545 15.4364 5.85455 15.7818 5.5L16.7455 4.53636ZM5.5 15.7818C5.85455 15.4273 5.85455 14.8455 5.5 14.5C5.14545 14.1455 4.56364 14.1455 4.21818 14.5L3.25455 15.4636C2.9 15.8182 2.9 16.4 3.25455 16.7455C3.60909 17.0909 4.19091 17.1 4.53636 16.7455L5.5 15.7818Z" fill="#FFA800"/>
    </svg>
  </button>
</template>

<script>
  import { useStore } from 'vuex';

  export default {
    beforeMount() {
      const store = useStore();
      // console.log(console.log(localStorage.darkMode))
      this.$store = store;
    },
    methods: {
      toggleTheme() {
        this.$store.commit('theme/toggleDarkMode');
        localStorage.setItem('darkMode', this.$store.state.theme.darkMode);
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('data-theme', this.$store.state.theme.darkMode ? 'dark' : 'light');
      },
    },
  }
</script>

<style lang="scss" scoped>
  .btn-toggle {
    width: vw_big_screen(44px);
    height: vw_big_screen(44px);
    margin-left: vw_big_screen(8px);
    background-color: #3F3846;
    padding: 0;
    @include viewport(tabs) {
      margin-left: auto;
      width: vw_tabs(40px);
      height: vw_tabs(40px);
      margin-right: vw_tabs(14px);
    }
    @include viewport(sm_mobile) {
      width: vmin_mobile(40px);
      height: vmin_mobile(40px);
      margin-right: vmin_mobile(14px);
    }
    & svg {
      pointer-events: none;
      width: vw_big_screen(20px);
      height: auto;
      @include viewport(tabs) {
        width: 60%;
      }
    }
  }
</style>