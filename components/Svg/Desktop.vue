<template>
  <div class="svg-icon flex items-center justify-center">
    <svg width="40" height="34" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37.5 0.333252H2.5C1.12167 0.333252 0 1.45492 0 2.83325V26.1666C0 27.5449 1.12167 28.6666 2.5 28.6666H16.6667V30.4616L7.36333 32.0116C6.91 32.0866 6.60333 32.5166 6.67833 32.9699C6.74667 33.3783 7.1 33.6666 7.5 33.6666C7.545 33.6666 7.59 33.6632 7.63667 33.6549L17.5667 31.9999H22.4317L32.3617 33.6549C32.4083 33.6632 32.455 33.6666 32.5 33.6666C32.9017 33.6666 33.255 33.3783 33.32 32.9699C33.3967 32.5166 33.0883 32.0866 32.635 32.0116L23.3333 30.4616V28.6666H37.5C38.8783 28.6666 40 27.5449 40 26.1666V2.83325C40 1.45492 38.8783 0.333252 37.5 0.333252ZM21.6667 30.3333H18.3333V28.6666H21.6667V30.3333ZM38.3333 26.1666C38.3333 26.6266 37.96 26.9999 37.5 26.9999H2.5C2.04 26.9999 1.66667 26.6266 1.66667 26.1666V2.83325C1.66667 2.37325 2.04 1.99992 2.5 1.99992H37.5C37.96 1.99992 38.3333 2.37325 38.3333 2.83325V26.1666Z" :fill="color"/>
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
    width: vw_big_screen(32px);
    @include viewport(tabs) {
      width: vw_tabs(32px);
    }
    @include viewport(swap_tabs) {
      width: vw_tabs(20px);
    }
    @include viewport(sm_mobile) {
      width: vmin_mobile(32px);
    }
  }
  svg {
    transition: 0.2s ease-in;
  }
</style>
