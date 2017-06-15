import React from 'react';

import Gallery from './components/gallery';
import Preloader from './components/preloader';
import config from './config';

export default function GalleryApp({ images, thumbnailHeight = config.THUMBNAIL_HEIGHT, ...rest }) {
  return (
    <Preloader images={images} maxThumbnailHeight={thumbnailHeight}>
      {loadedImages => (<Gallery
        loadedImages={loadedImages}
        images={images}
        thumbnailHeight={thumbnailHeight}
        {...rest}
      />)}
    </Preloader>
  );
}
