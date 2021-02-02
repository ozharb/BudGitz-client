import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './UserInfo.css'
import ApiContext from '../ApiContext'
import TokenService from '../services/token-service'


class UserInfo extends Component {
  

static contextType = ApiContext;

handleLogoutClick = () => {
    let username = 'user'
    TokenService.clearAuthToken()
    window.localStorage.removeItem(username)
    this.context.handleLoggedOut()
  }


userStatus = (listNum) => {
    if (listNum === 10) {
        return <div >
        <h4>Legit BudGitter</h4>
       <p>Add {10} more BudGitz to get to Legendary status</p>
                </div>
      }
      if (listNum > 10) {
        return <div >
        <h4>Legit BudGitter</h4>
       <p>Add {10 - listNum} more BudGit{(10 - listNum)===1?null:'z'} to get to Legendary status</p>
                </div>
      }
      if(listNum >= 20){
       return  <div >
       <h4>Legendary BudGitter</h4>
      <p>Go forth and spread the wealth.</p>
               </div>
      }
      return  <div>
       <h4>Lil BudGitter</h4>
      <p>Add {10 - listNum} more BudGit{(10 - listNum)===1?null:'z'} to get to Legit status</p>
       </div>     
      }
render(){
    const { lists=[] } = this.context
  

  return (
    <ul className="list">
        
  <li className="list-item">You have {lists.length} BudGit{lists.length===1?null:'z'}</li>
  <li className="list-item">Your Status:</li>
{this.userStatus(lists.length)}
<li className="list-item"><Link
onClick={this.handleLogoutClick}
to='/login'
className = "logout">
Logout
</Link> </li>
   </ul>
 

  )
}
}

export default UserInfo