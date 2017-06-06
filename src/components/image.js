import React from 'react';

import Spinner from './spinner';

function ImageComponent({ image }) {
  const src = image && (image.src || image);

  if (!src) return <Spinner/>;

  return (
    <img className='image' src={src} />
  );
}

export default ImageComponent;
