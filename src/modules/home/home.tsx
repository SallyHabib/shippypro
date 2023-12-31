import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid, CssBaseline, Container, CardMedia } from "@mui/material";
import "../../styles.css";

const FlightSearch = lazy(() => import("../flightSearch/pages/flight-search"));

const Home = () => {
  return (
    <div className="root">
      <CssBaseline />
      <Router>
      <CardMedia
        component="img"
        height="250"
        image="/background.jpeg"          
      />
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
