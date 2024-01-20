<template>
  <div id="click-circle"></div>
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
        const x = event.clientX;
        const y = event.clientY;

        if (event.target.tagName.toLowerCase() === 'button') {
          const clickCircle = document.getElementById('click-circle');
          console.log(clickCircle.offsetWidth/2)
          clickCircle.style.left = x - (clickCircle.offsetWidth/2) + 'px';
          clickCircle.style.top = y - (clickCircle.offsetWidth/2) + 'px';

          clickCircle.style.transform = "scale(1)"
          clickCircle.style.opacity = "0.5"
          setTimeout(()=>{
            clickCircle.style.opacity = "0"
          },100)
          setTimeout(()=>{
            clickCircle.style.transform = ""
          },200)
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  #click-circle {
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
  }
</style>