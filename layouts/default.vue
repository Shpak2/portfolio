<template>
  <div>

    <Loader/>
    <Header v-if="!maskOn" />
    <Gradient v-if="!maskOn" />

    <main v-if="!maskOn">
      <Slider :isMobile="mobile" />
      <!-- <NuxtPage /> -->
    </main>
    <Sidebar v-if="!maskOn" :isMenu="false"/>
    <Footer v-if="!maskOn" />
    <Clicker v-if="!maskOn" />
    <div v-if="maskOn" class="mask"></div>
    <Popup v-if="!maskOn && showPopup" />
    <FormPopup
    v-if="!maskOn && showFormPopup"
      :error="isError"
      :message="messagePopup"
    />
    <MobileMenu
      v-if="!maskOn && menuActive"
      :hide="menuHide"
    />
    <Head>
      <Title>{{ $t('title') }}</Title>
      <Meta name="description" :content="$t('description')"/>
    </Head>
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
import Popup from '~/components/Popup.vue';
import FormPopup from '~/components/FormPopup.vue';
import MobileMenu from '~/components/MobileMenu.vue';


export default {
  components: {
    Header,
    Clicker,
    Footer,
    Sidebar,
    Slider,
    Gradient,
    Loader,
    Popup,
    FormPopup,
    MobileMenu
  },
  data() {
    return {
      maskOn: true,
      showPopup: false,
      showFormPopup: false,
      isError: false,
      menuActive: false,
      menuHide: false,
      messagePopup: '',
      mobile: false
    }
  },
  watch: {
    '$store.state.formPopup'(val) {
      this.FormPopup = val
    },
    '$store.state.popup.show'(val) {
      this.showPopup = val
    },
    '$store.state.formPopup'(val) {
      this.showFormPopup = val
    },
    '$store.state.hasError'(val) {
      this.isError = val
    },
    '$store.state.messagePopup'(val) {
      this.messagePopup = val
    },
    '$store.state.menuActive'(val) {
      this.handleMenu(val)
    },
  },
  mounted() {
    setTimeout(this.removeMask,1000)
    this.checkVH()
    this.checkMobile()
    window.addEventListener("resize", ()=>{
      this.checkVH()
      this.checkMobile()
    });
  },
  methods: {
    removeMask: function () {
      this.maskOn = false
    },
    handleMenu(value) {
      if (value) {
        this.menuActive = value
      }else {
        this.menuHide = !value
        setTimeout(() => {
          this.menuActive = value
          this.menuHide = value
        },300)
      }
    },
    checkVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    checkMobile() {
      let isMobile = window.matchMedia("(max-width: 1024px) and (max-height: 584px) and (orientation: landscape)").matches
        || window.matchMedia("(max-width: 584px) and (orientation: portrait)").matches;
        // console.log('isMobile',isMobile)
        // this.$store.commit('setIsMobile', isMobile);
        this.mobile = isMobile
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
    background-color: var(--primary-color);
  }
</style>
