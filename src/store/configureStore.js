/**
 * Created by lijie on 16/7/21.
 */


import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'

import rootReducer from './reducer';



const middleware = [ thunk ];
if ( process.env.NODE_ENV !== 'development' ) {
    middleware.push(createLogger());
}

export default function configureStore(initialState) {

    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(
            ...middleware
        ),
        // Add other middleware on this line...
        window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducer', () => {
            const nextReducer = require('./reducer').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
