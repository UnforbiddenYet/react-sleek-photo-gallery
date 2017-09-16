import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import classNames from 'classnames';

import Scroller from './scroller';
import Spinner from './spinner';

const OVERLAY_COLOR = 'rgba(255, 255, 255, 0.4)';

function Thumbnail({ image, active, height, onClick }) {
  const url = image.src || image;

  const backgroundImage = `url(${url})`;
  const activeBgGradient = `linear-gradient(${OVERLAY_COLOR}, ${OVERLAY_COLOR})`;

  const styles = {
    backgroundImage: active ? backgroundImage : `${activeBgGradient}, ${backgroundImage}`,
    width: `${image.thumbnailWidth}px`,
    height: `${image.thumbnailHeight}px`
  };

  return (
    <div
      className='thumbnail'
      onClick={onClick}
      style={styles}
    />
  )
}

export default function Thumbnails({
  images,
  activeImageIndex,
  disabled,
  thumbnailHeight,
  onThumbnailClick
}) {
  if (images === null) return (
    <div className='center-flex'>
      <Spinner />
    </div>
  );

  const className = classNames('thumbnails', {
    inactive: disabled
  });

  const thumbnails = images.map((d, index) =>
    (<Thumbnail
      key={d.src}
      image={d}
      onClick={() => onThumbnailClick(index)}
      active={activeImageIndex === index}
      height={thumbnailHeight}
    />)
  );

  return (
    <ContainerDimensions>
      { ({ width }) =>
        (<Scroller
          className={className}
          containerWidth={width}
          thumbnails={images.map(i => i.thumbnailWidth)}
          activeThumbnailIndex={activeImageIndex}
          velocityX={1.5}
        >
          {thumbnails}
        </Scroller>)
      }
    </ContainerDimensions>
  );
}
