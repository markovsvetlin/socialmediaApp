import React from 'react';
import AppBar from './comps/AppBar';
import Feed from './comps/Feed';
import Login from './comps/Login';
import { useStateValue } from './stateProvider/StateProvider';

function App() {
  const [{ user }] = useStateValue();
  return !user ? (
    <Login />
  ) : (
    <div>
      <AppBar />
      <Feed />
    </div>
  );
}

export default App;
