<template>
  <div>
    <p class="tag-item" :class="className">&lt;<span ref="codeOpen">{{ content }}</span>&gt;</p>
      <slot></slot>
    <p class="tag-item" :class="className">&lt;/<span ref="codeClose">{{ content }}</span>&gt;</p>
  </div>
</template>

<script>
  import baffle from 'baffle';

  export default {
    data() {
      return {
        baffleText: undefined
      }
    },
    props: {
      content: String,
      className: String
    },
    methods: {
      animateCode() {
        this.baffleText = baffle([this.$refs.codeOpen, this.$refs.codeClose], {
            characters: 'uiopaqwertysdfghjklzxcvbnm',
            speed: 100
        })
        this.baffleText.start().reveal(4000);
      }
    },
    watch: {
      '$store.state.activeItem'(newValue, oldValue) {
        setTimeout(() => {
          this.baffleText.reveal(4000)
        }, 200);
      },
    },
    mounted() {
      this.animateCode()
    },
  };
</script>

<style lang="scss" scoped>
  .tag-item {
    font-family: "SF Mono";
    font-size: vw_big_screen(12px);
    font-weight: 400;
    margin: 0;
    color: var(--sidebar-color);
    transition: color 0.3s ease;
    & span {
      color: var(--code-color);
    }
    &__html {
      left: vw_big_screen(-20px);
      position: relative;
      &:first-child {
        margin-bottom: vh_big_screen(16px);
      }
      &:last-child {
        margin-top: vh_big_screen(16px);
      }
    }
    &__content {
      &:first-child {
        margin-top: vh_big_screen(48px);
      }
    }
    &__btn {
      &:first-child {
        margin-top: vh_big_screen(32px);
      }
      // &:last-child {
      //   margin-bottom: vw_big_screen(32px);
      // }
    }
  }
</style>
