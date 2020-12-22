import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
//import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // ANs version
//import * as atatus from 'atatus-js'; // CF version differs from atatus
/*import * as atatus from 'atatus-spa'; */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/* added in exercise 4.6 continuous delivery */
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();
//serviceWorkerRegistration.register();                                     // ANs version
/*atatus.config('f83f753b07db491c8a72576f781d4c9b').install();*/

//To check that Atatus has been integrated successfully, at the bottom of your “index.js” file.
//atatus.notify(new Error('Test Atatus Setup'));

/* added in early 4.x, 4.2? 4.3? */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//To check that Atatus has been integrated successfully, at the bottom of your “index.js” file.
//atatus.notify(new Error('Test Atatus Setup'));
