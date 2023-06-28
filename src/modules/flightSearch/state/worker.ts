import { put } from "redux-saga/effects";
import { filterBySourceDest } from "../../../utils/global-services";
import FlightJSON from "../../../mocks/flights-one-way-mumbai.json";
import { FlightsActions } from "./actions";

export type Payload = {
  type: FlightsActions,
  request: {
    source: string,
    destination: string,
    deptDate: string,
    returnDat: string,
    tripType: string
  }
}
export function* getFlightsList(payload: Payload) {
  // put API URL here
  let url = "";
  const jsonResponse = [...FlightJSON];
  try {
    // uncomment when API is available
    //const response = yield call(get, url);

    const response = filterBySourceDest(payload.request, jsonResponse);

    yield put({
      type: FlightsActions.GET_FLIGHT_LIST_SUCCESS,
      result: response,
      error: null
    });
  } catch (error: any) {
    const errorObj = JSON.parse(error.message);

    yield put({
      type: FlightsActions.GET_FLIGHT_LIST_ERROR,
      result: null,
      error: {
        statusCode: errorObj.statusCode,
        message: errorObj.errorMessage
      }
    });
  }
}
