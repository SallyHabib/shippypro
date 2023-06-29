import { call, put } from "redux-saga/effects";
import { FlightsActions } from "./actions";
import { get } from "../../../utils/xhr";

type Payload = {
  type: FlightsActions,
  request: {
    departureCode: string,
    arrivalCode: string,
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
  let url = `http://shippypro-api.eu-west-3.elasticbeanstalk.com/api/v1/flights?departureCode=${payload.request.departureCode}&arrivalCode=${payload.request.arrivalCode}&maxNoOfStops=${1}`;
  try {
    const jsonResponse: any = yield call(get, url);
    console.log(jsonResponse)
    const response = jsonResponse.data;
    yield put({
      type: FlightsActions.GET_FLIGHTS_LIST_SUCCESS,
      result: response,
      error: null
    });
  } catch (error: any) {
    const errorObj = JSON.parse(error.message);

    yield put({
      type: FlightsActions.GET_FLIGHTS_LIST_ERROR,
      result: null,
      error: {
        statusCode: errorObj.statusCode,
        message: errorObj.errorMessage
      }
    });
  }
}
