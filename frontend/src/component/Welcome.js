import { Grid, Typography } from "@material-ui/core";
// import logo from './69.png'
const Welcome = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{  minHeight: "93vh" , width:'100%'}}
    >
      <Grid item style={{width:'100%'}}>
      <img src={require('./workout.png')} style={{width:'100%'}}/>
        {/* <Typography variant="h2">Welcome to Job Portal</Typography> */}
      </Grid>
    </Grid>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
