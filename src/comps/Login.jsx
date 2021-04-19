import React from 'react';
import logo from '../img/logo.jpg';
import { Button, Typography } from '@material-ui/core';
import { auth, provider } from '../firebase/firebase';
import { actionTypes } from '../stateProvider/reducer';
import { useStateValue } from '../stateProvider/StateProvider';
import useStyles from './appStyles';

const Login = () => {
  const [state, dispatch] = useStateValue();
  const classes = useStyles();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className={classes.login}>
      <img src={logo} alt="login" />
      <Typography
        style={{
          margin: '30px 0px 30px 0px',
          fontWeight: 600,
          color: '#ff9933',
        }}
        variant="h2"
      >
        BEEBOOK
      </Typography>
      <Button
        type="submit"
        onClick={signIn}
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
