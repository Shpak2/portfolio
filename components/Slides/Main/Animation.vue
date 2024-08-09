<template>
  <div class="site-background full-height">
    <canvas ref="myCanvas" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        figures: [],
        colorFigures: [
          {
            light: ["#860CFB","#A25EE2"],
            dark: ["#860CFB","#A25EE2"]
          },
          {
            light: ["#565656","#000000"],
            dark: ["#929292","#FFFFFF"]
          },
        ],
        animationFrameId: null,
      };
    },
    mounted() {
      this.getPosition();
      requestAnimationFrame(() => {

        this.drawCanvas();
      });
    },
    beforeDestroy() {
      cancelAnimationFrame(this.animationFrameId);
    },
    methods: {
      getPosition() {
        const $this = this

        let prevX, prevY;
        let lastRecordedTime = 0;
        const delay = 100;

          window.addEventListener('mousemove', function(event) {
            const currentTime = Date.now();

            if (currentTime - lastRecordedTime < delay) {
                return;
            }

            if (typeof prevX !== 'undefined' && typeof prevY !== 'undefined') {
            // Отримуємо поточні координати миші на вікні
            const currentX = event.clientX;
            const currentY = event.clientY;

            // Обчислюємо різницю між поточними та попередніми координатами
            const deltaX = currentX - prevX;
            const deltaY = currentY - prevY;

            // Обчислюємо кут в радіанах використовуючи арктангенс
            const radians = Math.atan2(deltaY, deltaX);

            // Перетворюємо радіани в градуси
            const degrees = radians * (180 / Math.PI);

            // Виводимо кут руху мишки
            // console.log('Кут руху мишки: ' + degrees + ' градусів');

            const currentColor = $this.getRandomInt();
            const fill2 = $this.colorFigures[currentColor].light[1];
            const fill1 = $this.colorFigures[currentColor].light[0];

            prevX = currentX;
            prevY = currentY;

            $this.figures.push({
              x: currentX,
              y: currentY,
              fill1: fill1,
              fill2: fill2,
              degrees: degrees,
              opacity: 1,
              speedX: Math.random() * 2 - 1,
              speedY: Math.random() * 2 - 1,
            });

            console.log($this.figures)

            lastRecordedTime = currentTime;
            // $this.drawSVG(canvas.getContext('2d'), currentX, currentY, color1, color2)
          } else {
            prevX = event.clientX;
            prevY = event.clientY;
          }
        });
      },
      drawSVG(context, offsetX, offsetY, color1, color2, opacity, degrees) {
        // SVG-код і змінні для кольорів
        const svgPath1 = "M40.3466 31.3239L40.3466 20.4244L20.167 1.33514e-05L20.167 10.8996L40.3466 31.3239Z";
        const svgPath2 = "M20.1675 1.59961e-05L20.1675 10.8996L0 31.3239L1.4293e-06 20.4244L20.1675 1.59961e-05Z";

        context.globalAlpha = opacity;

        // // Малюємо перший трикутник
        context.translate(offsetX, offsetY);
        context.save();
        context.rotate(degrees);
        context.beginPath();
        context.fillStyle = color1;
        context.fill(new Path2D(svgPath1));
        context.restore();

        // // Зміщення для вставки другої фігури в нове місце
        context.translate(-offsetX, -offsetY);

        // // Зміщення для вставки фігури в нове місце
        context.translate(offsetX, offsetY);

        context.save();
        context.rotate(degrees);
        context.beginPath();
        context.fillStyle = color2;
        context.fill(new Path2D(svgPath2));
        context.restore();

        // // Зміщення для повернення контексту в початковий стан
        context.translate(-offsetX, -offsetY);
      },
      drawCanvas() {
        const canvas = this.$refs.myCanvas;
        const context = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;

        this.checkAndRemoveFigures();

        context.clearRect(0, 0, canvas.width, canvas.height);

        this.figures.forEach((figure) => {
        // Оновлюємо координати руху кожного об'єкта
        figure.x += figure.speedX;
        figure.y += figure.speedY;

        // Малюємо об'єкт з оновленими координатами
        this.drawSVG(context, figure.x, figure.y, figure.fill1, figure.fill2, figure.opacity, figure.degrees);
      });


          requestAnimationFrame(() => {
              this.drawCanvas();
          });
      },
      checkAndRemoveFigures() {
        const maxFigures = 30; // Максимальна кількість елементів
        if (this.figures.length > maxFigures) {
            // Зменшення опасіті та видалення зайвих елементів
            this.figures.forEach((figure) => {
                figure.opacity -= 0.01; // Зменшення опасіті на 0.02
                if (figure.opacity <= 0) {
                    const index = this.figures.indexOf(figure);
                    this.figures.splice(index, 1); // Видалення елемента, якщо опасіті <= 0
                }
            });
        }
      },
      getRandomInt() {
        return Math.floor(Math.random() * 2);
      },
      // updateCoordinates() {
      //   // Оновлення координат для анімації
      //   this.positions = this.positions.map(({ x, y }) => ({
      //     x: x + Math.random() * 2 - 1,  // Зміна координат на випадкову величину (-1 до 1)
      //     y: y + Math.random() * 2 - 1,
      //   }));
      // },
      //
      // animateFigures() {
      //   const canvas = this.$refs.myCanvas;
      //   canvas.width = canvas.parentElement.clientWidth;
      //   canvas.height = canvas.parentElement.clientHeight;
      //   const context = canvas.getContext("2d");

      //   const currentColor = this.getRandomInt();
      //   const fill2 = this.colorFigures[currentColor].light[1];
      //   const fill1 = this.colorFigures[currentColor].light[0];

      //   // Координати курсору за замовчуванням
      //   let mouseX = 0;
      //   let mouseY = 0;

      //   // Додамо обробник події для відстеження руху курсору
      //   canvas.addEventListener('mousemove', (event) => {
      //       // Отримуємо координати курсору відносно канвасу
      //       mouseX = event.clientX - canvas.getBoundingClientRect().left;
      //       mouseY = event.clientY - canvas.getBoundingClientRect().top;
      //   });

      //   // Змінні для анімації зжимання та розжимання
      //   let scale = 1;
      //   let direction = 1;

      //   const animate = () => {
      //       // Очищення канвасу перед кожним кадром
      //       context.clearRect(0, 0, canvas.width, canvas.height);

      //       // Анімація руху кожної фігури
      //       this.positions.forEach(({ x, y }) => {
      //           // Масштабуємо контекст для анімації
      //           context.save();
      //           context.scale(scale, scale);
      //           // Малюємо та анімуємо трикутники, використовуючи координати курсору
      //           this.drawSVG(context, x / scale + mouseX, y / scale + mouseY, fill1, fill2);
      //           context.restore();
      //       });

      //       // Оновлюємо масштаб для наступного кадру анімації
      //       scale += 0.01 * direction;

      //       // Зміна напрямку зміни масштабу при досягненні максимального або мінімального значення
      //       if (scale >= 1.2 || scale <= 0.8) {
      //           direction *= -1;
      //       }

      //       // Викликаємо наступний кадр анімації
      //       requestAnimationFrame(animate);
      //   };

      //   // Запускаємо анімацію
      //   animate();
      //   },
      // drawSVG(context, offsetX, offsetY, color1, color2) {
      //   // SVG-код і змінні для кольорів
      //   const svgPath1 = "M40.3466 31.3239L40.3466 20.4244L20.167 1.33514e-05L20.167 10.8996L40.3466 31.3239Z";
      //   const svgPath2 = "M20.1675 1.59961e-05L20.1675 10.8996L0 31.3239L1.4293e-06 20.4244L20.1675 1.59961e-05Z";
      //   // const color1 = "#860CFB";
      //   // const color2 = "#A25EE2";

      //   // Зміщення для вставки фігури в нове місце
      //   context.translate(offsetX, offsetY);

      //   // Малюємо перший трикутник
      //   context.beginPath();
      //   context.fillStyle = color1;
      //   context.fill(new Path2D(svgPath1));

      //   // Зміщення для вставки другої фігури в нове місце
      //   context.translate(-offsetX, -offsetY);

      //   // Зміщення для вставки фігури в нове місце
      //   context.translate(offsetX, offsetY);

      //   // Малюємо другий трикутник
      //   context.beginPath();
      //   context.fillStyle = color2;
      //   context.fill(new Path2D(svgPath2));

      //   // Зміщення для повернення контексту в початковий стан
      //   context.translate(-offsetX, -offsetY);
      // },
      // updateCoordinates() {
      //   // Оновлення координат для анімації
      //   this.positions = this.positions.map(({ x, y }) => ({
      //     x: x + Math.random() * 2 - 1,  // Зміна координат на випадкову величину (-1 до 1)
      //     y: y + Math.random() * 2 - 1,
      //   }));
      // },
    },
  };
</script>

<style lang="scss" scoped>
  div {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    // z-index: 2000;
    pointer-events: none;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>