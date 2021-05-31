import React, { Component } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import main from "./images/budgitz-screenshot-main-list.jpg";
import allLists from "./images/budgitz-screenshot-all-lists.jpg";
import userStatus from "./images/budgitz-screenshot-user-info.jpg";

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  render() {
    return (
      <>
        <article className="LandingPage">
          <header role="banner">
            <h1>BudGitz</h1>
          </header>
          <h3> The legit way to budget</h3>
          <p>
            BudGitz helps you break down your personal financing into small
            bite-sized budgets that you can build and edit on the fly.
            Mini-budgeting makes for less worrying and more partying.
          </p>
          <p className="emojis">💃 🕺</p>
          <p className="caption">These two sure know how to budget.</p>
          <section className="app-features">
            <h3>
              Organize your projects, wishlists, grocery lists, even vacations!
              <p className="emojis">🏖</p>
            </h3>
            <img
              src={allLists}
              width="200"
              className="app-screenshot home"
              alt="app-screesnshot-home-page"
            />
            <p>
              The key to financial well-being is organization. BudGitz provides
              you with a quick and simple interface to break down big costs into
              small purchases to encourage thoughtful spending and creative
              planning. Use the app's intuitive features to edit purchases
              before you make them.
            </p>
          </section>
          <section>
            <h3>Calculate Totals As You go</h3>
            <img
              src={main}
              width="200"
              className="app-screenshot main"
              alt="app-screesnshot-main"
            />
            <p>
              {" "}
              Watch your total costs update in real-time as you add, remove, and
              edit items in each BudGit making your financial planning fast and
              furious.
            </p>
            <p>
              <em>
                "It's like receipts from the future!" - App user, Marty McPhly
              </em>
            </p>
            <p className="emojis">🧾😎</p>
            <p>
              Keep track of your user status in your user profile (just click
              your personal robot in the top right).
            </p>
            <img
              src={userStatus}
              width="200"
              className="app-screenshot main"
              alt="app-screesnshot-main"
            />
            <h4>Add More BudGitz and watch your status go up!</h4>
            <p className="emojis">☁️🚀</p>
            <p>
              Start out as a <b>Lil Budgitter</b>, add enough Budgitz and get to
              coveted
              <b>Legendary status</b>.
            </p>
            <p className="emojis">🤑</p>
          </section>
          <section>
            <h3>
              Stop questioning your life and register your new account now
            </h3>
            <Link
              className="register-button"
              to={{
                pathname: "/register",
                state: { fromHome: true },
              }}
            >
              Register
            </Link>
            <h3>BudGitz Now, Buy Later</h3>
          </section>

          <div className="github-link-container">
            Additional information available on
            <a
              className="github-link"
              href="https://github.com/ozharb/budgitz-client"
            >
              github
            </a>
          </div>
        </article>
      </>
    );
  }
}
