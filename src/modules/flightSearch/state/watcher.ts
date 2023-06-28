import { takeEvery, all } from "redux-saga/effects";

import * as worker from "./worker";
import { FlightsActions } from "./actions";

export default function* watchFlightSearchSaga() {
  yield all([
    takeEvery(FlightsActions.GET_FLIGHT_LIST, worker.getFlightsList),
    takeEvery(FlightsActions.GET_AIRPORTS_LIST, worker.getAirportsList),
  ]);
}

