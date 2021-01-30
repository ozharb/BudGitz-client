import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import AppButton from '../AppButton/AppButton'
import './AllLists.css'

export default class AllLists extends React.Component {
  static contextType = ApiContext;

  componentDidMount(){
    window.scrollTo(0, 0)
  }
  render() {
    const { lists=[] } = this.context
    const noListsMessage = lists.length===0
    ? <div className="no-lists">
      <h3>You have no BugGitz</h3>
      <p> Make one<Link className="new-list-link" to='/add-list'>here</Link></p>
    </div>
    : null
    
  return (
    <div className='AllLists'>
      <h3>My BudGitz</h3>
         <div className='AllLists__button-container'>
        <AppButton
          type='button'
          tag={Link}
          to='/add-list'
          className='AllLists__add-list-button'
        >
          New
          <br />
          BugGit
          <br />
        </AppButton>
      </div>
      {noListsMessage}
      <ul className='AllLists__list'>
        {lists.map(list =>
          <li key={list.id}>
            <NavLink
              className='AllLists__list-link'
              to={`/lists/${list.id}`}
            >
              {list.list_name}
            </NavLink>
          </li>
        )}
      </ul>
      
    </div>
  )
}
}