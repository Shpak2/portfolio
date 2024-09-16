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
    @include viewport(tabs) {
      font-size: vw_tabs(12px);
    }
    @include viewport(sm_mobile) {
      font-size: vmin_mobile(12px);
    }
    & span {
      color: var(--code-color);
    }
    &__html {
      transform: translateX(-50%);
      position: absolute;
      width: vw_big_screen(1076px);
      left: calc(vw_big_screen(-20px) + 50%);
      @include viewport(tabs) {
        width: vw_tabs(696px);
        left: calc(vw_tabs(-16px) + 50%);
      }
      &:first-child {
        top: vh_big_screen(114px);
        @include viewport(tabs) {
          top: vw_tabs(104px);
        }
        @include viewport(sm_mobile) {
          top: vmin_mobile(104px);
        }
      }
      &:last-child {
        bottom: vh_big_screen(24px);
        @include viewport(tabs) {
          bottom: vw_tabs(24px);
        }
        @include viewport(sm_mobile) {
          bottom: vmin_mobile(24px);
        }
      }
    }
    &__body {
      position: absolute;
      width: vw_big_screen(1076px);
      left: 50%;
      transform: translateX(-50%);
      @include viewport(tabs) {
        width: vw_tabs(696px);
      }
      &-open {
        top: vh_big_screen(144px);
        @include viewport(tabs) {
          top: vw_tabs(134px);
        }
        @include viewport(sm_mobile) {
          top: vmin_mobile(134px);
        }
      }
      &-close {
        bottom: vh_big_screen(54px);
        @include viewport(tabs) {
          bottom: vw_tabs(54px);
        }
        @include viewport(sm_mobile) {
          bottom: vmin_mobile(54px);
        }
      }
    }
    &__title {
      &:nth-child(even) {
        margin-bottom: vh_big_screen(48px);
        @include viewport(tabs) {
          margin-bottom: vw_tabs(32px);
        }
        @include viewport(swap_tabs) {
          margin-bottom: vw_tabs(8px);
        }
        @include viewport(sm_mobile) {
          margin-bottom: vmin_mobile(8px);
        }
      }
    }
  }
</style>
