import React from 'react';
import { AppBar as Appbar, Toolbar, Avatar } from '@material-ui/core';
import useStyles from './appStyles';
import logo from '../img/logo.jpg';
import { useStateValue } from '../stateProvider/StateProvider';

const AppBar = () => {
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();
  return (
    <>
      <Appbar position="static" color="primary">
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            <img className={classes.logo} src={logo} alt="logo" />
          </div>
          <div className="avatar">
            <Avatar src={user.photoURL} />
          </div>
        </Toolbar>
      </Appbar>
    </>
  );
};

export default AppBar;
