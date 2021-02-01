import React, { Component } from 'react';
import LoginPage from '../LoginPage/LoginPage'
import AllLists from '../AllLists/AllLists';
import MainList from '../MainList/MainList';
import Header from '../Header/Header'
import DeleteList from '../DeleteList/DeleteList';
import EditItem from '../EditItem/EditItem';
import AddList from '../AddList/AddList';
import './App.css';
import ApiContext from '../ApiContext';
import config from '../config'
import ApiError from '../ApiError'
import TokenService from '../services/token-service'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import RegistrationPage from '../routes//RegistrationPage/RegistrationPage'
import LandingPage from '../routes//LandingPage/LandingPage'
import { BrowserRouter, Route } from 'react-router-dom'
class App extends Component {
  state = {
    items: [],
    lists: [],
    user: ''
  };


  getListsandItems() {
    Promise.all([

      fetch(`${config.API_ENDPOINT}/lists`, {
        headers: { 'authorization': `bearer ${TokenService.getAuthToken()}`, }
      }),



      fetch(`${config.API_ENDPOINT}/items`, {
        headers: { 'authorization': `bearer ${TokenService.getAuthToken()}` }
      })

    ])
      .then(([listsRes, itemsRes]) => {
        if (!itemsRes.ok)
          return itemsRes.json().then(e => Promise.reject(e))
        if (!listsRes.ok)
          return listsRes.json().then(e => Promise.reject(e))

        return Promise.all([
          itemsRes.json(),
          listsRes.json(),
        ])
      })
      .then(([items, lists]) => {
        this.setState({ items, lists })
      })
      .catch(error => {
        console.error({ error })
      })
    let username = 'user'
    this.setState({
      user: window.localStorage.getItem(username)
    })

  }
  componentDidMount() {
    TokenService.hasAuthToken() && this.getListsandItems()

  }
  saveUsername = currentUser => {
    this.setState({
      user: currentUser
    })
  }
  handleLoggedOut = e => {
    this.setState({
      loggedIn: false,
    })
  }
  handleLoggedIn = e => {
    this.setState({
      loggedIn: true,
    })
  }
  handleAddList = list => {
    this.setState({
      lists: [
        ...this.state.lists,
        list
      ]
    })
  }

  handleAddItem = item => {
    this.setState({
      items: [
        ...this.state.items,
        item
      ]
    })
  }
  handleUpdate = updatedItem => {
    this.setState({
      items: this.state.items.map(i =>
        (i.id !== updatedItem.id) ? i : updatedItem
      )
    })

  }

  handleDeleteItem = itemId => {
    this.setState({
      items: this.state.items.filter(item =>
        item.id !== parseInt(itemId))
    })
  }
  handleDeleteList = listId => {
    this.setState({
      lists: this.state.lists.filter(list =>
        list.id !== parseInt(listId))
    })
  }

  renderMainRoutes() {
    return (
      <>

        {['/lists'].map(path =>
          <PrivateRoute
            exact
            key={path}
            path={path}
            component={AllLists}
          />
        )}
        <Route
          exact
          path={'/'}
          component={LandingPage}
        />
        <PublicOnlyRoute
          path={'/login'}
          component={LoginPage}
        />
        <PublicOnlyRoute
          path={'/register'}
          component={RegistrationPage}
        />
        <PrivateRoute
          path='/lists/:listId'
          component={MainList}
        />
        <PrivateRoute
          path='/delete-list/:listId'
          component={DeleteList}
        />
        <PrivateRoute
          path='/edit/:itemId'
          component={EditItem}
        />
        <PrivateRoute
          path='/add-list'
          component={AddList}
        />
      </>

    );
  }



  render() {
    const value = {
      items: this.state.items,
      lists: this.state.lists,
      loggedIn: this.state.loggedIn,
      user: this.state.user,
      addList: this.handleAddList,
      addItem: this.handleAddItem,
      deleteItem: this.handleDeleteItem,
      handleUpdate: this.handleUpdate,
      deleteList: this.handleDeleteList,
      handleLoggedOut: this.handleLoggedOut,
      handleLoggedIn: this.handleLoggedIn,
      saveUsername: this.saveUsername
    };
    return (
      <BrowserRouter>
        <ApiContext.Provider value={value}>
          <div className="App">

            <ApiError>


              <header className='App__header'>
                <Header />
              </header>


              <main className="App__main">

                {this.renderMainRoutes()}

              </main>
            </ApiError>
          </div>
        </ApiContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;

