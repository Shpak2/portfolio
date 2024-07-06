<template>
  <div>
    <Header />
    <Gradient />

    <main>
      <Slider />
      <!-- <NuxtPage /> -->
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
import Slider from '~/components/Slider.vue';
import Gradient from '~/components/Gradient.vue';


export default {
  components: {
    Header,
    Clicker,
    Footer,
    Sidebar,
    Slider,
    Gradient
  }
};
</script>

<style lang="scss" scoped>
  .main-wrap {
    position: relative;
  }
</style>
