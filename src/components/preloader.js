import React, { Children, Component } from 'react';
import PropTypes from 'prop-types'

import FancyImage from '../utils/fancy-image';

export default class Preloader extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      loadedImages: []
    };
  }

  componentWillMount() {
    this.prefetchImages(this.props.images);
  }

  prefetchImages(imageUrls) {
    const loadedImages = [];

    function imageLoader(url) {
      const i = new FancyImage(url);
      loadedImages.push(i);
      return i.load();
    }

    const firstImageUrl = imageUrls[0];
    const restImageUrls = imageUrls.slice(1);

    imageLoader(firstImageUrl)
      .then(() => {
        this.setState({
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

  render() {
    const { children } = this.props;
    const { loadedImages } = this.state;

    if (typeof children === 'function') {
      const renderedChildren = this.props.children(loadedImages);
      return renderedChildren && Children.only(renderedChildren);
    }

    return Children.only(React.cloneElement(this.props.children, loadedImages));
  }
}
