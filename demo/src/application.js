import React from 'react';

import Gallery from '../../src/index';

const images = [
  'https://s20.postimg.org/jpw9aousd/865073ff66a6b7cd75f082c914d792de.jpg',
  'https://s20.postimg.org/qzmf74yql/f08fd483f6c633750d1c9a0496ae5056.jpg',
  'https://s20.postimg.org/utba2jqot/b00904ed862cac2575a036ac246c68d2.jpg',
  'https://s20.postimg.org/gbe2ujzdp/7fdf8b5efab4c2af0fc55e35d12774e8.jpg',
  'https://s20.postimg.org/9m7jeje1p/8ae0b8a6f492531eb1fe0fb37b6c1390.jpg',
  'https://s20.postimg.org/7ix46ve8t/34bd368f255da1f5a3acdd472e735d80.jpg',
  'https://s20.postimg.org/3ntq4av31/220f50065c2c2a56e8745e528f1d8727.jpg',
  'https://s20.postimg.org/4emga2xgd/74128c419e875fd8f7446b257b0af07a.jpg',
  'https://s20.postimg.org/dnomk76cd/85408b4ec374e71ba9a941b45c2dec95.jpg',
  'https://s20.postimg.org/syyfkt3od/a0e684c5b9551ba41d82ed9bf6cf23dc.jpg',
  'https://s20.postimg.org/iejwoh9st/0e9423835245e97977c0be7aa36d67db.jpg',
  'https://s20.postimg.org/tpr5ql61p/ae41f77e5a713d0b5d01d94dd0978ec1.jpg',
  'https://s20.postimg.org/6e7nf8h5p/c808a65f04eadaf85ca060e3cad0a4e7.jpg',
  'https://s20.postimg.org/pym6i0hr1/f090e8aea5f51e032897315c9d142171.jpg'
];


const Application = () => <Gallery images={images} thumbnailHeight="100" />;

export default Application;
