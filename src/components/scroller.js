import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import throttle from 'throttle-debounce/throttle'

import Swipe from './swipe';
import getSupportedTransformProperty from '../utils/get-supported-translate-property';
import { getTouchXPosition, calculateTranslateX, calculateEdgeTranslateXDistances, thumbnailWidthReducer } from '../utils/helpers';
import config from '../config';

const transformProperty = getSupportedTransformProperty();

class Scroller extends Component {
  constructor(props) {
    super(props);

    const {
      thumbnails,
      containerWidth,
      velocityX
    } = props;

    const [leftEdge, rightEdge] = calculateEdgeTranslateXDistances({ thumbnails, containerWidth });

    this.state = {
      leftEdge,
      rightEdge,
      scrollerTranslateX: leftEdge
    };

    this.lastTranslateX = leftEdge;
    this.VELOCITY_X = velocityX || 1;

    this.throttledHandleWheel = throttle(100, this.throttledHandleWheel);
  }

  componentDidMount() {
    this.root.addEventListener('wheel', this.handleWheel);
    this.root.addEventListener('touchstart', this.handleTouchStart);
    this.root.addEventListener('touchmove', this.handleTouchMove);
  }

  componentWillUnmount() {
    this.root.removeEventListener('wheel', this.handleWheel);
    this.root.removeEventListener('touchstart', this.handleTouchStart);
    this.root.removeEventListener('touchmove', this.handleTouchMove);
  }

  componentWillReceiveProps(newProps) {
    const state = {};
    const {
      activeThumbnailIndex: index,
      containerWidth,
      thumbnails
    } = newProps;
    const widthChange = containerWidth !== this.props.containerWidth;


    if (newProps.activeThumbnailIndex !== this.props.activeThumbnailIndex || widthChange) {
      state.scrollerTranslateX = calculateTranslateX({ thumbnails, index, containerWidth });
      this.lastTranslateX = state.scrollerTranslateX;
    }

    if (thumbnails.length !== this.props.thumbnails.length || widthChange) {
      const [leftEdge, rightEdge] = calculateEdgeTranslateXDistances({ thumbnails, containerWidth });
      state.leftEdge = leftEdge;
      state.rightEdge = rightEdge;
    }

    Object.keys(state) && this.setState(state);
  }

  throttledHandleWheel = (event) => {
    this.makeTransform(-event.deltaX * this.VELOCITY_X);
  }


  handleTouchStart = (event) => {
    this.lastTouchX = getTouchXPosition(event);
  }

  handleTouchMove = (event) => {
    const touchX = getTouchXPosition(event);
    const deltaX = touchX - this.lastTouchX;

    this.makeTransform(deltaX * this.VELOCITY_X);
    this.lastTouchX = touchX;
  }

  handleWheel = (event) => {
    event.preventDefault();
    this.throttledHandleWheel(event);
  }

  makeTransform(deltaX) {
    const newTranslateXPosition = this.lastTranslateX + deltaX;

    if (newTranslateXPosition > this.state.leftEdge
      || newTranslateXPosition < this.state.rightEdge
      || this.lastTranslateX === newTranslateXPosition) return;

    this.el.style.transform = `translate3d(${newTranslateXPosition}px, 0, 0)`;
    this.lastTranslateX = newTranslateXPosition;
  }

  render() {
    const { containerWidth, thumbnails, children } = this.props;

    return (
      <div
        ref={e => { this.root = e; }}
        style={{ width: containerWidth }}
      >
        <div
          className='scroller'
          style={{
            [transformProperty.js]: `translate3d(${this.state.scrollerTranslateX}px, 0, 0)`,
            width: thumbnails.reduce(thumbnailWidthReducer, 0)
          }}
          ref={e => {this.el = e;}}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Scroller;
