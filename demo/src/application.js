import React from 'react';

import Gallery from '../../src/components/gallery';

const generateImagesUrls = n =>
  [...Array(n)].map((_, index) =>
    require(`../img/0${index + 1}.jpg`)
  );


const Application = () => (
  <Gallery images={generateImagesUrls(14)} />
);

export default Application;
