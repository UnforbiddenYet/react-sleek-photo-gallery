import config from '../config';

export function thumbnailWidthReducer(acc, w) {
  return acc + w + (config.THUMBNAIL_PADDING_HORIZONTAL * 2);
}

export function getNextIndexBasedOnDirection(items = [], currentIndex, direction) {
  let newIndex;

  if (direction === config.DIRECTION_BACKWARD) {
    newIndex = currentIndex - 1;
    newIndex = newIndex < 0 ? null : newIndex;
  } else if (direction === config.DIRECTION_FORWARD) {
    newIndex = currentIndex + 1;
    newIndex = newIndex > items.length - 1 ? null : newIndex;
  }

  return newIndex;
}

export function isInteger(x) {
  return Math.round(x) === x;
}

export function getTouchXPosition(event) {
  return Math.round(event.touches[0].clientX).toFixed(2);
}

export function calculateSwipeDirection(event, lastPositions = { x: 0, y: 0 }) {
  const xPos = getTouchXPosition(event);
  const distanceX = parseFloat((xPos - lastPositions.x).toFixed(2));
  const delta = config.MIN_DISTANCE_DELTA;

  if (Math.abs(distanceX) >= delta) {
    if (distanceX > delta) {
      return config.DIRECTION_FORWARD;
    } else if (distanceX < -delta) {
      return config.DIRECTION_BACKWARD;
    }
  }
  return null;
}

export function calculateTranslateX({ thumbnails, index = 0, containerWidth }) {
  let scrollerTranslateX = thumbnails
    .slice(0, index)
    .reduce(thumbnailWidthReducer, 0);

  scrollerTranslateX -= containerWidth * 0.5;
  scrollerTranslateX += thumbnails[index] * 0.5;

  return scrollerTranslateX * -1;
}

export function calculateEdgeTranslateXDistances({ thumbnails, containerWidth }) {
  return [0, thumbnails.length - 1]
    .map(index => calculateTranslateX({ thumbnails, index, containerWidth }));
}
