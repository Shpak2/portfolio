<template>
  <div class="flex items-center justify-center">
    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="bgCarrier" stroke-width="0"></g>
      <g id="tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.528"></g>
      <g id="iconCarrier">
        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
  div {
    background-color: var(--button-color);
    width: vw_big_screen(32px);
    height: 100%;
  }
  svg {
    width: vw_big_screen(20px);
  }
</style>
