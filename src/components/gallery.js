import React, { Component } from 'react';
import classNames from 'classnames';

import Presentation from './presentation';
import Thumbnails from './thumbnails';
import config from '../config';
import { makeImageInstanceAndLoad, getNextIndexBasedOnDirection, isInteger } from '../utils/helpers';
import styles from '../gallery.scss';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageIndex: null,
      loadedImages: []
    };
  }

  componentWillMount() {
    this.prefetchImages(this.props.images);
  }

  prefetchImages(imageUrls) {
    let loadedImages = [];

    function imageLoader(url) {
      return makeImageInstanceAndLoad(url, loadedImages);
    }

    const firstImageUrl = imageUrls[0];
    const restImageUrls = imageUrls.slice(1);

    imageLoader(firstImageUrl)
      .then(() => {
        this.setState({
          activeImageIndex: 0,
          loadedImages
        }, () => {
          Promise.all(restImageUrls.map(imageLoader)).then(() => {
            this.setState({
              loadedImages
            });
          });
        });
      });
  }

  handleDirectionChange = (direction) => {
    const { activeImageIndex, loadedImages } = this.state;
    const newActiveImageIndex = getNextIndexBasedOnDirection(loadedImages, activeImageIndex, direction);
    isInteger(newActiveImageIndex) && this.setState({ activeImageIndex: newActiveImageIndex });
  }

  handleThumbnailClick = (index) => {
    this.setState({ activeImageIndex: index });
  }

  handlePresentationClick = () => {
    this.setState({ presentationMode: !this.state.presentationMode });
  }

  render() {
    const { activeImageIndex, loadedImages, presentationMode } = this.state;
    const { images } = this.props;

    const activeImage = loadedImages.length && loadedImages[activeImageIndex];
    const thumbnails = loadedImages.length === images.length ? loadedImages : null;

    const className = classNames('gallery', { 'presentation-mode' : presentationMode });

    return (
      <div className={className}>
        <Presentation
          activeImage={activeImage}
          disabledDirections={{
            forward: activeImageIndex === loadedImages.length - 1,
            backward: activeImageIndex === 0
          }}
          onImageClick={this.handlePresentationClick}
          onDirectionChange={this.handleDirectionChange}
        />
        <Thumbnails
          disabled={presentationMode}
          images={thumbnails}
          onThumbnailClick={this.handleThumbnailClick}
          activeImageIndex={activeImageIndex}
        />
      </div>
    )
  }
}

export default Gallery;
