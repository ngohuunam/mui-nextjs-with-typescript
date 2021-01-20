import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/core/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Alert = React.forwardRef((props: AlertProps, ref) => <MuiAlert elevation={6} variant="filled"  {...props} ref={ref} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

export default function MySnackbars({ open, severityType = 'warning', message = 'Loading...' }: { open: boolean, severityType?: Color, message?: string }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={SlideTransition}>
        <Alert icon={<CircularProgress size={30} thickness={7} />} severity={severityType}>
          <Typography variant='h5'>{message}</Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}