import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid, CssBaseline, Container, Toolbar } from "@material-ui/core";
import "../../styles.css";
import { AppBar, Typography } from "@mui/material";

const FlightSearch = lazy(() => import("../flightSearch/pages/flight-search"));

const Home = () => {
  return (
    <div className="root">
      <CssBaseline />
      <Router>
        <AppBar>
          <Toolbar>
            <Typography>{`Flight Booking App`}</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <>
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path={`/`} Component={FlightSearch} />
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
