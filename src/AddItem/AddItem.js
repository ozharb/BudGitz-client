import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddItem.css'
import AppForm from '../AppForm'
import PropTypes from 'prop-types';
import TokenService from '../services/token-service'
import { Input, Required } from '../Utils/Utils'

export default class AddItem extends React.Component {
    state = {
        name: { value: '', touched: false },

    };
    setName = name => {
        this.setState({ name: { value: name, touched: true } }); // Switch touched to true
    };
    validateName = () => {
        let name = this.state.name.value;

        if (name.length <= 0) {

            return "What's the item?";
        }
    }
    setFolder = folder => {
        this.setState({ folder: { value: folder } })
    }
    validateFolder = () => {
        let folder = this.state.folder.value;
        if (folder === '') {
            return '(Please choose a folder)'
        } else if (folder === 'choose folder') {
            return "(Please choose a folder)"
        }

    }
    handleSubmit = e => {
        e.preventDefault()
        const newItem = {
            item_name: e.target['item-name'].value,
            price: e.target['item-price'].value || 0,
            quantity: e.target['item-quantity'].value || 1,
            list_id: this.props.listId,
            content: e.target['item-content'].value
        }
        fetch(`${config.API_ENDPOINT}/items`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`,
                },
                body: JSON.stringify(newItem)
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(data => {

                this.context.addItem(data)
                this.props.handleAddItemButton()
            })
            .catch(error => {
                console.error({ error })
            })
    }

    static contextType = ApiContext;

    static defaultProps = {
        history: {
            push: () => { }
        },
    }



    render() {
        return (
            <section className='add-item-form'>
                <h3>Add Item</h3>
                <AppForm onSubmit={this.handleSubmit}>
                    <label htmlFor='item-name-input'>
                        Name <Required />

                        {<p className="error">{this.validateName()}</p>}
                    </label>
                    <Input type='text' id='item-name-input' name='item-name'
                        value={this.state.name.value}
                        onChange={e => this.setName(e.target.value)} />
                    <label htmlFor='item-form-content'>
                        Additional Info:
            </label>
                    <Input id='item-form-content' name="item-content" />

                    <label htmlFor='item-form-price'>
                        Cost:
            </label>
                    <Input id='item-form-price' type='number' name="item-price" step=".01" />
                    <label htmlFor='item-form-quantity'>
                        Qty:
            </label>
                    <Input id='item-form-quantity' type='number' name="item-quantity" defaultValue='1' />

                    <button className='done-add-item' type="submit" disabled={this.validateName()}>Done</button>

                </AppForm>
            </section>


        )
    }
}
AddItem.defaultProps = {
    item: "",
    list: ""
}
AddItem.propTypes = {
    item: PropTypes.string.isRequired,
    list: PropTypes.string.isRequired
}