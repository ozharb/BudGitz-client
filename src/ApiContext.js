import React from 'react'

const ApiContext = React.createContext({
    items: [],
    lists: [],
    addList: () => {},
  addItem: () => {},
  deleteItem: () => {},
  deleteList: () => {},
  handleUpdate: () => {},
})

export default ApiContext