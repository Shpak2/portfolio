<template>
  <div>

    <Loader/>
    <Header v-if="!maskOn" />
    <Gradient v-if="!maskOn" />

    <main v-if="!maskOn">
      <Slider />
      <!-- <NuxtPage /> -->
    </main>
    <Sidebar v-if="!maskOn" />
    <Footer v-if="!maskOn" />
    <Clicker v-if="!maskOn" />
    <div v-if="maskOn" class="mask"></div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Clicker from '~/components/Clicker.vue';
import Footer from '~/components/Footer.vue';
import Sidebar from '~/components/Sidebar.vue';
import Slider from '~/components/Slider.vue';
import Gradient from '~/components/Gradient.vue';
import Loader from '~/components/Loader.vue';


export default {
  components: {
    Header,
    Clicker,
    Footer,
    Sidebar,
    Slider,
    Gradient,
    Loader
  },
  data() {
    return {
      maskOn: true,
    }
  },
  mounted() {
    setTimeout(this.removeMask,1000)
  },
  methods: {
    removeMask: function () {
      this.maskOn = false
    }
  }
};

</script>

<style lang="scss" scoped>
  .main-wrap {
    position: relative;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background-color: var(--primary-color)
  }
</style>
