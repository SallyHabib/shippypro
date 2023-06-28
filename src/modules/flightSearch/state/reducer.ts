import { IAirportType } from "../../../types/AirportType";
import { IFlightItem } from "../../../types/FlightItem";
import { FlightsActions } from "./actions";

export type FlightsState = {
  loading: boolean
  airports: IAirportType[]
  result: IFlightItem[]
  error: string | null
}
const defaultState : FlightsState  = {
  loading: true,
  airports: [],
  result: [],
  error: null
};

const searchListReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case FlightsActions.GET_AIRPORTS_LIST_SUCCESS:
      return {
        ...state,
        airports: action.airports
      }

    case FlightsActions.GET_AIRPORTS_LIST_ERROR:
      return {
        ...state,
        error: action.error
      }

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
        airports: null,
        loading: true,
        result: null,
        error: null
      };
    default:
      return state;
  }
};




export default searchListReducer;
