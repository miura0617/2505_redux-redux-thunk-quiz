// composeは、redux-thunkを読み込んでいるから使う
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
// Chromeのredux-devtool拡張が入っているか確認している
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);

export default store;
