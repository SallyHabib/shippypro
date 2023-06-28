import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

import { Typography, Button } from "@material-ui/core";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h5">{`Welcome to Flight Booking App`}</Typography>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('flight-search')}
      >{`Search Flights Here`}</Button>
    </>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object
};

export default Dashboard;
