<template>
  <ul class="tags-cloud">
    <li v-for="( tag, i ) in tags" :key="i" class='tag'>
      <span class='wrap'>{{ tag }}</span>
    </li>
  </ul>
</template>

<script>
  import {TagsCloud} from '~/utils/cloud.js';

  export default {
    data() {
      return {
        tags: [
          'HTML5',
          'CSS3',
          'Sass/SCSS',
          'JavaScript',
          'Vue.js',
          'Nuxt.js',
          'GSAP',
          'Bootstrap',
          'Tailwind CSS',
          'CSS-in-JS',
          'Docker',
          'Git',
          'Webpack',
          'Gulp',
          'Babel',
          'Vite',
          'Figma',
          'Photoshop',
          'Sketch',
          'Jira',
        ],
      };
    },
    mounted() {
      this.cloud()
    },
    methods: {
      cloud: function (){
        const root = document.querySelector('.tags-cloud');
        const cloud = new TagsCloud(root);
        cloud.start();
      }
    },
  };
</script>

<style lang="scss" scoped>

  .tags-cloud {
    font-family: 'SF Mono', sans-serif;
    position: absolute;
    top: 50%;
    right: vw_big_screen(-20px);
    height: vw_big_screen(412px);
    width: vw_big_screen(412px);
    transform: translateY(-50%);
    list-style: none;
    padding: 0;
    @include viewport(tabs) {
      right: 50%;
      top: unset;
      height: vw_tabs(320px);
      width: vw_tabs(320px);
      transform: translateX(50%);
      bottom: vw_tabs(100px);
    }
    @include viewport(swap_tabs) {
      right: vw_tabs(30px);
      top: 50%;
      height: vw_tabs(220px);
      width: vw_tabs(220px);
      transform: translateY(-50%);
      bottom: unset;
    }
    @include viewport(mobile) {
      right: 50%;
      top: unset;
      height: vmin_mobile(300px);
      width: vmin_mobile(300px);
      transform: translateX(50%);
      bottom: vmin_mobile(40px);
      // overflow: hidden;
    }
    & .tag {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: vw_big_screen(20px);
      font-weight: 600;
      transition: transform .5s linear, opacity .5s linear;
      color: var(--tags-color);
      @include viewport(tabs) {
        font-size: vw_tabs(18px);
      }
      @include viewport(swap_tabs) {
        font-size: vw_tabs(14px);
      }
      @include viewport(sm_mobile) {
        font-size: vmin_mobile(14px);
      }
      & .wrap {
        display: inline-block;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }

</style>