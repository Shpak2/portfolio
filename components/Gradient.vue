<template>
  <div class="site-background full-height" :style="{transform: `translate(-50%,-50%) rotate(${rotateMobile}deg)`}">
    <svg
      width="1440"
      height="900"
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_4_3)">
        <circle
          :style="{transform: position[0]}"
          style="transition: 0.2s ease-in;"
          opacity="0.2"
          cx="270"
          cy="203"
          r="450"
          fill="url(#0_radial_4_3)"/>
        <circle
          :style="{transform: position[1]}"
          style="transition: 0.2s ease-in;"
          opacity="0.2"
          cx="270"
          cy="203"
          r="450"
          fill="url(#1_radial_4_3)"/>
        <circle
          :style="{transform: position[2]}"
          style="transition: 0.2s ease-in;"
          opacity="0.2"
          cx="270"
          cy="203"
          r="450"
          fill="url(#2_radial_4_3)"/>
        <circle
          :style="{transform: position[3]}"
          style="transition: 0.2s ease-in;"
          opacity="0.2"
          cx="270"
          cy="203"
          r="450"
          fill="url(#3_radial_4_3)"/>
      </g>
      <defs>
        <radialGradient id="0_radial_4_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(270 203) rotate(90) scale(450)">
          <stop stop-color="#500795" stop-opacity="0.9"/>
          <stop offset="1" stop-color="#500795" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="1_radial_4_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(270 203) rotate(90) scale(450)">
          <stop stop-color="#0C97FB" stop-opacity="0.9"/>
          <stop offset="1" stop-color="#0C97FB" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="2_radial_4_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(270 203) rotate(90) scale(450)">
          <stop stop-color="#92FB0C" stop-opacity="0.9"/>
          <stop offset="1" stop-color="#92FB0C" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="3_radial_4_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(270 203) rotate(90) scale(450)">
          <stop stop-color="#FB290C" stop-opacity="0.9"/>
          <stop offset="1" stop-color="#FB290C" stop-opacity="0"/>
        </radialGradient>
          <clipPath id="clip0_4_3">
            <rect width="1440" height="900" fill="white"/>
          </clipPath>
      </defs>
    </svg>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        position: [
          'translate(60%, -20%)',
          'translate(15%, 80%)',
          'translate(70%, 65%)',
          'translate(0%, 0%)'
        ],
        rotateMobile: 0,
        size: 0,
      };
    },
    props: {
      isMobile: false,
    },
    watch: {
      '$store.state.activeItem'() {
        this.setPosiotion()
      },
    },
    mounted() {
      // this.size = `${screen.height}px`;
      // setTimeout(()=>{
      //   this.loaded = true
      // },1000)
      // this.checkOrientation()
      if (this.isMobile) {
        window.addEventListener("scroll", () => {
          this.rotateMobile = window.pageYOffset % 360
          // this.position[0] = `translate(0%,${window.pageYOffset}px)`
          // this.position[1] = `translate(0%,${window.pageYOffset + (window.innerHeight/2)}px)`
          // this.position[2] = `translate(0%,${window.pageYOffset + (window.innerHeight/3)}px)`
          // this.position[3] = `translate(0%,${window.pageYOffset + (window.innerHeight/4)}px)`
        });
      }
    },
    methods: {
      setPosiotion: function() {
        const shuffledArray = this.position.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        this.position = shuffledArray;
      },
      // checkOrientation() {
      //   return window.innerHeight < window.innerWidth ? true : false
      // }
    },
  }
</script>

<style lang="scss" scoped>
  .site-background {
    width: 100%;
    height: 150%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    pointer-events: none;
    overflow: hidden;
    @include viewport(sm_mobile) {
      transform: translate(-50%,-50%) rotate(0deg);
      height: 100%;
      position: fixed;
      width: 200vh;
      overflow: unset;
    }
    & svg {
      position: absolute;
      inset: 0;
      margin: auto;
      width: auto;
      height: 100%;
      opacity: 0.5;
      @include viewport(sm_mobile) {
        opacity: 0.6;
        height: 200%;
      }
    }
  }
  circle {
    @include viewport(sm_mobile) {
      width: vmin_mobile(240px);
      height: vmin_mobile(240px);
    }
  }
</style>