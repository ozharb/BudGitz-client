import React, { Component } from 'react'
import { Input, Required } from '../Utils/Utils'
import AuthApiService from '../services/auth-api-service'
import './RegistrationForm.css'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null,
            registered: false
           }

  handleSubmit = ev => {
    ev.preventDefault()
    const { full_name, nick_name, user_name, password } = ev.target
    this.setState({ error: null })
      AuthApiService.postUser({
        user_name: user_name.value,
        password: password.value,
        full_name: full_name.value,
        nickname: nick_name.value,
      })
        .then(user => {

    full_name.value = ''
    nick_name.value = ''
    user_name.value = ''
    password.value = ''
      this.setState({registered:true})    
    this.props.onRegistrationSuccess()
  })
  .catch(res => {
    this.setState({ error: res.error })
  })
  }
  showPassword = e => {
    const password = document.getElementById("RegistrationForm__password")
  
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }
  render() {
    const { error } = this.state
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        { this.state.registered ? <p className='green'>Registration complete.</p>:
        <>
        <div className='full_name'>
          <label htmlFor='RegistrationForm__full_name'>
            Full name <Required />
          </label>
          <Input
            name='full_name'
            type='text'
            required
            id='RegistrationForm__full_name'>
          </Input>
        </div>
        <div className='user_name'>
          <label htmlFor='RegistrationForm__user_name'>
            User name <Required />
          </label>
          <Input
            name='user_name'
            type='text'
            required
            id='RegistrationForm__user_name'
            autoComplete="username">
          </Input>
        </div>
        
        <div className='password'>
       
          <label htmlFor='RegistrationForm__password'>
          Password <Required />{' '}
        <span className="tool" data-tip="Password must be longer than 8 characters and contain 1 upper case, lower case, number and special character" tabIndex="1"> 
          {' '} ⓘ
          
           </span>
           <span className = "show-password">
           <input name="show-password" type="checkbox" onClick={this.showPassword} />Show Password
           </span>
           <label className="password-tip"><br />Password must be longer than 8 characters and contain 1 upper case, lower case, number and special character </label> 
          </label>
          <Input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'
            autoComplete="new-password">
          </Input>
          
        </div>
        <div className='nick_name'>
          <label htmlFor='RegistrationForm__nick_name'>
            Nickname
          </label>
          <Input
            name='nick_name'
            type='text'
            id='RegistrationForm__nick_name'>
          </Input>
        </div>
        <button type='submit'>
          Register
        </button>
        </>}
      </form>
    )
  }
}
