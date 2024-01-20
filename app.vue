<template>
  <NuxtLayout>
    <div>

      <h4>hello world</h4>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useStore } from 'vuex';

  const checkDarkMode = () => {
    const store = useStore();
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode !== null) {
      store.commit('theme/loadDarkMode');
    }
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', store.state.theme.darkMode ? 'dark' : 'light');
  };

  onMounted(() => {
    // checkDarkMode();
    checkDarkMode()
    // setBodyClass();
  });
</script>


<style lang="scss">
  h4 {
    font-size: vw_big_screen(60px);
    color: $danger-color;
    @include viewport(tabs) {
      font-size: 20px;
    }
  }
</style>