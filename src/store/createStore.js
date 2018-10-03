import { createStore, applyMiddleware, compose as reduxCompose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer, {
    initialState,
} from './reduxModules/index';

import rootSaga from './sagas/index';

const devToolsKey = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const persistConfig = {
    key: 'root',
    storage,
    debug: true,
};
let persistor;
export default () => {
    const sagaMiddleware = createSagaMiddleware();
    let compose = reduxCompose;
    if (typeof window !== 'undefined' && window[devToolsKey]) {
        compose = window[devToolsKey];
    }
    const store = createStore(
        persistReducer(persistConfig, rootReducer),
        initialState,
        compose(
            applyMiddleware(sagaMiddleware),
        ),
    );

    // if (module.hot) {
    //     module.hot.accept(() => {
    //         const nextRootReducer = require('./reduxModules/index');
    //         store.replaceReducer(
    //             persistReducer(persistConfig, nextRootReducer)
    //         );
    //     });
    // }

    sagaMiddleware.run(rootSaga);
    persistor = persistStore(store);

    return {
        store,
        persistor,
    };
};

export function getPersistor() {
    return persistor;
}