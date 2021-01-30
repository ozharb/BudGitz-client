import React, { Component } from 'react'
import LoginForm from '../LoginForm/LoginForm'
import { Section } from '../Utils/Utils'
import ApiContext from '../ApiContext'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
 

  handleLoginSuccess = () => {
   const { history } = this.props

  //   const destination = (location.state || {}).from || '/'
  
  setTimeout(() => {
      history.go(0)
     }, 1000); 
     
  setTimeout(() => {
  
        history.push('/lists')
        
     }, 2001); 

   
  //   history.push(destination)
    
    // this.context.handleLoggedIn()
 
  }
  static contextType = ApiContext
  render() {
    return (
      <Section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
        onLoginSuccess={this.handleLoginSuccess}
        />
      </Section>
    )
  }
}
