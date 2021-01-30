import React from 'react';
import ApiContext from '../ApiContext';
import './SummaryList.css'
import {countTotalForList, getItemsForList} from '../app-helpers'
export default class SummaryList extends React.Component {

static contextType = ApiContext;


render (){
const {listId} = this.props
const { items=[] } = this.context
 //const list = findList(lists, listId)
const summaryTotal = countTotalForList(items, listId)

const summaryDisplay = summaryTotal.length > 12 
? <>{summaryTotal.slice(0,7)}...<br/> {summaryTotal.slice(8,summaryTotal.length)}</>
: summaryTotal

const listItems = getItemsForList(items, listId).filter(item => item.calc)


return(
<div className="SummaryList">
    <div className="Summary-Total">
    <h4>BudGit Total:</h4>
    <h3> ${summaryDisplay} </h3>
</div>
<div className="Summary-Items">
Items in your BugGit Total:     
<ul className="items-scroll">

{listItems.map((item, i) =>
       <li key={`${item.id}-summary${i}`} >
           {item.item_name}
       </li>
    )}
</ul>    
</div>
</div>
)
}
}