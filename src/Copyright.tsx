import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from './Link'

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Main page
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
