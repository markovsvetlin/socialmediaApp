import React from 'react';
import logo from '../img/logo.jpg';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase/firebase';
import { actionTypes } from '../stateProvider/reducer';
import { useStateValue } from '../stateProvider/StateProvider';

const Login = () => {
  const [state, dispatch] = useStateValue();
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
    <>
      <img src={logo} alt="login" className="loginLogo" />
      <Button type="submit" onClick={signIn} variant="contained">
        Login
      </Button>
    </>
  );
};

export default Login;
