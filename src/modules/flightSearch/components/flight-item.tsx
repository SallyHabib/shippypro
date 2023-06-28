import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {SteppedLineTo} from 'react-lineto';
import { thousandSeparator } from "../../../utils/global-services";
import { IFlightItem } from "../../../types/FlightItem";

const useStyles = makeStyles(() => ({
    textAlign: {
      textAlign: "right"
    },
    textAlignCenter: {
      textAlign: "center"
    },
    cardContainer: {
      marginBottom: 5
    }
}));

type FlightItemProps = {
    flightItem: IFlightItem;
    index: number;
}
  
const FlightItem = ({flightItem, index} : FlightItemProps)=> {

    const classes = useStyles();

    return (
        <Card className={classes.cardContainer}>
            <CardContent>
                <Grid container>
                    <Grid
                        item xs={2}
                        container
                        flexDirection={"row"}
                        alignItems={"center"}
                        className={classes.textAlignCenter}
                    >
                        <Avatar
                            src={'./logo.jpg'}
                            sx={{ width: 100, height: 100 }}
                            alt={flightItem.airlineName}
                        />
                        <div>
                            <Typography>{flightItem.airlineName}</Typography>
                            <Typography variant="caption">
                                {flightItem.flightNbr}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid
                        item
                        container
                        alignItems={"center"}
                        xs={3.5}
                        className={classes.textAlignCenter}>
                        <div className={`A-${index}`}>
                            <Typography align="center">
                                {flightItem.deptTime}
                            </Typography>
                            <Typography variant="caption">
                                {flightItem.deptCity}
                            </Typography>
                        </div>
                    </Grid>
                    
                    <Grid
                        item
                        container
                        alignItems={"center"}
                        xs={1}
                        className={classes.textAlignCenter}
                    >
                        <div className={`B-${index}`} />
                        <Grid container flexDirection={"column"} alignItems={"center"}>
                            <img width={50} height={50} src="./logo.jpg" alt="logo" />
                            <Typography variant="caption">
                            {Number(flightItem.noOfStops) == 0
                                ? `No Stops`
                                : `${flightItem.noOfStops} Stops`}
                            </Typography>
                        </Grid>
                        <div className={`C-${index}`} />
                    </Grid>
                
                    <Grid
                        item
                        container
                        alignItems={"center"}
                        justifyContent={"end"}
                        xs={3.5}
                        className={classes.textAlignCenter}
                    >
                        <div className={`D-${index}`}>
                            <Typography>{flightItem.arivalTime}</Typography>
                            <Typography variant="caption">
                                {flightItem.arivalCity}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item container alignItems={"center"} justifyContent={"end"} xs={2} className={classes.textAlign}>
                        <Typography
                            color="primary"
                        >{`${thousandSeparator(flightItem?.price)}`}</Typography>
                    </Grid>
                </Grid>
                <SteppedLineTo
                    from={`A-${index}`}
                    to={`B-${index}`}
                    borderStyle="dashed"
                    borderColor="black"
                    fromAnchor="center"
                    toAnchor="center"
                    delay={0}
                    orientation="h"
                />
                <SteppedLineTo
                    from={`C-${index}`}
                    to={`D-${index}`}
                    borderStyle="dashed"
                    borderColor="black"
                    delay={0}
                    orientation="h"
                />
            </CardContent>
        </Card>
    );

}
export default FlightItem;
