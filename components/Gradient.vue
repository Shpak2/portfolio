<template>
  <div class="site-background full-height">
    <div class="gradient-item"
      :style="{transform: position[0], width: size, height: size, overflow: loaded ? 'hidden' : ''}">
        <div class="gradient-block gradient-block-1 gradient-orange"></div>
        <div class="gradient-block gradient-block-2 gradient-orange"></div>
    </div>
    <div class="gradient-item"
      :style="{transform: position[1], width: size, height: size, overflow: loaded ? 'hidden' : ''}">
        <div class="gradient-block gradient-block-1 gradient-blue"></div>
        <div class="gradient-block gradient-block-2 gradient-blue"></div>
    </div>
    <div class="gradient-item"
      :style="{transform: position[2], width: size, height: size, overflow: loaded ? 'hidden' : ''}">
        <div class="gradient-block gradient-block-1 gradient-purple"></div>
        <div class="gradient-block gradient-block-2 gradient-purple"></div>
    </div>
    <div class="gradient-item"
      :style="{transform: position[3], width: size, height: size, overflow: loaded ? 'hidden' : ''}">
        <div class="gradient-block gradient-block-1 gradient-green"></div>
        <div class="gradient-block gradient-block-2 gradient-green"></div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        position: [
          'translate(-100%,-100%)',
          'translate(0%,-100%)',
          'translate(-100%,0%)',
          'translate(0%,0%)'
        ],
        size: 0,
        loaded: false
      };
    },
    watch: {
      '$store.state.activeItem'() {
        this.setPosiotion()
      },
    },
    mounted() {
      this.size = `${screen.height}px`;
      setTimeout(()=>{
        this.loaded = true
      },1000)
    },
    methods: {
      setPosiotion: function() {
        const shuffledArray = this.position.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        this.position = shuffledArray;
      }

    },
  }
</script>

<style lang="scss" scoped>
  .site-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .gradient-item {
    position: absolute;
    display: grid;
    top: 50%;
    left: 50%;
    transition: cubic-bezier(0.15, 0.63, 0.57, 1) 0.3s;
    border-radius: 50%;
    // overflow: hidden;
    filter: blur(100px);
    backdrop-filter: blur(100px);
    opacity: 0.1;
    & div {
      grid-column: 1;
      grid-row: 1;
    }
  }

  @keyframes animateBg {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 33%; }
  }

  .gradient-block-1 {
    background: linear-gradient(70deg, rgba(10, 3, 15, 1) 0%, rgb(64, 69, 149) 25%, rgba(10, 3, 15, 1) 50%, rgb(64, 69, 149) 75%, rgba(10, 3, 15, 1) 100%);
    z-index: 0;
    animation: animateBg 4s linear infinite;
    background-size: 300% 200%;
    &.gradient-orange {
      background: linear-gradient(70deg, rgba(10, 3, 15, 1) 0%, rgba(251, 41, 12, 1) 25%, rgba(10, 3, 15, 1) 50%, rgba(251, 41, 12, 1) 75%, rgba(10, 3, 15, 1) 100%);
      background-size: 300% 200%;
    }
    &.gradient-blue {
      background: linear-gradient(70deg, rgba(10, 3, 15, 1) 0%, rgba(12, 151, 251, 1) 25%, rgba(10, 3, 15, 1) 50%, rgba(12, 151, 251, 1) 75%, rgba(10, 3, 15, 1) 100%);
      background-size: 300% 200%;
    }
    &.gradient-purple {
      background: linear-gradient(70deg, rgba(10, 3, 15, 1) 0%, rgba(134, 12, 251, 1) 25%, rgba(10, 3, 15, 1) 50%, rgba(134, 12, 251, 1) 75%, rgba(10, 3, 15, 1) 100%);
      background-size: 300% 200%;
    }
    &.gradient-green {
      background: linear-gradient(70deg, rgba(10, 3, 15, 1) 0%, rgba(146, 251, 12, 1) 25%, rgba(10, 3, 15, 1) 50%, rgba(146, 251, 12, 1) 75%, rgba(10, 3, 15, 1) 100%);
      background-size: 300% 200%;
    }
  }

  .gradient-block-2 {
    background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgb(207, 204, 205) 55%, rgb(70, 9, 144) 100%);
    mix-blend-mode: color-dodge;
    &.gradient-orange {
      background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgb(207, 204, 205) 55%, rgb(183, 29, 9) 100%);
    }
    &.gradient-blue {
      background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgb(207, 204, 205) 55%, rgb(4, 125, 211) 100%);
    }
    &.gradient-purple {
      background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgb(207, 204, 205) 55%, rgb(131, 1, 253) 100%);
    }
    &.gradient-green {
      background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgb(207, 204, 205) 55%, rgb(114, 202, 0) 100%);
    }
  }
</style>