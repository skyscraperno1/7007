import Matter from "matter-js";

function getRandom() {
  return Math.random() > 0.5;
}

class MatterScene {
  constructor(canvas, isMobile) {
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
    this.scale = isMobile ? 0.5 : 1;

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

    this.diamonds = [];
    this.circles = []

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
    const size = this.scale * 75
    return this.Bodies.circle(x, 0, size, {
      render: {
        sprite: {
          texture,
          xScale: this.scale,
          yScale: this.scale
        },
      },
    });
  }

  makeDiamond(x, texture) {
    const vertices = [
      { x: 147 * this.scale, y: 35 * this.scale },
      { x: 150 * this.scale, y: 335 * this.scale },
      { x: 49 * this.scale, y: 199 * this.scale },
      { x: 252 * this.scale, y: 199 * this.scale }
    ]
    return this.Bodies.fromVertices(x, 0, vertices, {
      render: {
        sprite: {
          texture,
          xScale: this.scale,
          yScale: this.scale
        },
      },
    });
  }

  addItem(circle_black, circle_white, eth_sm) {
    for (let i = 0; i < 4; i++) {
      const x = Math.random() * this.width;
      const texture = getRandom() ? circle_black : circle_white;
      const newCircle = this.makeCircle(x, texture);
      this.circles.push(newCircle)
      this.Composite.add(this.world, newCircle);
    }

    for (let j = 0; j < 3; j++) {
      const x = Math.random() * this.width;
      const newDiamond = this.makeDiamond(x, eth_sm);
      this.diamonds.push(newDiamond);
      this.Composite.add(this.world, newDiamond);
    }
  }

  clearItem() {
    this.diamonds.forEach(body => {
      this.Composite.remove(this.world, body);
    });
    this.diamonds = []; 

    this.circles.forEach(body => {
      this.Composite.remove(this.world, body);
    });
    this.circles = []; 
  }
}

export const init = (canvas, isMobile) => {
  return new MatterScene(canvas, isMobile);
};
