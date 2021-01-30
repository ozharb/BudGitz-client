import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddList.css';
import AppForm from '../AppForm';
import PropTypes from 'prop-types';
import TokenService from '../services/token-service'
import {Input, Required} from '../Utils/Utils'
export default class AddList  extends React.Component{
    state = {
        name: {value: '', touched: false},
    
    };
    setName = name => {
        this.setState({name: {value: name, touched: true}}); // Switch touched to true
    };
    validateName = () => {
      let name = this.state.name.value;
     
            if (name.length <= 0) {
              
                return "What's this BudGit for?";
    }
    }
    
    
    
     
     handleSubmit = e => {
        e.preventDefault()
        const newList= {
            list_name: e.target['list-name'].value,
        }
        fetch(`${config.API_ENDPOINT}/lists`, 
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
              },
            body: JSON.stringify(newList)
        })
        .then(res => {
            if(!res.ok){
            return res.json().then(e=>Promise.reject(e))
            }
            return res.json()
        })
        .then( data =>{
        
            this.context.addList(data)
            this.props.history.push(`/lists/${data.id}`)
            
        
        })
        .catch( error => {
            console.error({ error })
        })
    }
    
static contextType = ApiContext;

static defaultProps = {
    history: {
        push: () => {}
    },
}


handleClickCancel = e => {
    const { history } = this.props
        e.preventDefault()
     history.push(`/lists`)
      }
render(){
  
    
    return(
        <section className='add-list'>
            <h3>New BudGit!</h3>
            <AppForm onSubmit={this.handleSubmit}
            onCancel={this.handleClickCancel}
            >
            <label htmlFor='list-name-input'>
                BudGit Name<Required />
                 
                   { <p className="error">{this.validateName()}</p>}
            </label>
            <Input type='text' id='list-name-input' name='list-name' 
            value={this.state.name.value}
            onChange={e => this.setName(e.target.value)}/>
           
            <button className='done-button' type = "submit" disabled={this.validateName()}>Done</button>
            <button type="cancel" className='cancel-button' onClick={this.handleClickCancel}>Cancel</button>
         </AppForm>
        </section>


    )
}
}

AddList.propTypes = {
    props: PropTypes.shape({
      history: PropTypes.object,
    })
}