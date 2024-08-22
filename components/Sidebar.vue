<template>
  <ul class="sidebar">
    <li
      v-for="item in sidebarItems"
      :key="item.key"
      class="sidebar-item mono-font"
      :class="{ 'active': activeItem === item.key }"
      @click="setActiveItem(item.key)"
      :ref="item.key"
      @mouseover="handleMouse(true)"
      @mouseleave="handleMouse(false)"
      v-html="$t(item.translationKey)"
    />
    <li class="sidebar-border" ref="sidebarBorder" :style="{transform: `translateY(${borderY}px)`}"></li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        borderY: 0,
        sidebarItems: [
          { key: 'home', translationKey: 'sidebarHome' },
          { key: 'about', translationKey: 'sidebarAbout' },
          { key: 'experience', translationKey: 'sidebarExperience' },
          { key: 'portfolio', translationKey: 'sidebarPortfolio' },
          // { key: 'clients', translationKey: 'sidebarClients' },
          { key: 'reviews', translationKey: 'sidebarReviews' },
          { key: 'contacts', translationKey: 'sidebarContacts' },
        ],
      };
    },
    methods: {
      setActiveItem(itemKey) {
        this.$store.commit('setActiveItem', itemKey);
      },
      calculateTranslateY() {
        const refName = this.$store.state.activeItem;
        const activeItemElement = this.$refs[refName];
        const sidebarBorderElement = this.$refs.sidebarBorder;
        if (activeItemElement && sidebarBorderElement) {
          const translateYValue = activeItemElement[0].offsetTop - sidebarBorderElement.offsetTop;
          this.borderY = translateYValue
        }
      },
      handleMouse(val) {
        this.$store.commit('setHover', val);
      }
    },
    computed: {
      activeItem() {
        return this.$store.state.activeItem;
      },
    },
    mounted() {
      this.calculateTranslateY()
    },
    watch: {
      '$store.state.activeItem'(newValue, oldValue) {
        this.calculateTranslateY();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .sidebar {
    position: absolute;
    top: 50%;
    left: vw_big_screen(34px);
    transform: translateY(-50%);
    list-style: none;
    padding-left: vw_big_screen(9px);
    user-select: none;
    z-index: 10;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: vw_big_screen(-1px);
      transform: translateY(-50%);
      background-color: var(--border-color);
      transition: 0.3s ease;
      width: vw_big_screen(1px);
      height: 100%;
    }
    &-item {
      font-size: vw_big_screen(12px);
      font-weight: 500;
      cursor: pointer;
      padding: vw_big_screen(18px) 0;
      transition: 0.3s ease;
      color: var(--sidebar-color);
      position: relative;
      @include viewport(hover) {
        &:hover {
          color: var(--secondary-color);
        }
      }
      &.active {
        color: var(--secondary-color);
      }
    }
    &-border {
      position: absolute;
      top: 0;
      left: vw_big_screen(-1.5px);
      width: vw_big_screen(2px);
      height: vw_big_screen(50px);
      background-color: var(--secondary-color);
      border-radius: vw_big_screen(2px);
      transition: 0.3s ease;
    }
  }
</style>
