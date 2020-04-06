import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
serviceWorker.register();
  // .then((registration) => {
  //   console.log('ServiceWorker registration successful with scope: ', registration.scope);
  // })
  // .catch((err) =>{
  //   console.log('ServiceWorker registeration failed: ', err);
  // });
