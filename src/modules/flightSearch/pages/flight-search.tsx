import  { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  Grid,
  TextField,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import { validateSearch } from "../../../utils/global-services";
import { FlightsActions } from "../state/actions";
import FlightListOneWay from "../components/flight-list-one-way";
import { IAirportType } from "../../../types/AirportType";

const FlightSearch = () => {
  const sourceRef = useRef<IAirportType | undefined | null>();
  const destinationRef = useRef<IAirportType | undefined | null>();
  const [deptDate, setDeptDate] = useState<string | undefined>("");
  const [viewDeptDateHelperText, setViewDeptDateHelperText] = useState<string | null>(null);
  const [viewReturnDateHelperText, setViewReturnDateHelperText] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | undefined>("");
  const [searchDone, setSearchDone] = useState<boolean>(false);
  const [selectTrip, setSelectTrip] = useState<string | undefined>("one");

  const [inputSource, setInputSource] = useState("");
  const [inputDest, setInputDest] = useState("");
  const [cityError, setCityError] = useState(false);
  const dispatch = useDispatch();
  const airports = useSelector((state: any) => state.flights.airports) as IAirportType[];
  // On Page Load
  useEffect(() => {
    // Reset Flight List
    dispatch({
      type: FlightsActions.RESET_FLIGHT_LIST
    });
  }, []);

  useEffect(() => {
   dispatch({type: FlightsActions.GET_AIRPORTS_LIST})
  },[])
  /**
   * @function handleSource
   * @param {object} newVal
   * @description get source city details
   */
  const handleSource = (newVal?: IAirportType | null) => {
      sourceRef.current = newVal;
  };

  /**
   * @function handleDestination
   * @param {string} newVal
   * @description get destination city details
   */
  const handleDestination = (newVal?: IAirportType | null) => {
    destinationRef.current = newVal;
  };

  /**
   * @function handleDeparture
   * @param {string} e
   * @description get departure time
   */
  const handleDeparture = (e: any) => {
    new Date(e.target.value || "") < new Date() ? setViewDeptDateHelperText('choosen date cannot be in the past') : setViewDeptDateHelperText(null)
    setDeptDate (e.target.value);
  };

  /**
   * @function handleSelectTrip
   * @param {object} e
   * @description get selected trip one way or round
   */
  const handleSelectTrip = (e: any) => {
    setSelectTrip(e.target.value);
  };

  /**
   * @function handleReturn
   * @param {object} e
   * @description get return date
   */
  const handleReturn = (e: any) => {
    new Date(e.target.value || "") < new Date()
    || new Date(e.target.value || "") < new Date(deptDate || "") ?
        setViewReturnDateHelperText('choosen date cannot be in the past or Return date should be bigger than dept date')
      :
        setViewReturnDateHelperText(null)
    setReturnDate(e.target.value);
  };

  /**
   * @function handleSearchFlight
   * @description Search Flight
   */
  const handleSearchFlight = () => {
    if (
      sourceRef.current?.name.toLowerCase() === destinationRef.current?.name.toLowerCase()
    ) {
      setCityError(true);
      setSearchDone(false);
      return;
    } else {
      setCityError(false);
    }
    dispatch({
      type: FlightsActions.GET_FLIGHTS_LIST,
      request: {
        departureCode : sourceRef.current?.code,
        arrivalCode:  destinationRef.current?.code,
        deptDate: deptDate,
        returnDate,
        tripType: selectTrip
      }
    });

    setSearchDone(true);
  };

  return (
    <Grid container alignItems="center" style={{marginTop: 10}}>      
      <Grid item xs={12} md={12} style={{ marginBottom: 25 }}>
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
          value={sourceRef.current}
          inputValue={inputSource}
          onChange={(_, newValue) => {
            handleSource(newValue);
          }}
          onInputChange={(_, newInputValue) => {
            setInputSource(newInputValue);
          }}
          getOptionLabel={(option) => option.name}
          options={airports}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Departure City/Airport" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} style={{marginBottom: 25}}>
        <Autocomplete
          value={destinationRef.current}
          inputValue={inputDest}
          onChange={(_, newValue) => {
            handleDestination(newValue);
          }}
          onInputChange={(_, newInputValue) => {
            setInputDest(newInputValue);
          }}
          getOptionLabel={(option) => option.name}
          options={airports}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Arrival City/Airport"
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
          error={viewDeptDateHelperText ? true : false}
          helperText={viewDeptDateHelperText}
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
            error={viewReturnDateHelperText ? true : false}
            helperText={viewReturnDateHelperText}
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
