import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './modules';


const sagaMiddleware = createSagaMiddleware();

let middleware = applyMiddleware(sagaMiddleware);

let composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

export default createStore( rootReducer, {}, composeEnhancers(
    middleware
));


sagaMiddleware.run(rootSaga);