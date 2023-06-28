import { call, put } from "redux-saga/effects";
import { filterBySourceDest } from "../../../utils/global-services";
import { FlightsActions } from "./actions";
import { get } from "../../../utils/xhr";

type Payload = {
  type: FlightsActions,
  request: {
    source: string,
    destination: string,
    deptDate: string,
    returnDat: string,
    tripType: string
  }
}

export function* getAirportsList(): any {
  let url = "http://shippypro-api.eu-west-3.elasticbeanstalk.com/api/v1/airports";
  try {
    const jsonResponse: any = yield call(get, url);
    const response = jsonResponse.data;
    yield put({
      type: FlightsActions.GET_AIRPORTS_LIST_SUCCESS,
      airports: response,
      error: null
    });
  }
  catch (error: any) {
    const errorObj = JSON.parse(error.message);

    yield put({
      type: FlightsActions.GET_AIRPORTS_LIST_ERROR,
      result: null,
      error: {
        statusCode: errorObj.statusCode,
        message: errorObj.errorMessage
      }
    });
  }

}
export function* getFlightsList(payload: Payload): any{
  // put API URL here
  let url = "http://shippypro-api.eu-west-3.elasticbeanstalk.com/api/v1/airports";
  // const jsonResponse = [...FlightJSON];
  try {
    // uncomment when API is available
    const jsonResponse: any = yield call(get, url);
    console.log(jsonResponse.data)
    const response = filterBySourceDest(payload.request, jsonResponse.data);
    console.log(response)
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
