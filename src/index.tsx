import React from 'react';
import ReactDOM from 'react-dom';
import Image from './components/image/image';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ImageContainer } from './containers/imageContainer';
import Utility from './utils/utility';

ReactDOM.render(
  <React.StrictMode>
    <ImageContainer.Provider>
      <Utility />
      <Image />
    </ImageContainer.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
serviceWorker.unregister();
  // .then((registration) => {
  //   console.log('ServiceWorker registration successful with scope: ', registration.scope);
  // })
  // .catch((err) =>{
  //   console.log('ServiceWorker registeration failed: ', err);
  // });
