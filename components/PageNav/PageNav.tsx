import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Tooltip from '@material-ui/core/Tooltip';
import navMenu from '../Header/menu';
import useStyles from './pagenav-style';
import Link from '../../src/Link';

interface MenuListItem {
  id: number;
  name: String;
  url: String;
}

function createData(id: number, name: String, url: String): MenuListItem {
  return {
    id,
    name,
    url,
  };
}

function PageNav() {
  const [show, setShow] = useState(false);
  let flagShow = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagShow = scroll > 500;
    if (flagShow !== newFlagShow) {
      setShow(newFlagShow);
      flagShow = newFlagShow;
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  const classes = useStyles();
  const [menuList] = useState([
    createData(1, navMenu[0], '#' + navMenu[0].replace(/ /g, '_')),
    createData(2, navMenu[1], '#' + navMenu[1].replace(/ /g, '_')),
    createData(3, navMenu[2], '#' + navMenu[2].replace(/ /g, '_')),
    createData(4, navMenu[3], '#' + navMenu[3].replace(/ /g, '_')),
  ]);
  return (
    <div className={clsx(classes.pageNav, show && classes.show)}>
      <Tooltip
        title='To Top'
        placement='left'
        classes={{
          tooltip: classes.tooltip,
        }}>
        <Fab color='primary' aria-label='To top' href='/' className={classes.fab}>
          <ArrowUpwardIcon />
        </Fab>
      </Tooltip>
      <nav>
        {menuList.map((item) => (
          <li key={item.id.toString()} style={{ top: 30 * (navMenu.length - item.id) }} data-id={item.id}>
            <Tooltip
              title='ok'
              placement='left'
              classes={{
                tooltip: classes.tooltip,
              }}>
              <Link href={item.url} />
            </Tooltip>
          </li>
        ))}
      </nav>
    </div>
  );
}

PageNav.propTypes = {
  t: PropTypes.func.isRequired,
};

export default PageNav;
