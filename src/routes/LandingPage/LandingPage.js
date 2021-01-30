import React, { Component } from 'react'
import './LandingPage.css' 
import {Link} from "react-router-dom"
import main from './images/budgitz-screenshot-main-list.jpg'
import allLists from './images/budgitz-screenshot-all-lists.jpg'
import userStatus from './images/budgitz-screenshot-user-info.jpg'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

 

  render() {
    return (
      <article className='LandingPage'>

<header role="banner">
            <h1>BudGitz</h1>
        </header>
        <h3> The legit way to budget</h3>
        <p>BudGitz helps you breakdown your personal financing into small bite-sized budgets that you can create and edit easily and quickly. Mini-budgeting makes for less worrying and more partying!</p> 
        <p>💃 🕺</p>
        <section className="app-features">
            <h3>Organize your projects, wishlists, grocery lists, even vacations!</h3>
    
            <img src={allLists} width = "100" className = "app-screenshot home" alt="app-screesnshot-home-page" />
        <p>The key to financial well-being is organization. BudGitz provides you with a quick and simple interface to breakdown big costs into small purchases
           to encourage thoughtful spending and creative planning. Us the app's intuitive features to edit purchases before you make them.</p>
        </section>
        <section>
          
            <h3>Calculate Totals As You go</h3>
            <img src={main} width = "100" className = "app-screenshot main" alt="app-screesnshot-main" />
        <p> Watch your total costs add up in real-time as you add items to your BudGit and use simple calculations to take your financial planning even further.</p>
        <p><em>"It's like receipts from the future!" - App user, Marty McPhly</em></p>
        <img src={userStatus} width = "100" className = "app-screenshot main" alt="app-screesnshot-main" />
            <h4>Add More BudGitz and watch your status go up!</h4>
       
      </section>
      <section>
      <h3>Register your new account now and get to BudGit-ing</h3>
        <Link className="register-button" 
        to={"/register"}>
        Register
        </Link>
       <h3>BudGitz Now, Buy Later</h3>
        </section>
      </ article>

    )
  }
}
