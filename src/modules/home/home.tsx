import React, { lazy, Suspense } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid, CssBaseline, Container, Toolbar } from "@material-ui/core";

import "../../styles.css";

const Dashboard = lazy(() => import("./dashboard"));
// const Confirmation = lazy(() => import("../confirmation/confirmation"));
const FlightSearch = lazy(() => import("../flightSearch/pages/flight-search"));
// const FlightBooking = lazy(() => import("../booking/flight-booking"));

const Home = () => {
  return (
    <div className="root">
      <CssBaseline />
      <Router>
        {/* <Header /> */}
        <Toolbar />
        <Container>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <>
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path={`/`} Component={Dashboard} />
                    <Route
                      path={`/flight-search`}
                      Component={FlightSearch}
                    />
                    {/*
                    <Route
                      path={`/flight-booking`}
                      component={FlightBooking}
                    />
                    <Route
                      path={`/confirmation`}
                      component={Confirmation}
                    /> */}
                  </Routes>
                </Suspense>
              </>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </div>
  );
};

export default Home;
