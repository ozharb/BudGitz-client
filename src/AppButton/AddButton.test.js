import React from 'react';
import ReactDOM from 'react-dom';
import AppButton from './AppButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
