import React from 'react';
import EditItem from './EditItem';
import renderer from 'react-test-renderer';
window.scrollTo = jest.fn();

it('renders the UI as expected', () => {
  const tree = renderer
  
    .create(
    <EditItem match={{params: {itemId: 1}}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();  
  });