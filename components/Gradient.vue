<template>
  <div class="site-background full-height">
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
        size: 0,
      };
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
    & svg {
      position: absolute;
      inset: 0;
      margin: auto;
      width: auto;
      height: 100%;
      opacity: 0.5;
    }
  }
</style>