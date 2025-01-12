<template>
  <ul :class="isMenu ? 'mobile-sidebar' : 'sidebar'">
    <li
      v-for="item in sidebarItems"
      :key="item.key"
      class="sidebar-item mono-font"
      :class="{
        'active': activeItem === item.key
      }"
      @click="setActiveItem(item.key)"
      :ref="item.key"
      @mouseover="handleMouse(true)"
      @mouseleave="handleMouse(false)"
      v-html="$t(item.translationKey)"
    />
    <li v-if="!isMenu" class="sidebar-border" ref="sidebarBorder" :style="{transform: `translateY(${borderY}px)`}"></li>
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
    props: {
      isMenu: false
    },
    methods: {
      setActiveItem(itemKey) {
        this.$store.commit('setActiveItem', itemKey);
        if (this.isMenu) {
          this.$store.commit('setMenuActive', false);
          this.$store.commit('setMenuClick', true);
        }
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
    @include viewport(tabs) {
      display: none;
    }
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
      @include viewport(tabs) {
        content: none;
      }
    }
    &-item {
      font-size: vw_big_screen(12px);
      font-weight: 500;
      cursor: pointer;
      padding: vw_big_screen(18px) 0;
      transition: 0.3s ease;
      color: var(--sidebar-color);
      position: relative;
      @include viewport(tabs) {
        width: fit-content;
        text-align: center;
        padding: vw_tabs(12px) 0;
        font-size: vw_tabs(32px);
        transition: unset;
      }
      @include viewport(swap_tabs) {
        padding: vw_tabs(8px) 0;
        font-size: vw_tabs(24px);
      }
      @include viewport(sm_mobile) {
        padding: vmin_mobile(8px) 0;
        font-size: vmin_mobile(24px);
      }
      @include viewport(hover) {
        &:hover {
          color: var(--secondary-color);
        }
      }
      &.active {
        color: var(--secondary-color);
        &:after {
          @include viewport(tabs) {
            content: '';
          }
        }
      }
      &:after {
        position: absolute;
        left: 50%;
        bottom: vw_tabs(6px);
        transform: translateX(-50%);
        background-color: var(--secondary-color);
        width: 100%;
        height: 2px;
        border-radius: 8px;
        @include viewport(sm_mobile) {
          bottom: vmin_mobile(4px);
        }
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


  .mobile-sidebar {
    @include viewport(tabs) {
      list-style: none;
      padding: 0;
      margin: auto 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    @include viewport(swap_mobile) {
      padding-top: vmin_mobile(220px);
    }
  }
</style>
