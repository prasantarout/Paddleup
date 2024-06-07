
import React, { useEffect } from 'react';
import StackNav from './src/navigators/StackNav';
import { useDispatch } from 'react-redux';
import { getTokenRequest } from './src/redux/reducer/AuthReducer';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getTokenRequest());
    }, 1000);
  }, []);


  return <StackNav />;
};

export default App;


