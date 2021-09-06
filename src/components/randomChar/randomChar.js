import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from "../spiner/spiner";
import ErrorMessage from "../error";





export default class RandomChar extends Component {

    constructor() {
        super();
        this.updataChar();
    }

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false,
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updataChar() {
        const id = Math.floor(Math.random()*140 + 25);
        this.gotService.getCharacters(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        let classNames = "random-block rounded";

        const {char, loading, error} = this.state;
        const {toggl} = this.props

        const tog = toggl ? classNames +=' hide' : classNames +=' show';
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null ;

        return (
            <div className={classNames} >
                {tog}
                {errorMessage}
                {spinner}
                {content}
            </div>

        );


    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}




