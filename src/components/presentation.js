import React, { PureComponent } from 'react';
import MediaQuery from 'react-responsive';

import Swipe from './swipe';

import ImageComponent from './image';
import config from '../config';

function ImageControls({
  disabledDirections,
  handleLeftButtonClick,
  handleRightButtonClick,
  handleImageClick
}) {
  return (
    <div className='controls' onClick={handleImageClick}>
      {disabledDirections.backward ? <div></div> : <button onClick={handleLeftButtonClick}>
        <span>{'<'}</span>
      </button>}
      {disabledDirections.forward ? <div></div> : <button onClick={handleRightButtonClick}>
        <span>{'>'}</span>
      </button>}
    </div>
  );
}

class Presentation extends PureComponent {
  leftDirection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.onDirectionChange) this.props.onDirectionChange(config.DIRECTION_BACKWARD);
  }

  rightDirection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.onDirectionChange) this.props.onDirectionChange(config.DIRECTION_FORWARD);
  }

  render() {
    const {
      activeImage,
      disabledDirections,
      enabledArrowsWhenWidth,
      height,
      onImageClick
    } = this.props;

    return (
      <div className='presentation' style={{ height }}>
        <MediaQuery minDeviceWidth={enabledArrowsWhenWidth || config.TABLET_BREAKEPOINT}>
          {activeImage ? <ImageControls
            handleLeftButtonClick={this.leftDirection}
            handleRightButtonClick={this.rightDirection}
            handleImageClick={onImageClick}
            disabledDirections={disabledDirections}
          /> : null}
        </MediaQuery>
        <Swipe
          className='image-wrapper center-flex'
          onClick={onImageClick}
          onSwipedLeft={this.rightDirection}
          onSwipedRight={this.leftDirection}
        >
          <ImageComponent image={activeImage} />
        </Swipe>
      </div>
    );
  }
}

export default Presentation;
