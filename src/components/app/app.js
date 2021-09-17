import React, {Component} from 'react';
import {Col, Row, Container,Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../error";
import gotService from '../../services/gotService';
import CharacterPage from "../pages/characterPage";
import BooksPage from "../pages/booksPage";
import HousesPage from "../pages/housesPage";
import BooksItem from "../pages/booksItem"
import {BrowserRouter as Router, Route} from "react-router-dom";



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
            <Router>
                <div className="app">
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
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses'  component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                               const {id} = match.params;
                              return  <BooksItem bookId={id}/>}
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
};

