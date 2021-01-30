import React from 'react';
import ReactDOM from 'react-dom';
import DeleteList from './DeleteList';
window.scrollTo = jest.fn();

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<DeleteList match={{params: {listId: 1}}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
