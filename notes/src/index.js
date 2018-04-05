import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import logger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const persistState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : initialTestState;

// const store = createStore(notesReducer, persistState, composeEnhancers(applyMiddleware(logger)));
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));


// store.subscribe(()=>{
//   localStorage.setItem('reduxState', JSON.stringify(store.getState()));
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
