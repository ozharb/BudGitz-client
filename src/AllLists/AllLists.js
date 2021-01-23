import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import AppButton from '../AppButton/AppButton'

export default class AllLists extends React.Component {
  static contextType = ApiContext;

  render() {
    const { lists=[], items =[] } = this.context
  return (
    <div className='AllLists'>
         <div className='AllLists__button-container'>
        <AppButton
          type='button'
          tag={Link}
          to='/add-list'
          className='AllLists__add-list-button'
        >
          {/* <FontAwesomeIcon icon='plus' /> */}
          
          New
          <br />
          BugGit
          <br />
        </AppButton>
      </div>
      <ul className='AllLists__list'>
        {lists.map(list =>
          <li key={list.id}>
            <NavLink
              className='AllLists__list-link'
              to={`/lists/${list.id}`}
            >
              {/* <span className='AllLists-items'>
                {countItemsForList(items, list.id)}
              </span> */}
              {list.list_name}
            </NavLink>
          </li>
        )}
      </ul>
      {/* <div className='AllLists__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-list'
          type='button'
          className='AllLists__add--button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          List
        </CircleButton>
      </div> */}
    </div>
  )
}
}