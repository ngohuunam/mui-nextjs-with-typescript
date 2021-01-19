import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...props}>
      {'Copyright © '}
      <MuiLink color="inherit" href="/">
        Main page
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
