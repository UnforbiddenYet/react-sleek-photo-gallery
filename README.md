# Responsive Photo Gallery that supports mobile gestures. For React
Inspired by Apple Photos

## Features
- responsive gallery that works on mobile and desktop
- mobile gestures support
- horizontal thumbnails scroller
- thumbnails maintain the aspect ratio
- animated user interface
- presentation mode
- works perfectly in full-screen mode

## Installation

To install:

```
npm install --save react-sleek-photo-gallery
```

## Demo

[Full-screen photo gallery (photos taken by me)](https://react-sleek-photo-gallery.surge.sh)


## Local build
To build the demo locally, run:

```
npm install
npm start
```

Then open [`localhost:8080`](http://localhost:8080) in a browser.

## Usage

```jsx
import React from 'react';
import Gallery from 'react-sleek-photo-gallery';

export default function ExampleApp() {
  const PHOTOS = [
    'http://example.com/example/img1.jpg',
    'http://example.com/example/img2.jpg',
    'http://example.com/example/img3.jpg',
    'http://example.com/example/img4.jpg',
    'http://example.com/example/img5.jpg',
    'http://example.com/example/img6.jpg'
  ];

  return (
	  <Gallery images={PHOTOS} />
	);
}
```
