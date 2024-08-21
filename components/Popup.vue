<template>
  <div class="popup-wrap flex items-center justify-center">
    <div class="popup-inner rounded">
      <div class="popup-header mono-font flex items-center">
        <h4 :style="{transform: !handleTitle ? 'scale(1,0)' : ''}">{{(project + 1).toString().padStart(2, '0')}}. {{ data[project].name }}</h4>
        <div class="popup-header-nav flex items-center">
          <div class="popup-header-list">
            <span>Projects:</span>
            <button
              v-for="(item, index) in data"
              @click="changeActive(index)"
              :key="index"
              :class="index === project ? 'active' : ''"
              >
                {{(index + 1).toString().padStart(2, '0')}}
              </button>
          </div>
          <div class="popup-header-arrows flex items-center">
            <button
              class="flex items-center"
              @click="handleArrows(false)"
              :style="{
                opacity: project === 0 ? '0.25' : '',
                pointerEvents: project === 0 ? 'none' : ''
                }"
              >
              <svg width="40" height="21" viewBox="0 0 40 21" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: scale(-1,1);">
                <path d="M1 10.5H39M39 10.5L29.5 1M39 10.5L29.5 20" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              class="flex items-center"
              @click="handleArrows(true)"
              :style="{
                opacity: project === data.length-1 ? '0.25' : '',
                pointerEvents: project === data.length-1 ? 'none' : ''
                }"
              >
              <svg width="40" height="21" viewBox="0 0 40 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 10.5H39M39 10.5L29.5 1M39 10.5L29.5 20" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <button class="btn-close flex items-center justify-center" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.39339 1.39355L22.6066 22.6068" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round"/>
            <path d="M22.6066 1.39355L1.39339 22.6068" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="flex popup-main-inner">
        <div
          class="popup-main"
          :class="[
              mode === 'desktop' ? 'emulate-desktop' : '',
              mode === 'tablet' ? 'emulate-tablet' : '',
              mode === 'mobile' ? 'emulate-mobile' : ''
            ]"
          >
          <div class="popup-main-emulate"
            :style="{
              transform: !handleDisplay ? 'translateX(-50%) scale(1,0)' : 'translateX(-50%) scale(1)'
              }"
            >
            <img class="flex" :src="data[project].img[mode]" :alt="data[project].name">
          </div>
          <IconDesktop v-if="mode === 'desktop'"/>
          <IconTablet v-if="mode === 'tablet'"/>
          <IconMobile v-if="mode === 'mobile'"/>
        </div>
        <div class="popup-aside">
          <div class="popup-aside-buttons flex items-center">
            <button
              @click="handleEmulate('desktop')"
              v-if="data[project].img.desktop"
              :class="mode === 'desktop' ? 'active' : ''"
              class="icon-desktop rounded flex items-center justify-center"
              >
              <IconDesktop/>
            </button>
            <button
              @click="handleEmulate('tablet')"
              v-if="data[project].img.tablet"
              :class="mode === 'tablet' ? 'active' : ''"
              class="icon-tablet rounded flex items-center justify-center"
              >
              <IconTablet/>
            </button>
            <button
              @click="handleEmulate('mobile')"
              v-if="data[project].img.mobile"
              :class="mode === 'mobile' ? 'active' : ''"
              class="icon-mobile rounded flex items-center justify-center"
              >
              <IconMobile/>
            </button>
          </div>
          <div class="popup-aside-tags rounded flex items-center"  @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <IconTool />
            <div class="flex tags mono-font items-center">
              <span ref="tagsText">{{ data[project].tools.join(', ') }}</span>
            </div>
          </div>
          <div class="popup-aside-content" v-html="data[project].description[$i18n.locale]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { data } from '~/data/projects'

  import IconTool from '~/components/Svg/Tool.vue';
  import IconDesktop from '~/components/Svg/Desktop.vue';
  import IconTablet from '~/components/Svg/Tablet.vue';
  import IconMobile from '~/components/Svg/Mobile.vue';

  export default {
    data() {
      return {
        data,
        project: this.$store.state.popup.project,
        mode: this.$store.state.popup.mode,
        handleTitle: true,
        handleDisplay: true
      }
    },
    components: {
      IconTool,
      IconDesktop,
      IconTablet,
      IconMobile
    },
    // props: {
    //   project: ,
    //   mode: $store.state.popup.mode
    // },
    mounted() {

    },
    beforeMount() {
      const store = useStore();
      this.$store = store;
    },
    methods: {
      handleMouseEnter() {
      this.adjustTextOverflow(true);
    },
    handleMouseLeave() {
      this.adjustTextOverflow(false);
    },
    adjustTextOverflow(isHover) {
      this.$nextTick(() => {
        const tagsContainer = this.$el.querySelector('.tags');
        const tagsText = this.$refs.tagsText;

        if (tagsText && tagsContainer) {
          const textWidth = tagsText.scrollWidth;
          const containerWidth = tagsContainer.clientWidth - 24;

          if (textWidth > containerWidth) {
            if (isHover) {
              const overflowWidth = textWidth - containerWidth;
              const transformValue = -overflowWidth;

              const maxTransitionDuration = 1.5;
              const percentage = Math.min(1, overflowWidth / containerWidth);
              const duration = 1+percentage * maxTransitionDuration;

              tagsText.style.transition = `transform ${duration}s linear`;
              tagsText.style.transform = `translateX(${transformValue}px)`;
            } else {
              tagsText.style.transition = `transform 0.4s linear`;
              tagsText.style.transform = 'translateX(0)';
            }
          } else {
            tagsText.style.transform = 'translateX(0)';
          }
        }
      });
    },
      closePopup() {
        this.$store.commit('popup/setShowPopup', false);
      },
      changeActive(val) {
        this.handleTitle = false
        this.handleDisplay = false
        setTimeout(()=>{
          this.project = val
          this.mode = 'desktop'
          this.handleTitle = true
        },200)
        setTimeout(()=>{
          this.handleDisplay = true
        },300)
      },
      handleArrows(plus) {
        this.handleTitle = false
        this.handleDisplay = false
        setTimeout(()=>{
          this.mode = 'desktop'
          plus ? this.project++ : this.project--
          this.handleTitle = true
        },200)
        setTimeout(()=>{
          this.handleDisplay = true
        },300)
      },
      handleEmulate(val) {
        this.mode = val
      }
    },
  }
</script>

<style lang="scss" scoped>
  .popup-wrap {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 101;
    background: rgba(20, 18, 22, 0.6);
    backdrop-filter: blur(5px);
  }

  .popup {
    &-inner {
      width: vw_big_screen(1100px);
      height: 80%;
      background-color: var(--primary-color);
      overflow: hidden;
    }
    &-header {
      width: 100%;
      height: vw_big_screen(60px);
      border-bottom: 1px solid var(--border-color);
      font-weight: 500;
      padding: 0 vw_big_screen(24px);
      background-color: var(--primary-color);
      &-list {
        color: var(--footer-color);
        margin-right: vw_big_screen(30px);
        & button {
          color: var(--footer-color);
          position: relative;
          &::after {
            content: '';
            position: absolute;
            bottom: vw_big_screen(-4.5px);
            left: 50%;
            transform: translateX(-50%);
            width: vw_big_screen(4px);
            height: vw_big_screen(4px);
            background-color: var(--button-color);
            opacity: 0;
          }
          &.active {
            color: var(--secondary-color);
            pointer-events: none;
            &::after {
              opacity: 1;
            }
          }
        }
      }
      &-arrows {
        margin-right: vw_big_screen(80px);
        & button {
          width: vw_big_screen(38px);
        }
      }
    }
    &-main {
      position: relative;
      width: 65%;
      &-inner {
        height: calc((100% - vw_big_screen(60px)) - 1px);
      }
      &-emulate {
        position: absolute;
        left: 50%;
        transform: translateX(-50%) scale(1);
        transition: transform 0.2s cubic-bezier(0.22, -0.01, 0.01, 1.02);
        overflow: scroll;
        transform-origin: center bottom;
        background-color: var(--emulate-color);
      }
      &.emulate-desktop .popup-main-emulate {
        top: vw_big_screen(45px);
        width: vw_big_screen(534px);
        height: vw_big_screen(366px);
      }
      &.emulate-tablet .popup-main-emulate {
        top: vw_big_screen(36px);
        width: vw_big_screen(322px);
        height: vw_big_screen(384px);
        border-bottom: 2px solid var(--emulate-color);
      }
      &.emulate-mobile .popup-main-emulate {
        top: vw_big_screen(85px);
        width: vw_big_screen(230px);
        height: vw_big_screen(326px);
        border-top: 2px solid var(--emulate-color);
        border-bottom: 2px solid var(--emulate-color);
      }
    }
    &-aside {
      height: 100%;
      width: 35%;
      background-color: var(--popup-color);
      padding: vw_big_screen(16px) vw_big_screen(24px);
      &-buttons {
        gap: vw_big_screen(12px);
        margin-bottom: vw_big_screen(12px);
        & button {
          width: vw_big_screen(48px);
          height: vw_big_screen(48px);
          background-color: #fff;
          padding: 0;
        }
      }
      &-tags {
        overflow: hidden;
        font-weight: 500;
        width: vw_big_screen(32px);
        height: vw_big_screen(32px);
        width: fit-content;
        & + div {
          & svg {
            width: vw_big_screen(20px);
          }
        }
        & .tags {
          padding: 0 vw_big_screen(12px);
          background-color: var(--shadow-slide);
          height: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          position: relative;
          max-width: vw_big_screen(220px);
          &::after {
            content: '...';
            position: absolute;
            right: 0;
            padding: 0 vw_big_screen(5px) 0 0;
            background-color: var(--shadow-slide);
            font-size: vw_big_screen(12px);
            letter-spacing: -0.36em;
          }
          & span {
            font-size: vw_big_screen(12px);
            display: inline-block;
          }
          &:hover::after {
            transition: opacity 0.1s ease-in-out;
            opacity: 0;
          }
        }
      }
    }
  }

  h4 {
    font-size: vw_big_screen(20px);
    margin-right: auto;
    transform-origin: center bottom;
    transition: transform 0.2s cubic-bezier(0.22, -0.01, 0.01, 1.02);
  }

  .btn-close {
    width: vw_big_screen(32px);
    height: vw_big_screen(32px);
  }
</style>