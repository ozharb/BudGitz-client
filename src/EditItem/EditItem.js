import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './EditItem.css'
import AppForm from '../AppForm'
import { findItem } from '../app-helpers'

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
        console.log('cancel')
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
            price: e.target['item-price'].value,
            quantity: e.target['item-quantity'].value,
            list_id: this.state.list_id,
            content: e.target['item-content'].value,
            date_made: this.state.date_made,
        }
        fetch(config.API_ENDPOINT + `/items/${itemId}`, 
        {
            method: 'PATCH',
             body: JSON.stringify(newItem),
            headers: {
                'content-type': 'application/json',
              },
           
        })
        .then(res => {
            if(!res.ok){
            return res.json().then(e=>Promise.reject(e))
            }
            
        })
        .then( () =>{
        console.log('new:', newItem)

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
     const itemId = this.props.match.params.itemId
      
       
       fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
         method: 'GET'
       })
       .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
          return res.json()
        })
         .then(data => {
             console.log(data)
         
             
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
            <input type='text' id='item-name-input' name='item-name'
            
            value={this.state.name.value}
            onChange={e => this.setName(e.target.value)}/>
            <label htmlFor='item-form-content'>
                Content
            </label>  
                <input id = 'item-form-content' name = "item-content" defaultValue={this.state.content}/>
           
            <label htmlFor='item-form-price'>
                Cost:
            </label>
                <input id='item-form-price' type='number' name = "item-price" min={0} defaultValue={this.state.price} />
            <label htmlFor='item-form-quantity'>
                Qty:
            </label>
                <input id='item-form-quantity' type='number' name = "item-quantity" min={1} defaultValue={this.state.quantity} />     
           
                <button type="cancel" className='buttons' onClick={this.handleClickCancel}>Cancel</button>
            <button className='buttons' type = "submit" disabled={this.validateName()}>Done</button>
          
         </AppForm>
        </section>


    )
}
}
EditItem.defaultProps = {
    item: "",
    list: ""
}
