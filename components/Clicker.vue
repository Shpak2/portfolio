<template>
  <div ref="clicker"></div>
</template>

<script>
  export default {
    mounted() {
      document.addEventListener('click', this.handleDocumentClick);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleDocumentClick);
    },
    methods: {
      handleDocumentClick(event) {
        if (!this.$refs.clicker) return;

        const x = event.clientX;
        const y = event.clientY;

        if (
          event.target.tagName.toLowerCase() === 'button' ||
          event.target.classList[0] === 'sidebar-item'
        ) {
          this.$refs.clicker.style.left = x - this.$refs.clicker.offsetWidth / 2 + 'px';
          this.$refs.clicker.style.top = y - this.$refs.clicker.offsetHeight / 2 + 'px';

          this.$refs.clicker.style.transform = 'scale(1)';
          this.$refs.clicker.style.opacity = '0.5';

          setTimeout(() => {
            if (this.$refs.clicker) {
              this.$refs.clicker.style.opacity = '0';
            }
          }, 100);

          setTimeout(() => {
            if (this.$refs.clicker) {
              this.$refs.clicker.style.transform = '';
            }
          }, 200);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  div {
    position: absolute;
    width: vw_big_screen(20px);
    height: vw_big_screen(20px);
    background: rgba(255,255,255,0.4);
    border: 2px solid #fff;
    border-radius: 50%;
    transform: scale(0);
    z-index: 1000;
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    pointer-events: none;
    @include viewport(tabs) {
      display: none;
    }
  }
</style>