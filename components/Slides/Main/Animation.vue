<template>
  <div class="full-height">
    <canvas ref="myCanvas" />
  </div>
</template>

<script>
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
      mouseX: (window.innerWidth / 4) * 3,
      mouseY: window.innerHeight / 2,
      targetX: (window.innerWidth / 4) * 3,
      targetY: window.innerHeight / 2,
      currentX: (window.innerWidth / 4) * 3,
      currentY: window.innerHeight / 2,
      isSearching: true,
      hover: false,
      mouseStillTimeout: null,
      minRadius: 0.8,
      maxRadius: 1.2,
      targetRadius: window.innerWidth <= 1024 ? (180 * window.innerWidth) / 768 : 200,
      figures: [],
      length: window.innerWidth <= 1024 ? (40 * window.innerWidth) / 768 : 50,
      animationFrameId: null,
      isPortrait: window.matchMedia("(max-width: 584px) and (orientation: portrait)").matches
    };
  },
  watch: {
    "$store.state.theme.darkMode"() {
      this.updateColors();
    },
    "$store.state.hoverElement"(val) {
      this.hover = val;
    },
  },
  mounted() {
    for (let i = 0; i < this.length; i++) {
      this.generateFigures();
    }
    this.initializeCanvas();
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("resize", this.handleResize);
    if (this.isPortrait) {
      this.updateMousePosition(window.innerWidth * 0.75, window.innerHeight * 0.75);
    }
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("resize", this.handleResize);
    clearTimeout(this.mouseStillTimeout);
    cancelAnimationFrame(this.animationFrameId);
  },
  methods: {
    initializeCanvas() {
      const canvas = this.$refs.myCanvas;

      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");

      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }

      this.animate(ctx, canvas);
    },
    handleResize() {
      this.initializeCanvas();
      if (this.isPortrait) {
        this.updateMousePosition(window.innerWidth * 0.75, window.innerHeight * 0.75);
      }
    },
    handleMouseMove(event) {
      this.updateMousePosition(event.clientX, event.clientY);
    },
    updateMousePosition(x, y) {
      this.mouseX = x;
      this.mouseY = y;
      this.targetX = x;
      this.targetY = y;
      this.isSearching = false;

      clearTimeout(this.mouseStillTimeout);
      this.mouseStillTimeout = setTimeout(() => {
        this.isSearching = true;
      }, 500);
    },
    generateFigures(
      positionX = this.getRandomInteger(1, window.innerWidth),
      positionY = this.getRandomInteger(20, window.innerHeight)
    ) {
      const angle = Math.random() * 2 * Math.PI;
      const color = this.getRandomColor();
      this.figures.push({
        x: positionX,
        y: positionY,
        size: this.getRandomInteger(20, 70),
        angle: angle,
        color: color,
        scaleX: 1,
        scaleY: 1,
        initialWidth: window.innerWidth <= 1024 ? 30 : (40 * window.innerWidth) / 1920,
        initialHeight: window.innerWidth <= 1024 ? 23 : (31 * window.innerWidth) / 1920,
        growing: true,
        speed: 3 / this.getRandomInteger(200, 300),
        radius: this.getRandomInteger(140, 240),
        correct: this.getRandomInteger(-20, 20),
        rotationSpeed: 100 / this.getRandomInteger(90, 110),
        radiusChangeSpeed: 2 / this.getRandomInteger(70, 110),
        speedScale: 2 / this.getRandomInteger(30, 40),
        life: this.getRandomInteger(200, 600),
        opacity: 1
      });
    },
    drawTriangle(ctx, figure) {
      const svgPath1 = "M40.3466 31.3239L40.3466 20.4244L20.167 1.33514e-05L20.167 10.8996L40.3466 31.3239Z";
      const svgPath2 = "M20.1675 1.59961e-05L20.1675 10.8996L0 31.3239L1.4293e-06 20.4244L20.1675 1.59961e-05Z";

      const path1 = new Path2D(svgPath1);
      const path2 = new Path2D(svgPath2);

      const x = figure.x;
      const y = figure.y;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(figure.angle - 29.75);

      const scaleX = figure.scaleX * (figure.initialWidth / 40);
      const scaleY = figure.scaleY * (figure.initialHeight / 31);
      ctx.scale(scaleX, scaleY);

      ctx.translate(-(figure.size / 2), -(figure.size / 2));

      ctx.globalAlpha = figure.opacity;

      ctx.fillStyle = figure.color[0];
      ctx.fill(path1);

      ctx.fillStyle = figure.color[1];
      ctx.fill(path2);

      ctx.restore();
    },
    animate(ctx, canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = this.mouseX;
      const centerY = this.mouseY;

      if (this.isSearching || this.hover) {
        this.figures.forEach((figure) => {
          figure.x +=
            ((centerX + figure.radius * Math.cos(figure.angle)) -
              figure.x +
              figure.correct) *
            figure.speed;
          figure.y +=
            ((centerY + figure.radius * Math.sin(figure.angle)) -
              figure.y +
              figure.correct) *
            figure.speed;
          const dx = this.targetX - figure.x;
          const dy = this.targetY - figure.y;

          const targetAngle = Math.atan2(dy, dx);
          figure.angle = targetAngle + Math.PI / 2;
          this.drawTriangle(ctx, figure);

          this.hover
            ? (figure.angle += figure.rotationSpeed - 0.4)
            : (figure.angle += figure.rotationSpeed);

          if (figure.angle >= 2 * Math.PI) {
            figure.angle -= 2 * Math.PI;

            const newTargetRadius =
              figure.radius *
              (Math.random() * (this.maxRadius - this.minRadius) +
                this.minRadius);
            figure.radius = newTargetRadius;
          }
          figure.radius +=
            (this.targetRadius - figure.radius) * figure.radiusChangeSpeed;

          figure.life -= 0.2;
          if (figure.life <= 0) {
            figure.opacity -= 0.05;
            if (figure.opacity <= 0) {
              this.figures = this.figures.filter((f) => f !== figure);
              this.generateFigures(this.targetX, this.targetY);
            }
          }
        });
      } else {
        this.figures.forEach((figure) => {
          const correctSpeed = window.innerWidth <= 1024 ? 5 : 1;

          figure.x += (this.targetX - figure.x + figure.correct) * (figure.speed * correctSpeed);
          figure.y += (this.targetY - figure.y + figure.correct) * (figure.speed * correctSpeed);

          const dx = this.targetX - figure.x;
          const dy = this.targetY - figure.y;

          const targetAngle = Math.atan2(dy, dx);
          figure.angle += targetAngle - figure.angle;

          this.drawTriangle(ctx, figure);
          figure.life -= 15;
          if (figure.life <= 0) {
            figure.opacity -= 0.05;
            if (figure.opacity <= 0) {
              this.figures = this.figures.filter((f) => f !== figure);
              this.generateFigures(
                this.targetX + this.getRandomInteger(-150, 150),
                this.targetY + this.getRandomInteger(-150, 150)
              );
            }
          }
        });
      }
      this.figures.forEach((figure) => {
        if (figure.growing) {
          figure.scaleX += figure.speedScale;
          if (figure.scaleX >= 1.2) figure.growing = false;
        } else {
          figure.scaleX -= figure.speedScale - 0.01;
          if (figure.scaleX <= 0.6) figure.growing = true;
        }
      });

      this.animationFrameId = requestAnimationFrame(() =>
        this.animate(ctx, canvas)
      );
    },
    getRandomColor() {
      const currentColor = Math.floor(Math.random() * this.colorFigures.length);
      return !this.$store.state.theme.darkMode
        ? this.colorFigures[currentColor].light
        : this.colorFigures[currentColor].dark;
    },
    updateColors() {
      this.figures.forEach((figure) => {
        figure.color = this.getRandomColor();
      });
    },
    getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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
    @include viewport(sm_mobile) {
      position: absolute;
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
    }
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
