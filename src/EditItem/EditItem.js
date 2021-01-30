import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './EditItem.css'
import AppForm from '../AppForm'
import TokenService from '../services/token-service'
import { Input } from '../Utils/Utils'
export default class EditItem  extends React.Component{
    state = {
        id: '',
        name: {value: '', touched: false},
        price: '',
        quantity: '',
        list_id: '',
        content: '',
        date_made:'',
    };
    static contextType = ApiContext;

    handleClickCancel = e => {
        e.preventDefault()
        const  listId  = this.state.list_id
        this.props.history.push(`/lists/${listId}`)
      }
    setName = name => {
        this.setState({name: {value: name, touched: true}}); // Switch touched to true
    };
    validateName = () => {
      let name = this.state.name.value;
     
            if (name.length <= 0) {
              
                return "(Name needed)";
    }
    }
 
     handleSubmit = e => {
        e.preventDefault()

        const itemId = this.props.match.params.itemId

        const newItem= {
            id : this.state.id,
            item_name: e.target['item-name'].value,
            price: e.target['item-price'].value || 0,
            quantity: e.target['item-quantity'].value || 1,
            list_id: this.state.list_id,
            content: e.target['item-content'].value,
            date_made: this.state.date_made,
        }
        fetch(config.API_ENDPOINT + `/items/${itemId}`, 
        {
            method: 'PATCH',
             body: JSON.stringify(newItem),
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
              },
           
        })
        .then(res => {
            if(!res.ok){
            return res.json().then(e=>Promise.reject(e))
            }
            
        })
        .then( () =>{
        this.context.handleUpdate(newItem)
       
        this.props.history.push(`/lists/${this.state.list_id}`)
            
        })
        .catch( error => {
            console.error({ error })
        })
    }
    


static defaultProps = {
    history: {
        push: () => {}
    },
}

 componentDidMount() {
    window.scrollTo(0, 0)
     const itemId= this.props.match.params.itemId
    
       
       fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
        headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
            'content-type': 'application/json',
          },
       }
       )
       .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
          return res.json()
        })
         .then(data => {            
        this.setState({
        id:data.id,
        name: {value: data.item_name, touched: false},
        price: data.price,
        quantity: data.quantity,
        list_id: data.list_id,
        content: data.content,
        date_made: data.date_made
           })
         })
         .catch(error => { console.error({ error })})
     }

render(){
 
  
        // this.setState({name: {value: item.item_name, touched: true}}); 
    
    

    return(
        <section className='edit-item'>
         
            <h3>Edit Item</h3>
            <AppForm onSubmit={this.handleSubmit}
            onCancel={this.handleClickCancel}>
            <label htmlFor='item-name-input'>
                Name
                   { <p className="error">{this.validateName()}</p>}
            </label>
            <Input type='text' id='item-name-input' name='item-name'
            
            value={this.state.name.value}
            onChange={e => this.setName(e.target.value)}/>
            <label htmlFor='item-form-content'>
                Additional Info:
            </label>  
                <Input id = 'item-form-content' name = "item-content" defaultValue={this.state.content}/>
           
            <label htmlFor='item-form-price'>
                Cost:
            </label>
                <Input id='item-form-price' type='number' name = "item-price" min={0} step=".01" defaultValue={this.state.price} />
            <label htmlFor='item-form-quantity'>
                Qty:
            </label>
                <Input id='item-form-quantity' type='number' name = "item-quantity" min={1} defaultValue={this.state.quantity} />     
           
            <button className='done-button' type = "submit" disabled={this.validateName()}>Done</button>
            <button type="cancel" className='cancel-button' onClick={this.handleClickCancel}>Cancel</button>
         </AppForm>
        </section>


    )
}
}
EditItem.defaultProps = {
    item: "",
    list: ""
}
