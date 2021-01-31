import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App/App'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faPlus, faMinus, faSkull, faCheckCircle, faCircle, faCashRegister, faChevronRight, faChevronDown, faTimes} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faMinus, faPlus, faSkull, faTimes,faCircle, faCheckCircle, faCashRegister, faChevronRight, faChevronDown)


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
