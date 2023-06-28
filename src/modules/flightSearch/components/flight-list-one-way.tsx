import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import TablePagination from '@mui/base/TablePagination';
import { useSelector } from "react-redux";
import { useState } from "react";
import FlightItem from "./flight-item";
import { Skeleton } from "@mui/material";
export type FlightObj = {
  flightNbr: string,
  airlineName: string,
  airlineLogo: string,
  deptTime: string,
  deptCity: string,
  arivalTime: string,
  arivalCity: string,
  noOfStops: string,
  price: string
}


const FlightListOneWay = () => {
  const flightsState = useSelector((state: any) => state.flights);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  let component = null;
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (flightsState.loading) {
    component =
      (
        <>
          <Skeleton animation="wave" />
        </>
      );
  } else if (flightsState?.result?.length > 0) {
    component = (
      <Table>
        <TableBody>
          {flightsState.result
            .map((val: FlightObj, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <FlightItem flightItem={val} index={index} />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={flightsState.result.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    );
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
