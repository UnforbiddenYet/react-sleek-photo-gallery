import React, { Component } from 'react';

import { calculateSwipeDirection, getTouchXPosition } from '../utils/helpers';
import config from '../config';

class Swipe extends Component {

  constructor(props) {
    super(props);

    this.startPositionX = null;
    this.moving = false;
    this.swiped = false;
  }

  onMove = (event) => {
    if (this.moving && !this.swiped) {
      if (event.touches && event.touches.length !== 1) return;

      const swipeDirection = calculateSwipeDirection(event, { x: this.startPositionX });

      if (!swipeDirection) return;

      if (swipeDirection === config.DIRECTION_BACKWARD) {
        this.props.onSwipedLeft && this.props.onSwipedLeft(event, getTouchXPosition(event));
      } else if (swipeDirection === config.DIRECTION_FORWARD) {
        this.props.onSwipedRight && this.props.onSwipedRight(event, getTouchXPosition(event));
      }

      this.swiped = true;
    }
  }

  onMoveStart = (event) => {
    this.moving = true;
    this.startPositionX = getTouchXPosition(event);
    this.props.onSwipeStart && this.props.onSwipeStart();
  }

  onMoveEnd = (event) => {
    this.moving = false;
    this.swiped = false;
    this.props.onSwipeEnd && this.props.onSwipeEnd();
  }

  render() {
    const { onClick, className, children } = this.props;
    return (
      <div
        className={className}
        onClick={onClick}
        onTouchStart={this.onMoveStart}
        onTouchMove={this.onMove}
        onTouchEnd={this.onMoveEnd}
      >
        {children}
      </div>

    )
  }
}

export default Swipe;
