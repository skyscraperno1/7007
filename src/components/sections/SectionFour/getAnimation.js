export function getDelay(page) {
  const max = 9
  const rest = max - page;
  return Math.min(page, rest) - 1
}

export function getOffset(page) {
  page = page - 1;
  const rowLength = 4;
  const leftItems = [1, 2];
  const rightItems = [3, 4];
  const offsetY = page <= 3 ? 'top' : 'bottom';
  if (leftItems.includes(page % rowLength + 1)) {
    return {
      offsetX: 'left',
      offsetY
    }
  } else if (rightItems.includes(page % rowLength + 1)) {
    return {
      offsetX: 'right',
      offsetY
    }
  } else {
    return null;
  }
}

function calculateTimeProportions(distances, speed) {
  const times = distances.map(distance => distance / speed);
  const totalDuration = times.reduce((sum, time) => sum + time, 0);

  let cumulativeTime = 0;
  const timeProportions = times.map(time => {
      cumulativeTime += time;
      return cumulativeTime / totalDuration;
  });
  return [0, ...timeProportions];
}
function calculateDistances(start, end) {
  const distance1 = Math.abs(start - 0);
  const distance2 = Math.abs(start - end);
  const distance3 = Math.abs(end - 0);
  return [distance1, distance2, distance3];
}

export function getTransition(speed, tuple) {
  const [start, end] = tuple
  const distances = calculateDistances(start, end)
  const duration = distances.reduce((sum, distance) => sum + distance / speed, 0);
  const times = calculateTimeProportions(distances, speed);
  return {
    duration,
    times
  }
}

export function makeAnimationArr(arr) {
  return [0, ...arr, 0];
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
