import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App/App'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faPlus, faMinus, faCashRegister, faChevronRight, faChevronDown} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faMinus, faPlus, faCashRegister, faChevronRight, faChevronDown)


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
