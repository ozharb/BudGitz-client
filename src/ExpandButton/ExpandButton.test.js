import React from 'react';
import ReactDOM from 'react-dom';
import ExpandButton from './ExpandButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExpandButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
