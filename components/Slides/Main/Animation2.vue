<template>
  <div class="site-background full-height">
    <canvas ref="myCanvas" />
  </div>
</template>

<script>

// import { useStore } from 'vuex';

export default {
  data() {
    return {
      colorFigures: [
        {
          light: ["#860CFB", "#A25EE2"],
          dark: ["#860CFB", "#A25EE2"]
        },
        {
          light: ["#565656", "#000000"],
          dark: ["#929292", "#FFFFFF"]
        },
      ],
      activeThem: false,
      scaleX: 1,
      growing: true,
      mouseX: window.innerWidth / 2,
      mouseY: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      currentX: window.innerWidth / 2,
      currentY: window.innerHeight / 2,
      speed: 0.05,
      isSearching: false,
      searchRadius: 200,
      mouseStillTimeout: null,
      currentAngle: 0,
      angleOffset: 0,
      rotationSpeed: 0.02,
      minRadius: 0.8,
      maxRadius: 1.2,
      radius: 200,
      targetRadius: 200,
      radiusChangeSpeed: 0.02,
      activeFill: [],
      figures: []
    };
  },
  watch: {
    '$store.state.theme.darkMode'() {
      this.getRandomColor();
      console.log(this.figures)
    },
  },
  mounted() {
    // this.getRandomColor();
    this.generateFigures();
    this.initializeCanvas();
    window.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    clearTimeout(this.mouseStillTimeout);
  },
  methods: {
    initializeCanvas() {
      const canvas = this.$refs.myCanvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      this.animate(ctx, canvas);
    },
    generateFigures() {
      // Очистити масив фігур
      this.figures = [];

      // Створити 10 фігур
      for (let i = 0; i < 10; i++) {
        // Випадкові координати
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Випадковий розмір між 20 і 70
        const size = Math.random() * 50 + 20;

        // Випадковий початковий кут
        const angle = Math.random() * 2 * Math.PI;

        // Випадковий колір
        const color = this.getRandomColor();

        // Додати фігуру в масив
        this.figures.push({
          x: x,
          y: y,
          size: size,
          angle: angle,
          color: color
        });
      }
    },
    drawTriangle(ctx, scaleX, centerX, centerY, angle) {
      const svgPath1 = "M40.3466 31.3239L40.3466 20.4244L20.167 1.33514e-05L20.167 10.8996L40.3466 31.3239Z";
      const svgPath2 = "M20.1675 1.59961e-05L20.1675 10.8996L0 31.3239L1.4293e-06 20.4244L20.1675 1.59961e-05Z";

      const path1 = new Path2D(svgPath1);
      const path2 = new Path2D(svgPath2);

      const x = centerX;
      const y = centerY;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle - 29.75);
      ctx.scale(scaleX, 1);
      ctx.translate(-20, -20);

      ctx.fillStyle = this.activeFill[0];
      ctx.fill(path1);

      ctx.fillStyle = this.activeFill[1];
      ctx.fill(path2);

      ctx.restore();
    },
    animate(ctx, canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (this.isSearching) {
        // search mouse
        const centerX = this.mouseX;
        const centerY = this.mouseY;

        this.currentX += ((centerX + this.radius * Math.cos(this.angleOffset)) - this.currentX) * this.speed;
        this.currentY += ((centerY + this.radius * Math.sin(this.angleOffset)) - this.currentY) * this.speed;

        const dx = this.currentX - centerX;
        const dy = this.currentY - centerY;
        const targetAngle = Math.atan2(dy, dx);

        this.currentAngle = targetAngle + Math.PI / 2;

        this.drawTriangle(ctx, this.scaleX, this.currentX, this.currentY, this.currentAngle);

        this.angleOffset += this.rotationSpeed;
        if (this.angleOffset >= 2 * Math.PI) {
          this.angleOffset -= 2 * Math.PI;

          const newTargetRadius = this.searchRadius * (Math.random() * (this.maxRadius - this.minRadius) + this.minRadius);
          this.targetRadius = newTargetRadius;
        }

        this.radius += (this.targetRadius - this.radius) * this.radiusChangeSpeed;
        this.radius = Math.min(this.radius, Math.min(window.innerWidth, window.innerHeight) / 2);

      } else {
        this.currentX += (this.targetX - this.currentX) * this.speed;
        this.currentY += (this.targetY - this.currentY) * this.speed;

        const dx = this.targetX - this.currentX;
        const dy = this.targetY - this.currentY;
        const targetAngle = Math.atan2(dy, dx);

        this.currentAngle += (targetAngle - this.currentAngle);

        this.drawTriangle(ctx, this.scaleX, this.currentX, this.currentY, this.currentAngle);
      }

      if (this.growing) {
        this.scaleX += 0.04;
        if (this.scaleX >= 1.2) this.growing = false;
      } else {
        this.scaleX -= 0.03;
        if (this.scaleX <= 0.6) this.growing = true;
      }

      requestAnimationFrame(() => this.animate(ctx, canvas));
    },
    handleMouseMove(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      this.targetX = event.clientX;
      this.targetY = event.clientY;
      this.isSearching = false;

      clearTimeout(this.mouseStillTimeout);
      this.mouseStillTimeout = setTimeout(() => {
        this.isSearching = true;
        this.angleOffset = 0;
      }, 1000);
    },
    getRandomColor() {
      const currentColor = Math.floor(Math.random() * this.colorFigures.length)
      return !this.$store.state.theme.darkMode ? this.colorFigures[currentColor].light : this.colorFigures[currentColor].dark;
    },
  }
};
</script>

<style lang="scss" scoped>
  div {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
