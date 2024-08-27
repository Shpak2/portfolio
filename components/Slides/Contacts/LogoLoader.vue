<template>
  <div class="flex items-center justify-center" ref="animationContainer"></div>
</template>

<script>
import lottie from 'lottie-web'
import logoJson from '~/store/logo.json'

export default {
  data() {
    return {
      animationDirection: 1,
      animationInstance: null
    }
  },
  mounted() {
    this.animationInstance = lottie.loadAnimation({
      container: this.$refs.animationContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      speed: 0.7,
      width: '35%',
      animationData: logoJson
    })

    this.animationInstance.addEventListener('complete', this.handleComplete)
  },
  methods: {
    handleComplete() {
      if (this.animationInstance) {
        this.animationDirection *= -1
        this.animationInstance.setDirection(this.animationDirection)

        const duration = this.animationInstance.getDuration(true)
        this.animationInstance.goToAndStop(this.animationDirection === 1 ? 0 : duration, true)
        if (this.animationDirection !== 1) {
          this.animationInstance.play()
        }else {
          setTimeout(()=>{
            this.animationInstance.play()
          },500)
        }
      }
    },
    checkWidth() {
      return screen.width <= 1440 ? true : false
    }
  }
}
</script>

<style scoped>
  div {
    font-size: 12px;
    width: 20%;
  }
</style>
