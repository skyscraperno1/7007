import Matter from "matter-js";

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
  const leftWall = Bodies.rectangle(0, height / 2, 10, height, {
    isStatic: true,
  });
  const rightWall = Bodies.rectangle(width, height / 2, 10, height, {
    isStatic: true,
  });
  ground.render.visible = false;
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
  mouse.element.removeEventListener("wheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
  const addCircle = (
    circle_black,
    circle_white,
    eth_lg,
    eth_sm,
    eth_lg_gray,
    eth_sm_gray
  ) => {
    let circles = [];
    for (let i = 0; i < 4; i++) {
      const x = Math.random() * width;
      const newCircle = Bodies.circle(x, 0, 75, {
        render: {
          sprite: {
            texture: getRandom() ? circle_black : circle_white,
          },
        },
      });
      circles.push(newCircle);
    }
    let toggleTexture = true;
    let big_diamonds = [];
    const _height = 447;
    const _width = 306;
    for (let j = 0; j < 3; j++) {
      const x = Math.random() * width;
      const y = 0;

      const vertices = [
        { x: x, y: y - _height / 2 },
        { x: x + _width / 2, y: y },
        { x: x, y: y + _height / 2 },
        { x: x - _width / 2, y: y },
      ];

      const newDiamond = Bodies.fromVertices(x, y, vertices, {
        render: {
          sprite: {
            texture: eth_lg,
          },
        },
      });

      big_diamonds.push(newDiamond); // 将新建的菱形添加到数组中
    }

    let sm_diamonds = [];
    const h = 300;
    const w = 200;
    for (let j = 0; j < 3; j++) {
      const x = Math.random() * width;
      const y = 0;

      const vertices = [
        { x: x, y: y - h / 2 },
        { x: x + w / 2, y: y },
        { x: x, y: y + h / 2 },
        { x: x - w / 2, y: y },
      ];

      const newDiamond = Bodies.fromVertices(x, y, vertices, {
        render: {
          sprite: {
            texture: eth_sm,
          },
        },
      });

      sm_diamonds.push(newDiamond); // 将新建的菱形添加到数组中
    }
    setInterval(() => {
      big_diamonds.forEach((diamond) => {
        diamond.render.sprite.texture = toggleTexture ? eth_lg_gray : eth_lg; // 切换纹理
      });
      sm_diamonds.forEach((diamond) => {
        diamond.render.sprite.texture = toggleTexture ? eth_sm_gray : eth_sm; // 切换纹理
      });
      toggleTexture = !toggleTexture; // 切换状态
    }, 1000); // 每 1000 毫秒（1 秒）切换一次
    Composite.add(world, [...circles, ...big_diamonds, ...sm_diamonds]);
  };
  return {
    addCircle,
  };
};
