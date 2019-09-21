import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { pushToServer } from 'middlewares/PushToServer';
import Reducers from 'reducers/Reducers';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
    thunk,
    pushToServer
];

export const store = createStore(
    Reducers,
    composeEnhancers(applyMiddleware(
        thunk,
        ...middlewares
    )));