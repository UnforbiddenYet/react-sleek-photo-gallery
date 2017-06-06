const TRANSFORM_VARIANTS = {
  WebkitTransform: '-webkit-transform',
  transform: 'transform',
};

function test() {
  const testEl = document.createElement('div');
  const style = testEl.style;

  for (const [jsProp, cssProp] of Object.entries(TRANSFORM_VARIANTS)) {
    style.cssText = `${cssProp}: translate3d(0, 0, 0)`;

    if (style[jsProp] && style[jsProp].length) {
      return {
        js: jsProp,
        css: cssProp
      };
    }
  }
}

let property;

export default function getSupportedTransformProperty() {
  if (!property) {
    property = test();
  }
  return property;
}
