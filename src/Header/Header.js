import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserInfo from '../UserInfo/UserInfo'
import TokenService from '../services/token-service'
import './Header.css'
import ApiContext from '../ApiContext'


export default class Header extends Component {

  state = {
    expand: false
  }
  handleItemExpand = e => {
    this.setState({
      expand: !this.state.expand
    })
  }
  handleLogoutClick = () => {
    let username = 'user'
    TokenService.clearAuthToken()
    window.localStorage.removeItem(username)
    this.context.handleLoggedOut()
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/login'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <div className="register">
          <Link
            to='/register'>
            Register
        </Link>
        </div>
        <div className='logi-in'>
          <Link
            to='/login'>
            Log in
        </Link>
        </div>
      </div>
    )
  }

  static contextType = ApiContext

  render() {
    const user = this.context.user


    const AccountDetails = this.state.expand
      ? <UserInfo />
      : null

    const logLink = TokenService.hasAuthToken()
      ? null
      : this.renderLoginLink()


    return (

      <nav className='Header'>
        <h1>
          <Link to='/lists'>
            <i className="fas fa-cash-register"><FontAwesomeIcon className='logo' icon='cash-register' /></i>
            {' '}
            BudGitz
          </Link>
        </h1>

        <div className='Header-user-info'>
          <div className="logout">
            <div>{logLink} </div>
          </div>
          {TokenService.hasAuthToken() &&
            <div className="user-profile"
              tag={Link}
              onClick={this.handleItemExpand}
            >
              <div className="username">
                <div className="user-profile-image">

                  <img src={`https://robohash.org/budgitz-${user}`} width="40" className="user-profile-img" alt="user-profile" />
                </div>

                <div>
                  <button
                    onClick={this.handleItemExpand}> {user} </button>
                </div>
                {AccountDetails}

              </div>

            </div>
          }
        </div>
      </nav>

    )
  }
}
