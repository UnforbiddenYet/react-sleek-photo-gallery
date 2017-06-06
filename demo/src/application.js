import React from 'react';

import Gallery from '../../src/components/gallery';

const images = [
  'https://assets0.ello.co/uploads/asset/attachment/5638532/ello-optimized-6e06917a.jpg',
  'https://assets0.ello.co/uploads/asset/attachment/5638509/ello-optimized-765cd455.jpg',
  'https://assets2.ello.co/uploads/asset/attachment/5638510/ello-optimized-38c1e9ff.jpg',
  'https://assets0.ello.co/uploads/asset/attachment/5646364/ello-optimized-166ca135.jpg',
  'https://assets2.ello.co/uploads/asset/attachment/5646365/ello-optimized-8640599f.jpg',
  'https://assets1.ello.co/uploads/asset/attachment/5630049/ello-optimized-fd492fb8.jpg',
  'https://assets1.ello.co/uploads/asset/attachment/5630050/ello-optimized-52e01533.jpg',
  'https://assets1.ello.co/uploads/asset/attachment/5638530/ello-optimized-fbe74b4b.jpg',
  'https://assets0.ello.co/uploads/asset/attachment/5376254/ello-optimized-031fdfaf.jpg',
  'https://assets0.ello.co/uploads/asset/attachment/5376256/ello-optimized-b2062b92.jpg',
  'https://assets0.ello.co/uploads/asset/attachment/5376258/ello-optimized-fb9398fa.jpg',
  'https://assets1.ello.co/uploads/asset/attachment/5376257/ello-optimized-4b38132e.jpg'
];

const Application = () => (
  <Gallery images={images} />
);

export default Application;
