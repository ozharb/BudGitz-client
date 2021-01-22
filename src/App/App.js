import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import AllLists from '../AllLists/AllLists';
import MainList from '../MainList/MainList';
import './App.css';
import ApiContext from '../ApiContext';
import config from '../config'
import ApiError from '../ApiError'

class App extends Component {
    state = {
        items: [],
        lists: [],
    };

    componentDidMount() {
        Promise.all([
          fetch(`${config.API_ENDPOINT}/items`),
          fetch(`${config.API_ENDPOINT}/lists`)
        ])
          .then(([itemsRes, listsRes]) => {
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
    handleUpdate = updatedItem =>{
     
      this.setState({
        items: this.state.items.map(i =>
          (i.id !== updatedItem.id) ? i : updatedItem
        )
      })
   
     }

    handleDeleteItem = itemId => {
        this.setState({
            items: this.state.items.filter(item=>
                item.id !== parseInt(itemId))
        })
    }

    renderMainRoutes() {
        return (
            <>
            
            {['/', '/lists/'].map(path =>
              <Route
                exact
                key={path}
                path={path}
                component={AllLists}
              />
            )}
            <Route
              path='/lists/:listId'
              component={MainList}
            />
            {/* <Route
              path='/item/:itemId'
              component={ExpandItem}
            /> */}
            {/* <Route
              path='/add-folder'
              component={AddList}
            />
            <Route
              path='/add-note'
              component={AddItem}
            /> */}
          </>
        
        );
    }
    
      
      
    render() {
        const value = {
            items: this.state.items,
            lists: this.state.lists,
            addList: this.handleAddList,
            addItem: this.handleAddItem,
            deleteItem: this.handleDeleteItem,
            handleUpdate:this.handleUpdate
          
        };
        return (
            <ApiContext.Provider value = {value}>
            <div className="App">
           
                  <ApiError>
                <header className="App__header">
                    
                    <h1>
                        <Link to="/">BudGitz</Link>{' '}
                        
                    </h1>
                    <h3> The legit way to budget</h3>
                </header>
 
                <main className="App__main">
                
                    {this.renderMainRoutes()}</main>
                </ApiError>
            </div>
            </ApiContext.Provider>
        );
    }
}

export default App;

