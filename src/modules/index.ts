import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { all } from 'redux-saga/effects';
import searchListReducer from './flightSearch/state/reducer';
import watchFlightSearchSaga from './flightSearch/state/watcher';


export const rootReducer = combineReducers({
    flights: searchListReducer,
    router: routerReducer
})

export function* rootSaga() {
    yield all([watchFlightSearchSaga()]);
}

