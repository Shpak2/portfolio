<template>
  <div class="svg-icon flex items-center justify-center">
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#0_1_2)">
    <path d="M134.167 70C134.167 87.0181 127.406 103.339 115.373 115.373C103.339 127.406 87.0181 134.167 70 134.167C52.9819 134.167 36.6609 127.406 24.6273 115.373C12.5937 103.339 5.83333 87.0181 5.83333 70C5.82839 65.0897 6.39611 60.1955 7.525 55.4167C10.8265 41.3248 18.7951 28.763 30.1367 19.7715C41.4783 10.7799 55.5266 5.88679 70 5.88679C84.4734 5.88679 98.5217 10.7799 109.863 19.7715C121.205 28.763 129.174 41.3248 132.475 55.4167C133.604 60.1955 134.172 65.0897 134.167 70Z" :fill="hasError ? '#E82626' : '#6D14C4'"/>
    <path d="M70 105C104.504 105 132.475 82.8008 132.475 55.4167C132.475 28.0325 104.504 5.83334 70 5.83334C35.496 5.83334 7.52499 28.0325 7.52499 55.4167C7.52499 82.8008 35.496 105 70 105Z" :fill="hasError ? '#FF5959' : '#860CFB'"/>
    <path d="M70 0C56.1553 0 42.6216 4.10543 31.1101 11.7971C19.5987 19.4888 10.6266 30.4213 5.32846 43.2122C0.03033 56.003 -1.3559 70.0776 1.34506 83.6563C4.04603 97.235 10.7129 109.708 20.5026 119.497C30.2922 129.287 42.765 135.954 56.3437 138.655C69.9224 141.356 83.997 139.97 96.7879 134.672C109.579 129.373 120.511 120.401 128.203 108.89C135.895 97.3785 140 83.8447 140 70C139.98 51.441 132.599 33.6479 119.475 20.5247C106.352 7.4015 88.559 0.020073 70 0ZM70 128.333C58.4628 128.333 47.1846 124.912 37.5918 118.502C27.9989 112.093 20.5222 102.982 16.1071 92.3232C11.6919 81.6642 10.5368 69.9353 12.7876 58.6197C15.0384 47.3042 20.5941 36.9102 28.7521 28.7521C36.9102 20.594 47.3042 15.0383 58.6198 12.7875C69.9353 10.5367 81.6642 11.6919 92.3232 16.107C102.982 20.5221 112.093 27.9989 118.502 37.5917C124.912 47.1846 128.333 58.4628 128.333 70C128.316 85.4657 122.165 100.293 111.229 111.229C100.293 122.165 85.4658 128.316 70 128.333Z" fill="var(--secondary-color)"/>
    <path id="sended" v-if="!hasError" d="M95.0425 48.3758L58.3333 85.085L44.9575 71.7092C43.8573 70.6466 42.3838 70.0586 40.8543 70.0719C39.3248 70.0852 37.8618 70.6987 36.7802 71.7802C35.6987 72.8618 35.0852 74.3248 35.0719 75.8543C35.0586 77.3838 35.6466 78.8573 36.7092 79.9575L54.2092 97.4575C55.3031 98.5511 56.7865 99.1654 58.3333 99.1654C59.8801 99.1654 61.3636 98.5511 62.4575 97.4575L103.291 56.6242C104.353 55.524 104.941 54.0505 104.928 52.521C104.915 50.9915 104.301 49.5284 103.22 48.4469C102.138 47.3653 100.675 46.7519 99.1457 46.7386C97.6162 46.7253 96.1427 47.3132 95.0425 48.3758Z" fill="white"/>
    <path id="stop" v-if="hasError" d="M40 70H100" stroke="white" stroke-width="16" stroke-linecap="round"/>
    </g>
    <defs>
    <clipPath id="0_1_2">
    <rect width="140" height="140" fill="white"/>
    </clipPath>
    </defs>
    </svg>

  </div>
</template>

<script>
  export default {
    props: {
      hasError: false,
    }
  }

</script>

<style lang="scss" scoped>
  div {
    width: vw_big_screen(140px);
    @include viewport(tabs) {
      width: vw_tabs(140px);
    }
    @include viewport(mobile) {
      width: vmin_mobile(140px);
    }
    @include viewport(swap_mobile) {
      width: vmin_mobile(100px);
    }
  }
  svg {
    transition: 0.2s ease-in;
  }

  #stop {
    animation: shake 0.3s ease-in 2 0.2s;
    transform-origin: center;
  }
  #sended {
    opacity: 0;
    transform: rotate(45deg) scale(0.4);
    animation: show 0.3s ease-in-out forwards 0.2s;
    transform-origin: center;
  }

  @keyframes show {
    0% {
      opacity: 0;
      transform: rotate(45deg) scale(0.4);
    }
    40% {
      transform: scale(1);
      transform: rotate(-20deg) scale(0.8);
    }
    60% {
      transform: rotate(15deg) scale(1);
      opacity: 1;
    }
    80% {
      transform: rotate(-10deg) scale(1);
    }
    90% {
      transform: rotate(5deg) scale(1);
    }
    100% {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0) rotate(0);
    }
    20%,60% {
      transform: translateX(3%) rotate(-3deg);
    }
    40%,80% {
      transform: translateX(-3%) rotate(3deg);
    }
  }
</style>
