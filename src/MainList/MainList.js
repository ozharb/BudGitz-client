import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Item from '../Item/Item'
import SummaryList from '../SummaryList/SummaryList'
import AddItem from '../AddItem/AddItem';
import AppButton from '../AppButton/AppButton'
import './MainList.css'
import ApiContext from '../ApiContext'
import { countItemsForList, getItemsForList, findList } from '../app-helpers'
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
  handleDeleteListButton = e => {
    this.setState({
      deletingList: !this.state.deletingList
    })
  }


  static contextType = ApiContext
  render() {
    const { listId } = this.props.match.params
    const { lists = [], items = [] } = this.context
    const list = findList(lists, listId)

    const currentList = { ...list }
    const listName = currentList.list_name

    const itemsForList = getItemsForList(items, listId)

    const listEmpty = itemsForList.length === 0
      ? <li className="empty-list-message">Add Some Items!</li>
      : null
    const addItemButtonText = this.state.addingItem
      ? <FontAwesomeIcon icon='minus' />
      : <FontAwesomeIcon icon='plus' />

    const howManyItems = countItemsForList(items, listId)

    const addItemForm = this.state.addingItem
      ? <AddItem listId={currentList.id}
        handleAddItemButton={this.handleAddItemButton}
      />
      : null


    return (
      <section className='MainList'>
        <Link to="/lists" className="back-to-lists">Back to my BudGitz</Link>
        <ApiError >
          <div className="MainList-Item">
            <h2>{listName}</h2>
            <article className="SummaryList-Main">
              <SummaryList
                listId={listId}
              />
            </article>
 You've got {howManyItems} {howManyItems === 1 ? 'item' : 'items'} in this BudGit
  <div className='MainList__button-container'>
              <AppButton
                type='button'
                tag={Link}
                to={`/delete-list/${listId}`}
                className='MainList__delete-list-button'
              >
                <i className="fas fa-skull"><FontAwesomeIcon className='skull' icon='skull' /></i>
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
                    calc={item.calc}
                    quantity={item.quantity}
                    date_made={item.date_made}
                  />

                </li>

              )}
            </ul>
            {addItemForm}
            <div className='MainList__button-container'>
              <button
                type='radio'
                onClick={this.handleAddItemButton}
                tabIndex={0}
                className='MainList__add-item-button'
              >

                {addItemButtonText}
                <br />
          Item
          <br />
              </button>
            </div>
          </div>
        </ApiError>
      </section>
    )
  }
}
MainList.defaultProps = {
  match: {},
}
MainList.propTypes = {
  props: PropTypes.shape({
    match: PropTypes.object,
  })
}
