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
           toggl: false
        }

        this.onToggleChar = this.onToggleChar.bind(this);
    }



    onToggleChar () {
        this.setState( {
            toggl: true
        })
    }

    render() {
        const {toggl} = this.state;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <RandomChar
                            toggl={toggl}/>
                            <Button
                                color="secondary"
                                onClick={this.onToggleChar}
                            >
                                Toggle random Character</Button>
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

