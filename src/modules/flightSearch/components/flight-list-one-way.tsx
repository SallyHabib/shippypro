import {
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import FlightItem from "./flight-item";
import { Skeleton } from "@mui/material";
import { IFlightItem } from "../../../types/FlightItem";

const FlightListOneWay = () => {
  const flightsState = useSelector((state: any) => state.flights);

  let component = null;

  if (flightsState.loading) {
    component =
      (
        <>
          <Skeleton animation="wave" />
        </>
      );
  } else if (flightsState?.result?.length > 0) {
    component = (
      flightsState.result
        .map((val: IFlightItem, index: number) =>
          <FlightItem flightItem={val} index={index} />)
            )
  } else if (flightsState?.result?.length === 0) {
    component = <Typography>{`No Records Found..`}</Typography>;
  } else if (flightsState?.error) {
    component = <Typography>{`Unable to fetch Data...`}</Typography>;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {component}
      </Grid>
    </Grid>
  );
};

export default FlightListOneWay;
