<template>
  <div class="site-background full-height">
    <svg width="1440" height="900" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.2" filter="url(#circle-1)">
        <circle cx="233.5" cy="787.5" r="298.5" fill="#860CFB"/>
      </g>
      <g opacity="0.2" filter="url(#circle-2)">
        <circle cx="1046.5" cy="58.5" r="298.5" fill="#0C97FB"/>
      </g>
      <g opacity="0.2" filter="url(#circle-3)">
        <circle cx="1238" cy="804" r="299" fill="#92FB0C"/>
      </g>
      <g opacity="0.2" filter="url(#circle-4)">
        <circle cx="86" cy="34" r="299" fill="#FB290C"/>
      </g>
      <defs>
        <filter id="circle-1" x="-565" y="-11" width="1597" height="1597" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_2_2"/>
        </filter>
        <filter id="circle-2" x="248" y="-740" width="1597" height="1597" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_2_2"/>
        </filter>
        <filter id="circle-3" x="439" y="5" width="1598" height="1598" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_2_2"/>
        </filter>
        <filter id="circle-4" x="-713" y="-765" width="1598" height="1598" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_2_2"/>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
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
</style>