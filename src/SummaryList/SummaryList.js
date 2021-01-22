import React from 'react';
import ApiContext from '../ApiContext';
import {countTotalForList, getItemsForList, findList} from '../app-helpers'
export default class SummaryList extends React.Component {

static contextType = ApiContext;

render (){
const {listId} = this.props
const { lists = [], items=[] } = this.context
 const list = findList(lists, listId)
const summaryTotal = countTotalForList(items, listId)
console.log('all items in list', getItemsForList(items, listId))
const listItems = getItemsForList(items, listId).filter(item => item.calc)
return(
<div >
<h3> Summary </h3>
<ul>
Items in your BudGit: {listItems.map(item =>
       <li key={item.id}>
           {item.item_name}

       </li>
    )}
</ul>    
Total: ${summaryTotal}
</div>
)
}
}