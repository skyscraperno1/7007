import Matter from "matter-js";
import { getRandomInt } from "../SectionFour/getAnimation";

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
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
      showAngleIndicator: true,
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
  const ceiling = Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true });
  const leftWall = Bodies.rectangle(0, height / 2, 10, height, {
    isStatic: true,
  });
  const rightWall = Bodies.rectangle(width, height / 2, 10, height, {
    isStatic: true,
  });
  ceiling.render.visible = false;
  ground.render.visible = false;
  rightWall.render.visible = false;
  leftWall.render.visible = false;
  Composite.add(world, [ground, ceiling, leftWall, rightWall]);

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
  const addImg = (pathA, pathB) => {
    const numImages = getRandomInt(1, 5)
    for (let i = 0; i < numImages; i++) {
      const x = Math.random() * width; // 随机生成图片的x坐标
      const scale = getRandomFloat(0.25, 0.75)
  
      const newPolygon = Bodies.polygon(x, 0, 3, 60, {
        render: {
          sprite: {
            texture: Math.random() > .5 ? pathA : pathB,
            xScale: scale,
            yScale: scale,
          },
        },
      });
      Composite.add(world, newPolygon);
    }
  };
  return {
    addImg,
  };
};
