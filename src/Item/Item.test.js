import React from 'react';
import Item from './Item';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

it('renders the UI as expected', () => {
  const tree = renderer
    
    .create(
    <BrowserRouter>
    <Item props={{item: {calc: true, item_name:'none'}}} date_made={0}/>
     </BrowserRouter>
    )

    
    .toJSON();
 
  expect(tree).toMatchSnapshot();  
  });