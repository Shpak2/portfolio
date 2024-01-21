<template>
  <div>
    <Header />
    <main>
      <SplideSlider />
      <NuxtPage />
    </main>
    <Sidebar />
    <Footer />
    <Clicker />
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Clicker from '~/components/Clicker.vue';
import Footer from '~/components/Footer.vue';
import Sidebar from '~/components/Sidebar.vue';
import SplideSlider from '~/components/SplideSlider.vue';

export default {
  components: {
    Header,
    Clicker,
    Footer,
    Sidebar,
    SplideSlider
  }
};
</script>

<style lang="scss" scoped>
  .main-wrap {
    position: relative;
  }
</style>
