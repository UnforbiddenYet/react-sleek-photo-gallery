import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import Application from './application';
import styles from './styles.css';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Application);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./application', () => {
    render(Application);
  });
}
