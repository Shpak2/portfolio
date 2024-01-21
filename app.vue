<template>
  <NuxtLayout />
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
    checkDarkMode()
    // setBodyClass();
  });
</script>


<style lang="scss">
</style>