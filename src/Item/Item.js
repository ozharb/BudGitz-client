import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { toDate, format } from 'date-fns-tz'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import './Item.css'
import ApiContext from '../ApiContext'
import config from '../config'
import AppButton from '../AppButton/AppButton'
import { findItem } from '../app-helpers'
import TokenService from '../services/token-service'

class Item extends Component {
  
  state = {
    expand: false,
    error: null,
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
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
          console.log(newItem)
           this.context.handleUpdate(newItem)

        })
        .catch(res => {
         this.setState({ error: res.error.message})
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
      'content-type': 'application/json',
      'authorization': `bearer ${TokenService.getAuthToken()}`,
    },
  })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      
    })
    .then(() => {

     
      this.context.deleteItem(itemId)

    })
    .catch(res => {
      this.setState({ error: res.error.message})
    })
}



render(){
  const { error } = this.state
    const itemId = parseInt(this.props.id)
    const { items=[] } = this.context
    const item = findItem(items, itemId)
    // const itemCalc = this.props.calc
    const expandItemButtonText = this.state.expand
?  <i className="fas fa-chevron-down"><FontAwesomeIcon className='chevron' icon='chevron-down' /></i> 
:   <i className="fas fa-chevron-right"><FontAwesomeIcon className='chevron' icon='chevron-right' /></i>
const itemDetails= this.state.expand
? <div className='Item__content'>

    {item.content.split(/\n \r|\n/).map((para, i) =>
        <p key={i}>{para}</p>)}
 <AppButton
  tag={Link}
  to={`/edit/${itemId}`}
className='MainList__edit-item-button'>
Edit
</AppButton>
</div>
:  null

const calcButton = this.props.calc
    ?    <i className="fas fa-check-circle"><FontAwesomeIcon className='check-circle' icon='check-circle' /></i>
     :  <i className="fas fa-circle"><FontAwesomeIcon className='circle' icon='circle' /></i>

  const { name, price, quantity, date_made, calc } = this.props
  const date = toDate(date_made)
  return (
    <div className='Item'>
    
      <header className='Item-Header'>
        <div className="item-name-expand">
            <button
          type='button'
          onClick={this.handleItemExpand}
          className='Item__expand-item-button'>
          {expandItemButtonText}
        </button>
 </div>
      <h3 className='Item__name' onClick={this.handleItemExpand}>
 
       
          {name}
 </h3>
 <div role='alert'>
          {error && <p className='red'>{error}..hmm. Try refreshing the page.</p>}
           </div>

        <div className="item-remove-delete">
    <div className="remove-button"> 
    <button className = 'item__calc'
      type='radio' name = 'calc' 
      onClick={this.handleChangeCalc} 
      value = {calc}> 
      {calcButton}
      </button>
      </div>
      <div className="delete-button">
          <button className='item__delete' 
      type='button'
      onClick={this.handleClickDelete} > 
       <i className="fas fa-times"><FontAwesomeIcon className='times' icon='times' /></i>
      </button>
      </div>
     </div>
        </header>
        <div className="item-cost-qty">
        <div className='item-cost-display'>   cost: ${price} </div>
      
        <div className="item-qty-display"> qty: {quantity}</div>  
        </div>
  {itemDetails}
  <br />
      <div className='Item__date'>
        <div className='Item__date-made'>
          Added:
          {' '}
          <span className='date-made'>
            {format(date, 'EEEE MM/dd/yyyy')}
          </span>
        </div>
      </div>
    </div>
  )
}
}
Item.defaultProps = {
  item_name:"",
  id: "",
} 

Item.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.isRequired
  }),

}
export default Item