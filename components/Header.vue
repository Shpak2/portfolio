<template>
  <header class="header flex items-center">
    <div class="container flex items-center m-auto">
      <Logo />
      <ContactButton />
      <ThemeToggle />
      <LanguageSelector />
      <ToggleButton />
    </div>
  </header>
</template>


<script>
  import Logo from '~/components/Header/Logo.vue';
  import ContactButton from '~/components/Header/ContactButton.vue';
  import ThemeToggle from '~/components/Header/ThemeToggle.vue';
  import LanguageSelector from '~/components/Header/LanguageSelector.vue';
  import ToggleButton from '~/components/Header/ToggleButton.vue';

  export default {
    components: {
      Logo,
      ThemeToggle,
      ContactButton,
      LanguageSelector,
      ToggleButton
    }
  };

</script>

<style lang="scss" scoped>
  .header {
    background-color: var(--header-color);
    height: vw_big_screen(80px);
    border-bottom: vw_big_screen(1px) solid var(--border-color);
    transition: 0.3s ease;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    @include viewport(tabs) {
      height: vw_tabs(80px);
      border-bottom-width: 1px;
    }
    @include viewport(mobile) {
      height: vmin_mobile(80px);
    }
  }
</style>