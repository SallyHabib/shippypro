import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ErrorBoundaries = (children: any) => {
  const [hasError, setHasError] = useState(false);
  const flightsState = useSelector((state: any) => state.flights);

  useEffect(() => {
    if (flightsState.error) setHasError(true);
    
  }, [flightsState.error]);
  
  return( 
    hasError ? <h1>{`Something went wrong..`}</h1>
      :
     { children }
  );
}

export default ErrorBoundaries;
