import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { parseISO, toDate, format } from 'date-fns-tz'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faSkullCrossbones} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './Item.css'
import ApiContext from '../ApiContext'
import config from '../config'
import AppButton from '../AppButton/AppButton'
import ExpandButton from '../ExpandButton/ExpandButton'
import { getItemsForList, findItem } from '../app-helpers'


class Item extends Component {
  
  state = {
    expand: false,
};

static contextType = ApiContext;
handleChangeCalc = e => {
    e.preventDefault()
    const itemId = parseInt(this.props.id)
    const { items=[] } = this.context
    const item = findItem(items, itemId)
    const newItem = {...item, calc: !item.calc}
   
 fetch(config.API_ENDPOINT + `/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(newItem),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
    
         
            this.context.handleUpdate(newItem)

    
        })
        .catch(error => {
          console.error({ error })
        })
  };

 handleItemExpand = e => {
   this.setState({
     expand: !this.state.expand
   })
 } 
handleClickDelete = e => {
  e.preventDefault()
  const itemId = parseInt(this.props.id)


  fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      
    })
    .then(() => {

     
      this.context.deleteItem(itemId)

    })
    .catch(error => {
      console.error({ error })
    })
}


render(){
    const itemId = parseInt(this.props.id)
    const { items=[] } = this.context
    const item = findItem(items, itemId)
    console.log('details:', item.content)
    const expandItemButtonText = this.state.expand
? `﹀` 
:  `〉`
const itemDetails= this.state.expand
? <div className='Item__content'>
{item.content.split(/\n \r|\n/).map((para, i) =>
  <p key={i}>{para}</p>
)}
 <AppButton
  tag={Link}
  to={`/edit/${itemId}`}
        //   component={AddItem}
          className='MainList__edit-item-button'
        >
          {/* <FontAwesomeIcon icon='plus' /> */}
          Edit
        </AppButton>
</div>
:  null
    const calcButton = item.calc
    ? 'Remove'
     : 'Put Back'

  const { name, id, price, quantity, date_made, calc } = this.props
  return (
    <div className='Item'>
      <header className='Item-Header'>
            <ExpandButton
          type='button'
          onClick={this.handleItemExpand}
          className='Item__expand-item-button'>
          {expandItemButtonText}
        </ExpandButton>
      <h2 className='Item__name'>
        {/* <Link to={`/item/${id}`}> */}
          {name}
        {' | '}
          cost: ${price}
        {' | '}
          qty: {quantity}
        {/* </Link> */}
      </h2>
    
  
        </header>
  {itemDetails}
  <br />
      <button className = 'item_calc'
      type='radio' name = 'calc' 
      onClick={this.handleChangeCalc} 
      
      value = {calc}> 
      
      {calcButton}
      
      </button>

      <button className='item__delete' 
      type='button'
      onClick={this.handleClickDelete}
      >
         
        {/* <FontAwesomeIcon icon={faSkullCrossbones}  /> */}
        {' '}
        Delete
      </button>
      <div className='Item__date'>
        <div className='Item__date_made'>
          Added:
          {' '}
          <span className='date_made'>
            {
format(toDate(date_made), 'EEEE MM/dd/yyyy h:mm aaaaa\'m\' z', { timeZone : 'America/Los_Angeles' })}
          </span>
        </div>
      </div>
    </div>
  )
}
}
Item.defaultProps = {
  name:"",
  id: "",
}

Item.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.isRequired,
    item_name: PropTypes.string.isRequired,
  }),

}
export default Item