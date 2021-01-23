import React from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Item from '../Item/Item'
import SummaryList from '../SummaryList/SummaryList'
import AddItem from '../AddItem/AddItem';
import DeleteList from '../DeleteList/DeleteList';
import AppButton from '../AppButton/AppButton'
import './MainList.css'
import ApiContext from '../ApiContext'
import { countItemsForList, getItemsForList, findList, getListName} from '../app-helpers'
import ApiError from '../ApiError'
import PropTypes from 'prop-types';


export default class MainList extends React.Component {
    state = {
        addingItem: false,
        deletingList: false,
    };

  static defaultProps = {
    match: {
      params: {}
    }
  }

  handleAddItemButton = e => {
     
    this.setState({
        addingItem: !this.state.addingItem
    })
}
handleDeleteListButton = e =>{
    this.setState({
        deletingList: !this.state.deletingList
    })
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
     ? <li className="empty-list-message">Add Some Items!</li>
      : null
const addItemButtonText = this.state.addingItem
? '-'
: '+'

const howManyItems = countItemsForList(items, listId)

const addItemForm = this.state.addingItem
? <AddItem listId={currentList.id}
handleAddItemButton={this.handleAddItemButton}
/>
: null


  return (
    <>
     <Link to="/"><h3>Back to my Lists</h3></Link>
   <ApiError >
    <section className='MainList'>
  <h2>{listName}</h2>
 You've got {howManyItems} {howManyItems===1 ?'item':'items'} in this BudGit
  <div className='MainList__button-container'>
  <AppButton
type='button'
tag={Link}
to={`/delete-list/${listId}`}

className='MainList__delete-list-button'
>
  {/* <FontAwesomeIcon icon='plus' /> */}

Delete BudGit

</AppButton>
      </div>
     
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
      {addItemForm}
      <div className='MainList__button-container'>
        <AppButton
          type='button'
          onClick={this.handleAddItemButton}
        //   component={AddItem}
          
          className='MainList__add-item-button'
        >
          {/* <FontAwesomeIcon icon='plus' /> */}
          
          {addItemButtonText}
          <br />
          Item
          <br />
        </AppButton>
      </div>
      <article className="SummaryList-Main">
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
