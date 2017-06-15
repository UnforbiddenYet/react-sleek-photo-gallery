export default class FancyImage {
  constructor(src, scale = {}) {
    this.src = src;
    this.image = null;
  }

  load() {
    return new Promise((resolve) => {
      this.image = new Image();
      this.image.onload = () => {
        resolve(this.image);
      };
      this.image.src = this.src;
    });
  }

  newSizeWithRatio() {
    let width = this.thumbnailScaledWidth;
    let height = this.thumbnailScaledHeight;

    if (!width && !height) return {};

    const imageWidth = this.image.width;
    const imageHeight = this.image.height;

    if (width) {
      const ratio = imageWidth / width;
      height = Math.round(imageHeight / ratio);
    } else if (height) {
      const ratio = imageHeight / height;
      width = Math.round(imageWidth / ratio);
    }

    return { width, height };
  }


  setDimensions() {
    const { width, height } = this.newSizeWithRatio();

    this.width = this.image.naturalWidth;
    this.height = this.image.naturalHeight;
    this.thumbnailWidth = width || this.width;
    this.thumbnailHeight = height || this.height;
  }
}
