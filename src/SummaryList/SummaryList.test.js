import React from 'react';
import ReactDOM from 'react-dom';
import SummaryList from './SummaryList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SummaryList />, div);
  ReactDOM.unmountComponentAtNode(div);
});