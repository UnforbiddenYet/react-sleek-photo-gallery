import React, { Component } from 'react';
import classNames from 'classnames';

import Presentation from './presentation';
import Thumbnails from './thumbnails';

import { getNextIndexBasedOnDirection, isInteger } from '../utils/helpers';
import styles from '../gallery.scss';

export default class Gallery extends Component {
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
    const { images, loadedImages, thumbnailHeight } = this.props;

    const className = classNames('gallery', { 'presentation-mode' : presentationMode });
    const thumbnails = loadedImages.length === images.length ? loadedImages : null;

    return (
      <div className={className}>
        <Presentation
          activeImage={loadedImages.length && loadedImages[activeImageIndex]}
          disabledDirections={{
            forward: activeImageIndex === loadedImages.length - 1,
            backward: activeImageIndex === 0
          }}
          onImageClick={this.handlePresentationClick}
          onDirectionChange={this.handleDirectionChange}
          height={`calc(100% - ${thumbnailHeight}px)`}
        />
        <Thumbnails
          disabled={presentationMode}
          images={thumbnails}
          onThumbnailClick={this.handleThumbnailClick}
          activeImageIndex={activeImageIndex}
          thumbnailHeight={thumbnailHeight}
        />
      </div>
    )
  }
}
