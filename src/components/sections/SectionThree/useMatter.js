import Matter from 'matter-js';
export const init = (canvas) => {
  var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;

  const width = canvas.getBoundingClientRect().width;
  const height = canvas.getBoundingClientRect().height;
  
  // create engine
  var engine = Engine.create(),
      world = engine.world;

  // create renderer
  var render = Render.create({
      element: canvas,
      engine: engine,
      options: {
          width,
          height,
          // showAngleIndicator: true,
          background: 'transparent',
          wireframes: false 
      }
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies
  // 创建上下边界
    const ground = Bodies.rectangle(width / 2, height, width, 10, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, 0, width, 10, { isStatic: true });

    // 创建左右边界
    const leftWall = Bodies.rectangle(0, height / 2, 10, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width, height / 2, 10, height, { isStatic: true });
  Composite.add(world, [
      ground,
      ceiling,
      leftWall,
      rightWall
  ]);
  const renderBox = {
    fillStyle: '#fff', // 填充颜色
    strokeStyle: '#0000FF', // 边框颜色
    lineWidth: 5 // 边框宽度
  }
  var stack = Composites.stack(100, 0, 10, 8, 10, 10, function(x, y) {
      return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1, render: renderBox });
  });

  Composite.add(world, [
      stack,
      Bodies.polygon(200, 0, 3, 60, {
        render: renderBox
      }),
      Bodies.polygon(400, 0, 5, 60, {
        render: renderBox 
      }),
      Bodies.rectangle(600, 0, 80, 80, {
        render: renderBox 
      })
  ]);

  // add mouse control
  var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
              render: {
                  visible: false
              }
          }
      });

  Composite.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // wrapping using matter-wrap plugin
  // var allBodies = Composite.allBodies(world);

  // for (var i = 0; i < allBodies.length; i += 1) {
  //     allBodies[i].plugin.wrap = {
  //         min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
  //         max: { x: render.bounds.max.x + 100, y: render.bounds.max.y }
  //     };
  // }
   // Function to add a new polygon
 const addPolygon = () => {
    const newPolygon = Bodies.polygon(200, 0, 3, 60, { render: renderBox });
    Composite.add(world, newPolygon);
  };
  const addImg = (imagePath) => {
    const newPolygon = Bodies.polygon(200, 0, 3, 60, { 
        render: {
            sprite: {
                texture: imagePath,
                xScale: 0.5, // 缩放图片，0.5 表示 50% 大小（可根据需要调整）
                yScale: 0.5  // 缩放图片，0.5 表示 50% 大小（可根据需要调整）
            }
        }
    });
    Composite.add(world, newPolygon);
};

  // Return the addPolygon method so it can be called externally
  return {
    addPolygon,
    addImg
  };
}