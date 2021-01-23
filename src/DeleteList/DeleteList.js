import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'
import './DeleteList.css';
import AppForm from '../AppForm';
import PropTypes from 'prop-types';
import { getItemsForList, findList, getListName} from '../app-helpers'

export default class DeleteList  extends React.Component{
    state = {
        listDeleted: false,
    
    };
   
    
    
    
    handleClickCancel = e => {
      e.preventDefault()
      const { listId } = this.props.match.params
      console.log('cancel')
      this.props.history.push(`/lists/${listId}`)
    }
    handleClickDelete = e => {
        e.preventDefault()
       
        const { listId } = this.props.match.params
  
      
      
        fetch(`${config.API_ENDPOINT}/lists/${listId}`, {
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
      
           
            this.context.deleteList(listId)
            
            this.setState({
              listDeleted: true
            })
          })
          .catch(error => {
            console.error({ error })
          })
      }
    
static contextType = ApiContext;

static defaultProps = {
    history: {
        push: () => {}
    },
}



render(){
  const { listId } = this.props.match.params
  const { lists = [], items=[] } = this.context
  const list = findList(lists, listId)
    
//  const name = getListName(list)
console.log('listid:', listId)
console.log('list:', list)
const currentList = {...list}
const listName = currentList.list_name


  const display = this.state.listDeleted
  ? <div>
    <p>BudGit Deleted</p>
    <Link to="/"><p>Back to my BudGitz</p></Link>
  </div>
  :   <div>
  <h3>Delete {listName}?</h3>
  <AppForm onSubmit={this.handleClickDelete}
  onCancel={this.handleClickCancel}>
  <button type="cancel" className='buttons' onClick={this.handleClickCancel}>No</button>
  <button className='buttons' type = "submit">Yes</button>
  </AppForm>
  </div>


    return(
        <section className='delete-list'>
        {display}
        </section>


    )
}
}

DeleteList.defaultProps = {
    item: "",
    list: ""
}
DeleteList.propTypes = {
    item: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired
  }