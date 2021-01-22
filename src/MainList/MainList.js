import React from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Item from '../Item/Item'
import SummaryList from '../SummaryList/SummaryList'
// import CircleButton from '../CircleButton/CircleButton'
// import './NoteListMain.css'
import ApiContext from '../ApiContext'
import { getItemsForList, findList, getListName} from '../app-helpers'
import ApiError from '../ApiError'
import PropTypes from 'prop-types';

export default class MainList extends React.Component {
  

  static defaultProps = {
    match: {
      params: {}
    }
  }
 
  static contextType = ApiContext
render(){
  const { listId } = this.props.match.params
  const { lists = [], items=[] } = this.context
  const list = findList(lists, listId)
    
//  const name = getListName(list)
console.log('listid:', listId)
console.log('list:', list)
const currentList = {...list}
const listName = currentList.list_name

console.log('listname: ', currentList.list_name)
  const itemsForList = getItemsForList(items, listId)
  const listEmpty = itemsForList.length === 0
     ? <li className="empty-list-message">List empty</li>
      : null

  return (
    <>
   <ApiError>
    <section className='MainList'>
  <h2>{listName}</h2>
      <ul>
       {listEmpty}
      {itemsForList.map(item =>
       
          <li key={item.id}>
          
            <Item
              
              id={item.id}
              name={item.item_name}
              price={item.price}
              quantity={item.quantity}
              date_made={item.date_made}

              
            />
         
          </li>

        )}
      </ul>
      {/* <div className='MainList__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div> */}
      <article className="SummaryList">
        <SummaryList 
        listId = {listId}
        />

    </article>
    </section>
    </ApiError>
    </>
  )
}
}
MainList.defaultProps = {
  items: [],
}
MainList.propTypes = {
  context: PropTypes.shape({
    items: PropTypes.array
  })
}
