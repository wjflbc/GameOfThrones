import React, {Component} from 'react';
import ItemDetails, {Field} from '../itemDetails';
import gotService from '../../services/gotService';

export default class BooksItem extends Component {
    gotService = new gotService();

    render() {
        return(
            <ItemDetails
                itemId={this.props.bookId}
                getItem={this.gotService.getBook}>
                <Field field='numberOfPages' label='NumberOfPages' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
    }
}