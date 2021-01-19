import React, { useState, useEffect, MouseEvent } from 'react';
import clsx from 'clsx';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import useStyles from './header-style';
import { useAuth } from '../../provider/auth/auth-provider-hook';
import Avatar from '@material-ui/core/Avatar';
import { useRouter } from "next/router";
import Link from '../../src/Link';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Settings() {
  const { user, firebaseClient } = useAuth();
  const router = useRouter();
  const [ctn, setCtn] = useState<HTMLElement | null>(null);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [backdropOpen, setbackdropOpen] = React.useState(false);

  function handleClick(event: MouseEvent) {
    setAnchorEl(event.currentTarget as any);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    setCtn(document.getElementById('main-wrap'));
  });

  const logout = () => {
    setAnchorEl(null);
    setbackdropOpen(true)
    firebaseClient.auth().signOut().then(() => router.push("/")).catch(e => alert(e.message))
  };

  const deleteUser = () => {
    setAnchorEl(null);
    setbackdropOpen(true)
    fetch(`${location.origin}/api/user/delete/${user?.uid}`, { method: 'delete' }).then(res => {
      console.log(res.status)
      if (res.status === 200) { logout() }
      else { res.json().then(json => alert(json.mess)) }
    })
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className={classes.setting}>
      <Backdrop style={{ zIndex: 2000, color: '#fff' }} open={backdropOpen} onClick={() => setbackdropOpen(false)}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <IconButton aria-describedby={id} aria-label='Settings' onClick={handleClick} className={clsx(classes.icon, open ? classes.active : '')}>
        {/*
        // @ts-ignore */}
        <Avatar src={user?.photoURL} />
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
        <List component='nav' className={classes.modeMenu} aria-label='Mode-menu'>
          <ListItem component={Link} href="/profile">
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem button onClick={deleteUser}>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
        <Divider />
      </Popover>
    </div >
  );
}

export default Settings;
