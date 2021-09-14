import React, {Component} from 'react';
import {Col, Row, Container,Button} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from "../error";
import gotService from '../../services/gotService';
import RowBlock from "../rowBlock";



export default class CharacterPage extends Component {

    gotService = new gotService();

    state ={
        selectedItem: 130,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {


        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}/>
        )

        const charDetails = (
            <CharDetails
                itemId={this.state.selectedItem}
                getOne={this.gotService.getCharacters}>
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </CharDetails>
        )
        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}