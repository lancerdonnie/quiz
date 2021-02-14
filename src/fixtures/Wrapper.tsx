import React from 'react';
import { Provider } from 'react-redux';
import { mockStore } from './mockstore';
import { BrowserRouter as Router } from 'react-router-dom';

const Wrapper = ({ children }: any) => {
  return (
    <Provider store={mockStore}>
      <Router>{children}</Router>
    </Provider>
  );
};

export default Wrapper;
