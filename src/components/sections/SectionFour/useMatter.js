import Matter from "matter-js";

function getRandom() {
  return Math.random() > 0.5;
}

class MatterScene {
  constructor(canvas) {
    if (MatterScene.instance) {
      return MatterScene.instance; 
    }

    this.Engine = Matter.Engine;
    this.Render = Matter.Render;
    this.Runner = Matter.Runner;
    this.Composite = Matter.Composite;
    this.MouseConstraint = Matter.MouseConstraint;
    this.Mouse = Matter.Mouse;
    this.Bodies = Matter.Bodies;

    this.width = canvas.getBoundingClientRect().width;
    this.height = canvas.getBoundingClientRect().height;
    this.engine = this.Engine.create();
    this.world = this.engine.world;

    this.render = this.Render.create({
      element: canvas,
      engine: this.engine,
      options: {
        width: this.width,
        height: this.height,
        background: "transparent",
        wireframes: false,
      },
    });

    this.timer = null;
    this.bigDiamonds = [];
    this.smDiamonds = [];
    this.toggleTexture = true;

    this.initialize();

    MatterScene.instance = this;
  }

  initialize() {
    this.Render.run(this.render);
    const runner = this.Runner.create();
    this.Runner.run(runner, this.engine);

    const ground = this.Bodies.rectangle(
      this.width / 2,
      this.height - window.innerHeight / 10,
      this.width,
      10,
      { isStatic: true }
    );

    const leftWall = this.Bodies.rectangle(0, this.height / 2, 10, this.height, {
      isStatic: true,
    });
    const rightWall = this.Bodies.rectangle(this.width, this.height / 2, 10, this.height, {
      isStatic: true,
    });

    ground.render.visible = false;
    rightWall.render.visible = false;
    leftWall.render.visible = false;

    this.Composite.add(this.world, [ground, leftWall, rightWall]);

    const mouse = this.Mouse.create(this.render.canvas);
    const mouseConstraint = this.MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    this.Composite.add(this.world, mouseConstraint);
    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
  }

  makeCircle(x, texture) {
    return this.Bodies.circle(x, 0, 75, {
      render: {
        sprite: {
          texture,
        },
      },
    });
  }

  makeDiamond(width, height, x, texture) {
    const vertices = [
      { x: x, y: -height / 2 },
      { x: x + width / 2, y: 0 },
      { x: x, y: height / 2 },
      { x: x - width / 2, y: 0 },
    ];
    return this.Bodies.fromVertices(x, 0, vertices, {
      render: {
        sprite: {
          texture,
        },
      },
    });
  }

  addCircle(circle_black, circle_white, eth_lg, eth_sm, eth_lg_gray, eth_sm_gray) {
    for (let i = 0; i < 4; i++) {
      const x = Math.random() * this.width;
      const texture = getRandom() ? circle_black : circle_white;
      const newCircle = this.makeCircle(x, texture);
      this.Composite.add(this.world, newCircle);
    }

    for (let j = 0; j < 3; j++) {
      const x = Math.random() * this.width;
      const newDiamond = this.makeDiamond(306, 447, x, eth_lg);
      this.bigDiamonds.push(newDiamond);
      this.Composite.add(this.world, newDiamond);
    }

    for (let j = 0; j < 3; j++) {
      const x = Math.random() * this.width;
      const newDiamond = this.makeDiamond(200, 300, x, eth_sm);
      this.smDiamonds.push(newDiamond);
      this.Composite.add(this.world, newDiamond);
    }

    if (!this.timer) {
      this.timer = setInterval(() => {
        this.bigDiamonds.forEach((diamond) => {
          diamond.render.sprite.texture = this.toggleTexture ? eth_lg_gray : eth_lg;
        });
        this.smDiamonds.forEach((diamond) => {
          diamond.render.sprite.texture = this.toggleTexture ? eth_sm_gray : eth_sm;
        });
        this.toggleTexture = !this.toggleTexture;
      }, 1000);
    }
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export const init = (canvas) => {
  return new MatterScene(canvas);
};
