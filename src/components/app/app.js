import React, {Component} from 'react';
import {Col, Row, Container,Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';




export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
           toggl: true
        }

        this.onToggleChar = this.onToggleChar.bind(this);
    }



    onToggleChar () {
        this.setState(({toggl}) =>({
            toggl: !toggl
        }))

    }


    render() {
        const tog = this.state.toggl ? <RandomChar/> : null;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {tog}
                            <Button
                                color="secondary"
                                onClick={this.onToggleChar}
                            >Toggle random Character</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

