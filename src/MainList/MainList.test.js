import React from 'react';
import ReactDOM from 'react-dom';
import MainList from './MainList';
import { BrowserRouter } from 'react-router-dom'
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <MainList match={{params: {listId: 1}}}/>
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});