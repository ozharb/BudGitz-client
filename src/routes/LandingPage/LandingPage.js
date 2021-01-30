import React, { Component } from 'react'
import './LandingPage.css' 
import {Link} from "react-router-dom"
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
        <section>
            <h3>Organize your projects, wishlists, grocery lists, even vacations!</h3>
    
        <p>[<em>placeholder for screenshot of dream recording interface</em>]</p>
        <p>The key to financial well-being is organization. BudGitz provides you with a quick and simple interface to breakdown big costs into small purchases to encourage thoughtful spending and by providing intuitive featurs for editing your purchases before you make them.</p>
        </section>
        <section>
          
            <h3>Calculate Totals As You go</h3>

        <p>[<em>placeholder for screenshot of calculated summary feature</em>]</p>
        <p> Watch your total costs add up in real-time as you add items to your list and use simple calculation options like adding expected tax or splitting costs to take your financial planning even further.</p>
        <p><em>"It's like receipts from the future!" - Marty McPhly</em></p>
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
