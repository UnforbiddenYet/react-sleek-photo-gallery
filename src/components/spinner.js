import React from 'react';

export default function Spinner() {
  return (
    <div className='spinner'>
      {[1, 2, 3].map(i => <div></div>)}
    </div>
  );
}
