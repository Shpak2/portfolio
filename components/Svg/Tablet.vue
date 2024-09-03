<template>
  <div class="svg-icon flex items-center justify-center">
    <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 34.1667C14.08 34.1667 13.3333 34.9133 13.3333 35.8333C13.3333 36.7533 14.08 37.5 15 37.5C15.92 37.5 16.6667 36.7533 16.6667 35.8333C16.6667 34.9133 15.92 34.1667 15 34.1667ZM25.8333 0H4.16667C1.87 0 0 1.87 0 4.16667V35.8333C0 38.13 1.87 40 4.16667 40H25.8333C28.13 40 30 38.13 30 35.8333V4.16667C30 1.87 28.13 0 25.8333 0ZM28.3333 35.8333C28.3333 37.2117 27.2117 38.3333 25.8333 38.3333H4.16667C2.78833 38.3333 1.66667 37.2117 1.66667 35.8333V4.16667C1.66667 2.78833 2.78833 1.66667 4.16667 1.66667H25.8333C27.2117 1.66667 28.3333 2.78833 28.3333 4.16667V35.8333Z" :fill="color"/>
    </svg>
  </div>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        default: '#860CFB',
      }
    }
  }

</script>

<style lang="scss" scoped>
  div {
    width: vw_big_screen(24px);
    @include viewport(tabs) {
      width: vw_tabs(24px);
    }
    @include viewport(swap_tabs) {
      width: vw_tabs(16px);
    }
  }
  svg {
    transition: 0.2s ease-in;
  }
</style>
