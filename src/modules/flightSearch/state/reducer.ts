import { FlightObj } from "../components/flight-list-one-way";
import { FlightsActions } from "./actions";

export type FlightsState = {
  loading: boolean
  result: FlightObj[]
  error: string | null
}
const defaultState : FlightsState  = {
  loading: true,
  result: [],
  error: null
};

const searchListReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case FlightsActions.GET_FLIGHT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.result,
        error: null
      };
    case FlightsActions.GET_FLIGHT_LIST_ERROR:
      return {
        ...state,
        loading: false,
        result: null,
        error: action.error
      };
    case FlightsActions.RESET_FLIGHT_LIST:
      return {
        ...state,
        loading: true,
        result: null,
        error: null
      };
    default:
      return state;
  }
};




export default searchListReducer;
