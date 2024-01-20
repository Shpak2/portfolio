<template>
  <div class="language-wrap">
    <NuxtLink class="language-link" :class="{ 'active': $route.path === '/' }" to="/" @click="changeLanguage('en')">EN</NuxtLink>
    <NuxtLink class="language-link" :class="{ 'active': $route.path === '/uk' }" to="/uk" @click="changeLanguage('uk')">UA</NuxtLink>
    <NuxtLink class="language-link" :class="{ 'active': $route.path === '/pl' }" to="/pl" @click="changeLanguage('pl')">PL</NuxtLink>
  </div>
</template>

<script>
  import { useStore } from 'vuex';

  export default {
    beforeMount() {
      // const store = useStore();
      // console.log(console.log(localStorage.darkMode))
      // this.$store = store;
    },
    methods: {
      changeLanguage: function() {

      }
      // toggleTheme: function() {
      //   this.$store.commit('theme/toggleDarkMode');
      //   localStorage.setItem('darkMode', this.$store.state.theme.darkMode);
      //   const htmlElement = document.documentElement;
      //   htmlElement.setAttribute('data-theme', this.$store.state.theme.darkMode ? 'dark' : 'light');
      // },
    },
  }
</script>

<style lang="scss" scoped>
  .language-wrap {
    margin-left: vw_big_screen(32px);
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