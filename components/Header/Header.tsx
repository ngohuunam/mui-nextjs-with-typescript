import React, { useState, useEffect, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Scrollspy from 'react-scrollspy';
import Settings from './Settings';
import MobileMenu from './MobileMenu';
import useStyles from './header-style';
import navMenu from './menu';
import Link from '../../src/Link';
import { useAuth } from '../../provider/auth/auth-provider-hook';
// import Avatar from '@material-ui/core/Avatar';

let counter = 0;
function createData(name: string, url: string) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
  };
}

function Header() {
  const { user } = useAuth();
  const [fixed, setFixed] = useState(false);
  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = scroll > 80;
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuList] = useState([
    createData(navMenu[0], '#' + navMenu[0]),
    createData(navMenu[1], '#' + navMenu[1]),
    createData(navMenu[2], '#' + navMenu[2]),
    createData(navMenu[3], '#' + navMenu[3]),
    createData(navMenu[4], '#' + navMenu[4]),
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <Fragment>
      {isMobile && <MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />}
      <AppBar position='relative' id='header' className={clsx(classes.header, fixed && classes.fixed)}>
        <Container>
          <div className={classes.headerContent}>
            <nav className={classes.navMenu}>
              {isMobile && (
                <IconButton onClick={handleOpenDrawer} className={clsx('hamburger hamburger--spin', classes.mobileMenu, openDrawer && 'is-active')}>
                  <span className='hamburger-box'>
                    <span className={clsx(classes.bar, 'hamburger-inner')} />
                  </span>
                </IconButton>
              )}
              <div className={classes.logo}>
                <Link href='/'>
                  <img src='/images/logo.svg' alt='logo' />
                </Link>
              </div>
              {isDesktop && (
                <Scrollspy items={navMenu} currentClassName='active'>
                  {menuList.map((item) => (
                    <li key={item.id.toString()}>
                      <Button href={item.url}>{item.name}</Button>
                    </li>
                  ))}
                  <li>
                    <Button href='#'>Contact</Button>
                  </li>
                </Scrollspy>
              )}
            </nav>
            <nav className={classes.userMenu}>
              {user ? <Settings /> : <Link href='/login'><Button variant='contained' color='primary'> Login </Button></Link>}
            </nav>
          </div>
        </Container>
      </AppBar>
    </Fragment>
  );
}

export default Header;
