<template>
    <p v-if="tag === 'open' || tag === 'wrap'" class="mono-font tag-item" :class="className">&lt;<span ref="decorOpen">{{ content }}</span>&gt;</p>
      <slot v-if="tag === 'wrap'"></slot>
    <p v-if="tag === 'close' || tag === 'wrap'" class="mono-font tag-item" :class="className">&lt;/<span ref="decorClose">{{ content }}</span>&gt;</p>
</template>

<script>
  import baffle from 'baffle';

  export default {
    data() {
      return {
        baffleText: undefined,
        animationDelay: 500
      }
    },
    props: {
      content: String,
      className: String,
      tag: String
    },
    methods: {
      animateCode(ref) {
        let baf = baffle(ref, {
          characters: 'uiopaqwertysdfghjklzxcvbnm',
          speed: 100
        });
        baf.start().text(text => this.content).reveal(4000,this.animationDelay);
      }
    },
    watch: {
      '$store.state.activeItem'(newValue, oldValue) {
        if (this.tag === 'open' || this.tag === 'wrap') {
          this.animateCode(this.$refs.decorOpen);
        }
        if (this.tag === 'close' || this.tag === 'wrap') {
          this.animateCode(this.$refs.decorClose)
        }
      },
    },
    mounted() {
      if (this.tag === 'open' || this.tag === 'wrap') {
        this.animateCode(this.$refs.decorOpen);
      }
      if (this.tag === 'close' || this.tag === 'wrap') {
        this.animateCode(this.$refs.decorClose);
      }
    },
  };
</script>

<style lang="scss" scoped>
  .tag-item {
    font-size: vw_big_screen(12px);
    font-weight: 400;
    margin: 0;
    color: var(--sidebar-color);
    transition: color 0.3s ease;
    & span {
      color: var(--code-color);
    }
    &__html {
      transform: translateX(-50%);
      position: absolute;
      width: vw_big_screen(1076px);
      left: calc(vw_big_screen(-20px) + 50%);
      &:first-child {
        top: vh_big_screen(114px);
      }
      &:last-child {
        bottom: vh_big_screen(24px);
      }
    }
    &__body {
      position: absolute;
      width: vw_big_screen(1076px);
      left: 50%;
      transform: translateX(-50%);
      &-open {
        top: vh_big_screen(144px);
      }
      &-close {
        bottom: vh_big_screen(54px);
      }
    }
    &__title {
      &:nth-child(even) {
        margin-bottom: vh_big_screen(48px);
      }
    }
  }
</style>
