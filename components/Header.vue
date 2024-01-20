<template>
  <header class="header flex items-center">
    <div class="container flex items-center m-auto">
      <Logo />
      <ContactButton />
      <ThemeToggle />
      <LanguageSelector />

    </div>
  </header>
</template>


<script>
  import Logo from '~/components/Header/Logo.vue';
  import ContactButton from '~/components/Header/ContactButton.vue';
  import ThemeToggle from '~/components/Header/ThemeToggle.vue';
  import LanguageSelector from '~/components/Header/LanguageSelector.vue';

  export default {
    components: {
      Logo,
      ThemeToggle,
      ContactButton,
      LanguageSelector
    }
  };

</script>

<style lang="scss" scoped>
  .header {
    background-color: var(--primary-color);
    height: vw_big_screen(80px);
    border-bottom: vw_big_screen(1px) solid var(--border-color);
    transition: 0.3s ease;
  }
</style>