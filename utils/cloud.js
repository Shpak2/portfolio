export class FibonacciSphere {
  #points;

  get points() {
    return this.#points;
  }

  constructor(N) {
    this.#points = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(1 - y ** 2);
      const a = goldenAngle * i;
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * radius;
      this.#points.push([x, y, z]);
    }
  }
}

export class TagsCloud {
  #root;
  #size;
  #sphere;
  #tags;
  #rotationAxis;
  #rotationAngle;
  #currentSpeed;
  #targetSpeed;
  #speedChangeRate;
  #frameRequestId;
  #changeTrajectoryInterval;
  #lastChangeTime;

  constructor(root) {
    this.#root = root;
    this.#tags = root.querySelectorAll('.tag');
    this.#size = this.#root.offsetWidth;
    this.#sphere = new FibonacciSphere(this.#tags.length);
    this.#rotationAxis = [1, 0, 0];
    this.#rotationAngle = 0;
    this.#currentSpeed = 0.002;
    this.#targetSpeed = this.#currentSpeed;
    this.#speedChangeRate = 0.0005;
    this.#changeTrajectoryInterval = 5000 + Math.random() * 2000;
    this.#lastChangeTime = Date.now();

    this.#updatePositions();
    this.#initEventListeners();
    this.#root.classList.add('-loaded');

    this.start();
  }

  #initEventListeners() {
    window.addEventListener('resize', this.#onResize.bind(this));
    document.addEventListener('pointermove', this.#onPointerMove.bind(this));
  }

  #onResize() {
    this.#size = this.#root.offsetWidth;
    this.#sphere = new FibonacciSphere(this.#tags.length);
    this.#updatePositions();
  }

  #updatePositions() {
    const sin = Math.sin(this.#rotationAngle);
    const cos = Math.cos(this.#rotationAngle);
    const ux = this.#rotationAxis[0];
    const uy = this.#rotationAxis[1];
    const uz = this.#rotationAxis[2];
    const rotationMatrix = [
      [
        cos + (ux ** 2) * (1 - cos),
        ux * uy * (1 - cos) - uz * sin,
        ux * uz * (1 - cos) + uy * sin,
      ],
      [
        uy * ux * (1 - cos) + uz * sin,
        cos + (uy ** 2) * (1 - cos),
        uy * uz * (1 - cos) - ux * sin,
      ],
      [
        uz * ux * (1 - cos) - uy * sin,
        uz * uy * (1 - cos) + ux * sin,
        cos + (uz ** 2) * (1 - cos)
      ]
    ];
    const N = this.#tags.length;
    for (let i = 0; i < N; i++) {
      const x = this.#sphere.points[i][0];
      const y = this.#sphere.points[i][1];
      const z = this.#sphere.points[i][2];
      const transformedX = rotationMatrix[0][0] * x + rotationMatrix[0][1] * y + rotationMatrix[0][2] * z;
      const transformedY = rotationMatrix[1][0] * x + rotationMatrix[1][1] * y + rotationMatrix[1][2] * z;
      const transformedZ = rotationMatrix[2][0] * x + rotationMatrix[2][1] * y + rotationMatrix[2][2] * z;
      const translateX = this.#size * transformedX / 2;
      const translateY = this.#size * transformedY / 2;
      const scale = (transformedZ + 2) / 3;
      const transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
      const opacity = (transformedZ + 1.5) / 2.5;
      this.#tags[i].style.transform = transform;
      this.#tags[i].style.opacity = opacity;
    }
  }

  #onPointerMove(e) {
    if (e.pointerType !== 'mouse') return;

    const rootRect = this.#root.getBoundingClientRect();
    const deltaX = (e.clientX <= window.innerWidth / 2 ? window.innerWidth / 2 : e.clientX) - (rootRect.left + this.#root.offsetWidth / 2);
    const deltaY = e.clientY - (rootRect.top + this.#root.offsetHeight / 2);
    const a = Math.atan2(deltaX - 1, deltaY - 1) - Math.PI / 2;
    const axis = [Math.sin(a), Math.cos(a), 0];
    const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const speed = delta / Math.max(window.innerHeight, window.innerWidth) / 15;
    this.#rotationAxis = axis;
    this.#targetSpeed = speed;
  }

  #update() {
    this.#rotationAngle += this.#currentSpeed;
    this.#currentSpeed += (this.#targetSpeed - this.#currentSpeed) * this.#speedChangeRate;
    this.#updatePositions();
  }

  #changeTrajectory() {
    const a = Math.random() * 2 * Math.PI;
    this.#rotationAxis = [Math.sin(a), Math.cos(a), 0];
    this.#targetSpeed = 0.002 + Math.random() * 0.005;
    this.#speedChangeRate = 0.0005;
    this.#changeTrajectoryInterval = 5000 + Math.random() * 2000;
  }

  start() {
    this.#update();
    this.#frameRequestId = requestAnimationFrame(this.start.bind(this));

    const now = Date.now();
    if (now - this.#lastChangeTime >= this.#changeTrajectoryInterval) {
      this.#changeTrajectory();
      this.#lastChangeTime = now;
    }
  }

  stop() {
    cancelAnimationFrame(this.#frameRequestId);
  }
}
