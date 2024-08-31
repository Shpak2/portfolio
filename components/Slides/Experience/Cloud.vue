<template>
  <!-- <div id="cursor"></div> -->
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
    & .tag {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: vw_big_screen(20px);
      font-weight: 600;
      transition: transform .5s linear, opacity .5s linear;
      color: var(--tags-color);
      & .wrap {
        display: inline-block;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }

</style>