import  { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Autocomplete,
  Grid,
  TextField,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography
} from '@mui/material';
import { validateSearch } from "../../../utils/global-services";

import CityJSON from "../../../mocks/cities.json";
import { FlightsActions } from "../state/actions";
import FlightListOneWay from "../components/flight-list-one-way";

const cities = [...CityJSON];

const FlightSearch = () => {
  const sourceRef = useRef<string | undefined>("");
  const destinationRef = useRef<string | undefined>("");
  const [deptDate, setDeptDate] = useState<string | undefined>("");
  const [returnDate, setReturnDate] = useState<string | undefined>("");
  const [searchDone, setSearchDone] = useState<boolean>(false);
  const [selectTrip, setSelectTrip] = useState<string | undefined>("one");

  const [inputSource, setInputSource] = useState("");
  const [inputDest, setInputDest] = useState("");
  const [cityError, setCityError] = useState(false);
  const dispatch = useDispatch();

  // On Page Load
  useEffect(() => {
    // Reset Flight List
    dispatch({
      type: FlightsActions.RESET_FLIGHT_LIST
    });
  }, []);

  /**
   * @function handleSource
   * @param {object} newVal
   * @description get source city details
   */
  const handleSource = (newVal?: string) => {
      sourceRef.current = newVal || "";
  };

  /**
   * @function handleDestination
   * @param {string} newVal
   * @description get destination city details
   */
  const handleDestination = (newVal?: string) => {
    destinationRef.current = newVal || "";
  };

  /**
   * @function handleDeparture
   * @param {string} e
   * @description get departure time
   */
  const handleDeparture = (e: any) => {
    setDeptDate (e.target.value);
  };

  /**
   * @function handleSelectTrip
   * @param {object} e
   * @description get selected trip one way or round
   */
  const handleSelectTrip = (e: any) => {
    console.log(e)
    setSelectTrip(e.target.value);
  };

  /**
   * @function handleReturn
   * @param {object} e
   * @description get return date
   */
  const handleReturn = (e: any) => {
    setReturnDate(e.target.value);
  };

  /**
   * @function handleSearchFlight
   * @description Search Flight
   */
  const handleSearchFlight = () => {
    if (
      sourceRef.current?.toLowerCase() === destinationRef.current?.toLowerCase()
    ) {
      setCityError(true);
      setSearchDone(false);
      return;
    } else {
      setCityError(false);
    }
    dispatch({
      type: FlightsActions.GET_FLIGHT_LIST,
      request: {
        source : sourceRef.current,
        destination:  destinationRef.current,
        deptDate: deptDate,
        returnDate,
        tripType: selectTrip
      }
    });

    setSearchDone(true);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={12} md={12} style={{marginBottom: 25}}>
        <RadioGroup row onChange={handleSelectTrip} value={selectTrip}>
          <FormControlLabel
            value="one"
            control={<Radio color="primary" />}
            label="One Way"
          />
          <FormControlLabel
            value="both"
            control={<Radio color="primary" />}
            label="Round Trip"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} md={6} style={{marginBottom: 25}}>
        <Autocomplete
          value={sourceRef.current as string}
          inputValue={inputSource}
          onChange={(_, newValue) => {
            handleSource(newValue||"");
          }}
          onInputChange={(_, newInputValue) => {
            console.log(newInputValue)
            setInputSource(newInputValue);
          }}
          getOptionLabel={(option) => option}
          options={cities.map((city)=> city.name)}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Source City" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} style={{marginBottom: 25}}>
        <Autocomplete
          value={destinationRef.current}
          inputValue={inputDest}
          onChange={(_, newValue) => {
            handleDestination(newValue || "");
          }}
          onInputChange={(_, newInputValue) => {
            setInputDest(newInputValue);
          }}
          getOptionLabel={(option) => option}
          options={cities.map((city)=> city.name)}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destination City"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} style={{marginBottom: 25}}>
        <TextField
          label="Journey Date"
          type="date"
          value={deptDate}
          onChange={handleDeparture}
          variant="outlined"
          style={{ width: 300 }}
          InputLabelProps={{
            shrink: true
          }}
        />
      </Grid>
      {selectTrip?.toUpperCase() === "BOTH" && (
        <Grid item xs={12} md={6} style={{marginBottom: 25}}>
          <TextField
            label="Return Date"
            type="date"
            value={returnDate}
            onChange={handleReturn}
            variant="outlined"
            style={{ width: 300 }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      )}
      <Grid item xs={12} alignItems="center">
        <Button
          variant="contained"
          color="primary"
          style={{marginBottom: 25, alignItems: 'center'}}
          onClick={handleSearchFlight}
          disabled={validateSearch(
            sourceRef.current,
            destinationRef.current,
            deptDate,
            returnDate,
            selectTrip,
          )}
        >
          {`Search Flight`}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {cityError && (
          <Typography
            variant="body1"
            color="error"
          >{`Source and Destination City can not be same`}</Typography>
        )}
        {searchDone && (
          <FlightListOneWay />
        )}
      </Grid>
    </Grid>
  );
};

export default FlightSearch;
