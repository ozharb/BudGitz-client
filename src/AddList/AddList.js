import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddList.css';
import AppForm from '../AppForm';
import PropTypes from 'prop-types';

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
                'content-type': 'application/json'
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
            console.log(data.id)
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



render(){
    return(
        <section className='add-list'>
            <h3>New BudGit</h3>
            <AppForm onSubmit={this.handleSubmit}>
            <label htmlFor='list-name-input'>
                BudGit Name
                 
                   { <p className="error">{this.validateName()}</p>}
            </label>
            <input type='text' id='list-name-input' name='list-name' 
            value={this.state.name.value}
            onChange={e => this.setName(e.target.value)}/>
           
            <button className='buttons' type = "submit" disabled={this.validateName()}>Done</button>
          
         </AppForm>
        </section>


    )
}
}

AddList.defaultProps = {
    item: "",
    list: ""
}
AddList.propTypes = {
    item: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired
  }