import React from 'react'

const ApiContext = React.createContext({
    items: [],
    lists: [],
    addList: () => {},
  addItem: () => {},
  deleteItem: () => {},
  handleUpdate: () => {},
})

export default ApiContext