import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import { Input } from '../Utils/Utils'
import ApiContext from '../ApiContext'
import './LoginForm.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }
  static contextType = ApiContext

  state = { error: null,
            loginStatus: false }

  

  handleSubmitJwtAuth = ev => {
      ev.preventDefault()
      this.setState({ error: null })
      const { user_name, password } = ev.target
      AuthApiService.postLogin({
        user_name: user_name.value,
        password: password.value,
      })
        .then(res => {
          const username = 'user'
          user_name.value = ''
          password.value = ''
          window.localStorage.setItem(username, res.user_name)
          this.context.saveUsername(res.user_name)
          TokenService.saveAuthToken(res.authToken)
          this.props.onLoginSuccess()
          this.setState({loginStatus: true})
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }
    showPassword = e => {
      const password = document.getElementById("LoginForm__password")
    
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    } 
  render() {
    const { error, loginStatus } = this.state
  

    return (
      
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
           </div>
          {loginStatus? <p className='green'>Success!</p> : 
          <>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <Input
            required
            name='user_name'
            id='LoginForm__user_name'
            autoComplete="user_name">
          </Input>
        </div>

        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <span className = "show-password">
           <input name="show-password" type="checkbox" onClick={this.showPassword} />Show Password
           </span>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'
            autoComplete = "current-password"
            >
           
          </Input>
        </div>
       
        <button type='submit'>
          Login
        </button>
         </>}
      </form>
    )
  }
}
