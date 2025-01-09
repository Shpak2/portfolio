<template>
  <div
    :class="{show: showPopup, hide: hidePopup}"
    class="popup-wrap flex items-center justify-center">
    <div class="popup-inner rounded">
      <div class="popup-header mono-font flex items-center">
        <h4 :style="{transform: !handleTitle ? 'scale(1,0)' : ''}">{{(project + 1).toString().padStart(2, '0')}}. {{ data[project].name }}</h4>
        <div class="popup-header-nav flex items-center">
          <div class="popup-header-list flex items-center">
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
                pointerEvents: project === 0 ? 'none' : '' || !handleTitle ? 'none' : ''
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
                pointerEvents: project === data.length-1 ? 'none' : '' || !handleTitle ? 'none' : ''
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
            ref="emulate"
            :style="{
              transform: !handleDisplay ? 'translateX(-50%) scale(1,0)' : 'translateX(-50%) scale(1)'
              }"
            >
            <img v-if="handleDisplay" class="flex" :src="data[project].img[mode]" :alt="data[project].name">
          </div>
          <IconDesktop v-if="mode === 'desktop'"/>
          <IconTablet v-if="mode === 'tablet'"/>
          <IconMobile v-if="mode === 'mobile'"/>
        </div>
        <div class="popup-aside" :class="{'handle-content': !handleDisplay}">
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
          <div class="popup-aside-tags rounded flex items-center" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <IconTool />
            <div class="flex tags mono-font items-center">
              <span ref="tagsText">{{ data[project].tools.join(', ') }}</span>
            </div>
          </div>
          <div
            class="popup-aside-content"
            v-html="data[project].description[$i18n.locale]"
            />
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
        handleDisplay: true,
        showPopup: true,
        hidePopup: false,
      }
    },
    components: {
      IconTool,
      IconDesktop,
      IconTablet,
      IconMobile
    },
    mounted() {
      console.log(this.data)
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
        this.hidePopup = true
        setTimeout(()=>{
          this.$store.commit('popup/setShowPopup', false);
          this.hidePopup = false
        },500)
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
        this.$refs.emulate.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
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
    opacity: 0;
    transition: 0.3s ease-in;
    transform: scale(2);
    @include viewport(sm_mobile) {
      position: fixed;
    }
    &.show {
      animation: show 0.2s ease-in-out forwards;
    }
    &.hide {
      opacity: 1;
      transform: scale(1);
      animation: hide 0.2s ease-in 0.2s forwards;
    }
  }

  .popup {
    &-inner {
      width: vw_big_screen(1100px);
      max-height: 95%;
      aspect-ratio: 16/9;
      background-color: var(--primary-color);
      overflow: hidden;
      transition: 0.3s ease-in;
      opacity: 0;
      transform: scale(2);
      @include viewport(tabs) {
        width: vw_tabs(696px);
        height: 90%;
        max-height: unset;
        aspect-ratio: unset;
      }
      @include viewport(swap_tabs) {
        height: 80%;
      }
      @include viewport(sm_mobile) {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
        border-radius: unset;
        width: 100%;
      }
      .popup-wrap.show & {
        animation: show 0.2s ease-in-out 0.2s forwards;
      }
      .popup-wrap.hide & {
        opacity: 1;
        transform: scale(1);
        animation: hide 0.2s ease-in forwards;
      }
    }
    &-header {
      width: 100%;
      height: vw_big_screen(60px);
      border-bottom: 1px solid var(--border-color);
      font-weight: 500;
      padding: 0 vw_big_screen(24px);
      background-color: var(--primary-color);
      @include viewport(tabs) {
        height: vw_tabs(80px);
        padding: 0 vw_tabs(24px);
        position: relative;
      }
      @include viewport(swap_tabs) {
        height: vw_tabs(52px);
        padding: 0 vw_tabs(16px);
      }
      @include viewport(sm_mobile) {
        height: vmin_mobile(60px);
        padding: 0 vmin_mobile(12px);
      }
      &-nav {
        @include viewport(tabs) {
          position: absolute;
          width: 100%;
          top: calc(100% + vw_tabs(24px));
        }
        @include viewport(swap_tabs) {
          position: unset;
          width: unset;
          top: unset;
        }
        @include viewport(sm_mobile) {
          top: calc(100% + vmin_mobile(16px));
        }
      }
      &-list {
        color: var(--footer-color);
        margin-right: vw_big_screen(30px);
        @include viewport(tabs) {
          margin-right: auto;
        }
        @include viewport(swap_tabs) {
          margin-right: vw_tabs(19px);
        }
        & span {
          font-size: vw_big_screen(12px);
          @include viewport(tabs) {
            font-size: vw_tabs(12px);
          }
          @include viewport(swap_tabs) {
            font-size: vw_tabs(8px);
          }
          @include viewport(sm_mobile) {
            font-size: vmin_mobile(12px);
            line-height: vmin_mobile(20px);
          }
        }
        & button {
          color: var(--footer-color);
          position: relative;
          transition: transform 0.2s ease;
          font-size: vw_big_screen(16px);
          user-select: none;
          @include viewport(tabs) {
            font-size: vw_tabs(16px);
          }
          @include viewport(swap_tabs) {
            font-size: vw_tabs(10px);
          }
          @include viewport(sm_mobile) {
            font-size: vmin_mobile(16px);
            line-height: vmin_mobile(20px);
            padding: 0 vmin_mobile(6px);
          }
          &:active {
            transform: scale(0.8);
          }
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
            @include viewport(tabs) {
              bottom: vw_tabs(-4.5px);
              width: vw_tabs(4px);
              height: vw_tabs(4px);
            }
            @include viewport(sm_mobile) {
              bottom: vmin_mobile(-4.5px);
              width: vmin_mobile(4px);
              height: vmin_mobile(4px);
            }
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
        @include viewport(tabs) {
          margin-right: vw_tabs(48px);
        }
        @include viewport(swap_tabs) {
          margin-right: vw_tabs(30px);
        }
        & button {
          width: vw_big_screen(38px);
          transition: transform 0.2s ease;
          padding: 0;
          @include viewport(tabs) {
            width: vw_tabs(38px);
          }
          @include viewport(swap_tabs) {
            width: vw_tabs(24px);
          }
          @include viewport(sm_mobile) {
            width: vmin_mobile(38px);
          }
          &:active {
            transform: scale(0.8);
            & svg {
              animation: none !important;
            }
          }
          &:first-child {
            margin-right: vw_big_screen(16px);
            @include viewport(tabs) {
              margin-right: vw_tabs(16px);
            }
            @include viewport(sm_mobile) {
              margin-right: vmin_mobile(16px);
            }
            &:hover {
              @include viewport(hover) {
                & svg {
                  animation: pulsePrev 1s infinite;
                }
              }
            }
          }
          &:last-child {
            &:hover {
              @include viewport(hover) {
                & svg {
                  animation: pulseNext 1s infinite;
                }
              }
            }
          }
        }
      }
    }
    &-main {
      position: relative;
      width: 65%;
      @include viewport(tabs) {
        width: 100%;
        height: 60%;
      }
      @include viewport(swap_tabs) {
        width: 65%;
        height: 100%;
      }
      @include viewport(mobile) {
        height: 50%;
      }
      @include viewport(swap_mobile) {
        width: 55%;
        min-height: 315px;
      }
      &-inner {
        height: calc((100% - vw_big_screen(60px)) - 1px);
        height: calc((var(--vh, 1vh) * 100) - vw_big_screen(60px) - 1px);
        @include viewport(tabs) {
          height: calc((100% - vw_tabs(60px)) - 1px);
          height: calc((var(--vh, 1vh) * 100) - vw_tabs(60px) - 1px);
          flex-direction: column-reverse;
          justify-content: flex-start;
          align-items: center;
        }
        @include viewport(swap_tabs) {
          flex-direction: unset;
          justify-content: unset;
          align-items: unset;
        }
        @include viewport(sm_mobile) {
          height: calc((100vh - vmin_mobile(60px)));
          height: calc((var(--vh, 1vh) * 100) - vmin_mobile(60px));
          background-color: var(--popup-color);
        }
        @include viewport(swap_mobile) {
          overflow: auto
        }
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
        @include viewport(tabs) {
          top: vw_tabs(34px);
          width: vw_tabs(534px);
          height: vw_tabs(362px);
        }
        @include viewport(swap_tabs) {
          top: vw_tabs(29px);
          width: vw_tabs(338px);
          height: vw_tabs(229px);
        }
        @include viewport(sm_mobile) {
          top: vmin_mobile(21px);
          width: vmin_mobile(274px);
          height: vmin_mobile(189px);
        }
        @include viewport(swap_mobile) {
          width: vmin_mobile(278px);
        }
      }
      &.emulate-tablet .popup-main-emulate {
        top: vw_big_screen(36px);
        width: vw_big_screen(322px);
        height: vw_big_screen(384px);
        border-bottom: 2px solid var(--emulate-color);
        @include viewport(tabs) {
          top: vw_tabs(26px);
          width: vw_tabs(322px);
          height: vw_tabs(384px);
        }
        @include viewport(swap_tabs) {
          top: vw_tabs(23px);
          width: vw_tabs(204px);
          height: vw_tabs(243px);
        }
        @include viewport(sm_mobile) {
          top: vmin_mobile(17px);
          width: vmin_mobile(180px);
          height: vmin_mobile(214px);
        }
      }
      &.emulate-mobile .popup-main-emulate {
        top: vw_big_screen(85px);
        width: vw_big_screen(230px);
        height: vw_big_screen(326px);
        border-top: 2px solid var(--emulate-color);
        border-bottom: 2px solid var(--emulate-color);
        @include viewport(tabs) {
          top: vw_tabs(75px);
          width: vw_tabs(230px);
          height: vw_tabs(326px);
        }
        @include viewport(swap_tabs) {
          top: vw_tabs(54px);
          width: vw_tabs(146px);
          height: vw_tabs(206px);
        }
        @include viewport(sm_mobile) {
          top: vmin_mobile(52px);
          width: vmin_mobile(130px);
          height: vmin_mobile(174px);
        }
      }
    }
    &-aside {
      width: 35%;
      height: 100%;
      background-color: var(--popup-color);
      padding: vw_big_screen(16px) vw_big_screen(24px);
      transform-origin: center bottom;
      transition: 0.2s cubic-bezier(0.22, -0.01, 0.01, 1.02);
      // transform: scaleY(1);
      opacity: 1;
      &.handle-content {
        // transform: scaleY(0);
        opacity: 0;
      }
      @include viewport(tabs) {
        width: 100%;
        height: 32%;
        padding: vw_tabs(16px) vw_tabs(24px);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
      }
      @include viewport(swap_tabs) {
        width: 35%;
        height: 100%;
        padding: vw_tabs(10px) vw_tabs(16px);
        display: unset;
      }
      @include viewport(mobile) {
        justify-content: center;
        height: 42%;
      }
      @include viewport(swap_mobile) {
        width: 45%;
        min-height: 315px;
      }
      &-buttons {
        gap: vw_big_screen(12px);
        margin-bottom: vw_big_screen(12px);
        @include viewport(tabs) {
          gap: vw_tabs(12px);
          margin-bottom: 0;
          order: 2;
        }
        @include viewport(swap_tabs) {
          gap: vw_tabs(8px);
          margin-bottom: vw_tabs(8px);
          order: unset;
        }
        @include viewport(sm_mobile) {
          gap: vmin_mobile(12px);
          order: 1;
        }
        & button {
          width: vw_big_screen(48px);
          height: vw_big_screen(48px);
          background-color: #fff;
          padding: 0;
          transition: transform 0.2s ease;
          @include viewport(tabs) {
            width: vw_tabs(48px);
            height: vw_tabs(48px);
          }
          @include viewport(swap_tabs) {
            width: vw_tabs(30px);
            height: vw_tabs(30px);
          }
          @include viewport(sm_mobile) {
            width: vmin_mobile(48px);
            height: vmin_mobile(48px);
          }
          &:active {
            transform: scale(0.8);
          }
        }
      }
      &-tags {
        overflow: hidden;
        font-weight: 500;
        height: vw_big_screen(32px);
        width: fit-content;
        @include viewport(tabs) {
          height: vw_tabs(32px);
          order: 1;
        }
        @include viewport(swap_tabs) {
          height: vw_tabs(20px);
          order: unset;
        }
        @include viewport(sm_mobile) {
          height: vmin_mobile(32px);
          order: 2;
          margin-top: vmin_mobile(16px);
          margin-right: auto;
        }
        & + div {
          & svg {
            width: vw_big_screen(20px);
            @include viewport(tabs) {
              width: vw_tabs(20px);
            }
            @include viewport(swap_tabs) {
              width: vw_tabs(14px);
            }
          }
        }
        & .tags {
          padding: 0 vw_big_screen(12px);
          background-color: var(--tools-color);
          height: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          position: relative;
          max-width: vw_big_screen(220px);
          @include viewport(tabs) {
            padding: 0 vw_tabs(12px);
            max-width: vw_tabs(220px);
          }
          @include viewport(swap_tabs) {
            padding: 0 vw_tabs(8px);
            max-width: vw_tabs(140px);
          }
          @include viewport(sm_mobile) {
            padding: 0 vmin_mobile(12px);
          }
          @include viewport(mobile) {
            max-width: unset;
          }
          @include viewport(swap_mobile) {
            max-width: vmin_mobile(230px);
          }
          &::after {
            content: '...';
            position: absolute;
            right: 0;
            padding: 0 vw_big_screen(5px) 0 0;
            background-color: var(--tools-color);
            font-size: vw_big_screen(12px);
            letter-spacing: -0.36em;
            @include viewport(tabs) {
              padding-right: vw_tabs(5px);
              font-size: vw_tabs(12px);
            }
            @include viewport(swap_tabs) {
              padding-right: vw_tabs(3px);
              font-size: vw_tabs(8px);
            }
            @include viewport(sm_mobile) {
              padding-right: vmin_mobile(5px);
              font-size: vmin_mobile(12px);
            }
          }
          & span {
            font-size: vw_big_screen(12px);
            display: inline-block;
            @include viewport(tabs) {
              font-size: vw_tabs(12px);
            }
            @include viewport(swap_tabs) {
              font-size: vw_tabs(8px);
            }
            @include viewport(sm_mobile) {
              font-size: vmin_mobile(12px);
            }
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
    @include viewport(tabs) {
      font-size: vw_tabs(24px);
    }
    @include viewport(swap_tabs) {
      font-size: vw_tabs(16px);
    }
    @include viewport(sm_mobile) {
      font-size: vmin_mobile(16px);
    }
  }

  .btn-close {
    width: vw_big_screen(32px);
    height: vw_big_screen(32px);
    transition: transform 0.2s ease;
    @include viewport(tabs) {
      width: vw_tabs(32px);
      height: vw_tabs(32px);
    }
    @include viewport(swap_tabs) {
      width: vw_tabs(20px);
      height: vw_tabs(20px);
    }
    @include viewport(sm_mobile) {
      width: vmin_mobile(32px);
      height: vmin_mobile(32px);
    }
    &:active {
      transform: scale(0.8);
    }
    &:hover svg {
      animation: closeHover 0.6s cubic-bezier(0.44, 1.2, 0.54, 0.31) forwards;
    }
  }

  @keyframes show {
    to {
      filter: blur(0);
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes hide {
    from {
      filter: blur(0);
      opacity: 1;
      transform: scale(1);
    }
    to {
      filter: blur(100px);
      opacity: 0;
      transform: scale(2);
    }
  }
</style>