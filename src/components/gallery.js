import React, { Component } from 'react';
import classNames from 'classnames';

import Presentation from './presentation';
import Thumbnails from './thumbnails';
import Preloader from './preloader';

import config from '../config';
import { getNextIndexBasedOnDirection, isInteger } from '../utils/helpers';
import styles from '../gallery.scss';

export default function GalleryApp ({ images }) {
  return (
    <Preloader images={images}>
      {loadedImages => <Gallery images={images} loadedImages={loadedImages}/>}
    </Preloader>
  )
}

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageIndex: 0,
      presentationMode: null
    };
  }

  handleDirectionChange = (direction) => {
    const { activeImageIndex } = this.state;
    const { loadedImages } = this.props;
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
    const { activeImageIndex, presentationMode } = this.state;
    const { images, loadedImages } = this.props;

    const className = classNames('gallery', { 'presentation-mode' : presentationMode });
    const activeImage = loadedImages.length && loadedImages[activeImageIndex];
    const thumbnails = loadedImages.length === images.length ? loadedImages : null;

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
          thumbnaiHeight={this.props.thumbhailHeight}
          disabled={presentationMode}
          images={thumbnails}
          onThumbnailClick={this.handleThumbnailClick}
          activeImageIndex={activeImageIndex}
        />
      </div>
    )
  }
}
