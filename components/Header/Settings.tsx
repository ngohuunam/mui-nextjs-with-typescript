import React, { useState, useEffect, MouseEvent } from 'react';
import clsx from 'clsx';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './header-style';

let themeType = 'light';
if (typeof Storage !== 'undefined') {
  themeType = localStorage.getItem('luxiTheme') || 'light';
}

function Settings() {
  const [ctn, setCtn] = useState<HTMLElement | null>(null);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function handleClick(event: MouseEvent) {
    setAnchorEl(event.currentTarget as any);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    setCtn(document.getElementById('main-wrap'));
  });

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className={classes.setting}>
      <IconButton aria-describedby={id} aria-label='Settings' onClick={handleClick} className={clsx(classes.icon, open ? classes.active : '')}>
        <SettingsIcon fontSize='inherit' />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={ctn}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <List component='nav' className={classes.modeMenu} aria-label='Mode-menu' subheader={<ListSubheader component='div'>Theme Mode</ListSubheader>}>
          <ListItem>
            <Typography component='div'>
              <Grid component='label' container alignItems='center' spacing={1}>
                <Grid item>Light</Grid>
                <Grid item>Dark</Grid>
              </Grid>
            </Typography>
          </ListItem>
        </List>
        <Divider />
      </Popover>
    </div>
  );
}

export default Settings;
