import React, {Component} from 'react';
import {Col, Row, Container,Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../error";
import CharacterPage from "../characterPage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import gotService from '../../services/gotService';




export default class App extends Component {
    gotService = new gotService();

    state = {
        toggl: true,
        error: false
    };



    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }


    onToggleChar = () => {
        this.setState((state) => {
            return{
                toggl: !state.toggl
            }
        });
    }

    render() {
        const char = this.state.toggl ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <Button
                                color="secondary"
                                onClick={this.onToggleChar}
                            >Toggle random Character</Button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails
                                itemId={this.state.selectedItem}
                                getOne={this.gotService.getBook}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails
                                itemId={this.state.selectedItem}
                                getOne={this.gotService.getHouse}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

