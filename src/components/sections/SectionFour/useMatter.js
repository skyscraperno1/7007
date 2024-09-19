import Matter from "matter-js";
import { getRandomInt } from "../SectionFive/getAnimation";

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandom() {
  return Math.random() > 0.5;
}
export const init = (canvas) => {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

  const width = canvas.getBoundingClientRect().width;
  const height = canvas.getBoundingClientRect().height;
  const engine = Engine.create(),
    world = engine.world;

  const render = Render.create({
    element: canvas,
    engine: engine,
    options: {
      width,
      height,
      background: "transparent",
      wireframes: false,
    },
  });

  Render.run(render);

  var runner = Runner.create();
  Runner.run(runner, engine);

  const ground = Bodies.rectangle(
    width / 2,
    height - window.innerHeight / 10,
    width,
    10,
    {
      isStatic: true,
    }
  );
  // const ceiling = Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true });
  const leftWall = Bodies.rectangle(0, height / 2, 10, height, { isStatic: true });
  const rightWall = Bodies.rectangle(width, height / 2, 10, height, { isStatic: true });
  // ceiling.render.visible = false;
  // ground.render.visible = false;
  rightWall.render.visible = false;
  leftWall.render.visible = false;
  Composite.add(world, [ground, leftWall, rightWall]);

  const mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(world, mouseConstraint);
  mouse.element.removeEventListener('wheel', mouse.mousewheel);
  mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
  const addCircle = (circle_black, circle_white) => {
    for (let i = 0; i < 4; i++) {
      const x = Math.random() * width; 
      const newCircle = Bodies.circle(x, 0, 75, {
        render: {
          sprite: {
            texture: getRandom() ? circle_black : circle_white,
          },
        },
      });
      Composite.add(world, newCircle);
    }
    for (let j = 0; j < 6; j++) {
      const x = Math.random() * width;
      const newPolygon = Bodies.rectangle(x, 0, 60, 60);
      Composite.add(world, newPolygon);
    }
  };
  return {
    addCircle,
  };
};
