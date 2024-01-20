<template>
  <div>
    <Header />
    <main>
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

export default {
  components: {
    Header,
    Clicker,
    Footer,
    Sidebar
  }
};
</script>
