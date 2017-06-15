import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import classNames from 'classnames';

import Scroller from './scroller';

function Thumbnail({ image, active, onClick }) {
  const url = image.src || image;
  const styles = {
    backgroundImage: `url(${url})`,
    width: image.thumbnailWidth
  };

  return (
    <div
      className={classNames('thumbnail', { active })}
      onClick={onClick}
      style={styles}
    ></div>
  )
}

export default function Thumbnails({
  images,
  activeImageIndex,
  disabled,
  onThumbnailClick,
}) {
  if (images === null) return null;

  const className = classNames('thumbnails', {
    inactive: disabled
  });

  const thumbnails = images.map((d, index) =>
    (<Thumbnail
      key={d.src}
      image={d}
      onClick={() => onThumbnailClick(index)}
      active={activeImageIndex === index}
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
