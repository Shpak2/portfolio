<template>
  <div class="language-wrap" :class="{'menu-language': isMenu }">
    <button class="language-link" :class="{ 'active': $route.path === '/' }" to="/" @click="changeLanguage('en')">EN</button>
    <button class="language-link" :class="{ 'active': $route.path === '/ua' }" to="/ua" @click="changeLanguage('ua')">UA</button>
    <button class="language-link" :class="{ 'active': $route.path === '/pl' }" to="/pl" @click="changeLanguage('pl')">PL</button>
  </div>
</template>

<script>
  import { useStore } from 'vuex';

  export default {
    props: {
      isMenu: false
    },
    beforeMount() {
      const store = useStore();
      this.$store = store;
    },
    methods: {
      changeLanguage: async function(lang) {
        this.$store.commit('preloader/setCompleteLoop', false);
        this.$store.commit('preloader/setIsPlay', true);
        if (this.isMenu) {
          this.$store.commit('setMenuActive', false);
        }
        await this.sleep(3000);
        this.$store.commit('preloader/setCompleteLoop', true);
        lang === 'en' ? this.$router.push('/') : this.$router.push(`/${lang}`)
        await this.sleep(1000);
        this.$store.commit('preloader/setIsPlay', false);
      },
      sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    },
  }
</script>

<style lang="scss" scoped>
  .language-wrap {
    margin-left: vw_big_screen(32px);
    @include viewport(tabs) {
      display: none;
    }
    &.menu-language {
      @include viewport(tabs) {
        margin-left: 0;
        margin-top: auto;
        display: flex;
      }
    }
  }

  button {
    font-size: vw_big_screen(16px);
    padding: 0;
    @include viewport(tabs) {
      font-size: vw_tabs(20px);
    }
    @include viewport(swap_tabs) {
      font-size: vw_tabs(16px);
    }
  }

  .language-link {
    text-decoration: none;
    text-transform: uppercase;
    color: var(--secondary-color);
    transition: 0.3s ease;
    opacity: 0.5;
    position: relative;
    &:not(:first-child) {
      margin-left: vw_big_screen(16px);
      @include viewport(tabs) {
        margin-left: vw_tabs(16px);
      }
    }
    &:hover {
      @include viewport(hover) {
        opacity: 1;
      }
    }
    &::after {
      content: '';
      position: absolute;
      bottom: vw_big_screen(-4.5px);
      left: 50%;
      transform: translateX(-50%);
      width: vw_big_screen(4px);
      height: vw_big_screen(4px);
      background-color: var(--button-color);
      opacity: 0;
      @include viewport(tabs) {
        bottom: vw_tabs(-6px);
        width: vw_tabs(6px);
        height: vw_tabs(6px);
      }
    }
    &.active {
      opacity: 1;
      pointer-events: none;
      &::after {
        opacity: 1;
      }
    }
  }
</style>