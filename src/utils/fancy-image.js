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
      };
      this.image.src = this.src;
    });
  }

  setThumbnailSize({ width: newWidth, height: newHeight }) {
    let width = newWidth;
    let height = newHeight;

    if (!width && !height) return {};

    const imageWidth = this.image.width;
    const imageHeight = this.image.height;

    if (!(width && height)) {
      if (width) {
        const ratio = imageWidth / width;
        height = Math.round(imageHeight / ratio);
      } else if (height) {
        const ratio = imageHeight / height;
        width = Math.round(imageWidth / ratio);
      }
    }

    this.thumbnailHeight = parseInt(height, 10);
    this.thumbnailWidth = parseInt(width, 10);

    return { width, height };
  }
}
