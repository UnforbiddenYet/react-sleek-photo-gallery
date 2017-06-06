import config from '../config';

export default class FancyImage {
  constructor(src) {
    this.src = src;
    this.image = null;
  }

  load() {
    return new Promise((resolve) => {
      this.image = new Image();
      this.image.onload = () => {
        resolve(this.image);
        this.setDimensions();
      };
      this.image.src = this.src;
    });
  }

  newSizeWithRatio(sizes = {}) {
    let { width, height } = sizes;
    const imageWidth = this.image.width;
    const imageHeight = this.image.height;

    if (width) {
      const ratio = imageWidth / width;
      height = imageHeight / ratio;
    } else if (height) {
      const ratio = imageHeight / height;
      width = Math.round(imageWidth / ratio);
    }

    return { width, height };
  }


  setDimensions() {
    const { width, height } = this.newSizeWithRatio({ height: config.MAX_THUMBNAILS_HEIGHT });
    this.width = this.image.naturalWidth;
    this.height = this.image.naturalHeight;
    this.thumbnailWidth = width;
    this.thumbnailHeight = height;
  }
}
