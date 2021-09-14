import React, {Component} from 'react';
import './charDetails.css';
import Spinner from "../spiner/spiner";
import ErrorMessage from "../error";


const Field = ({itemAll, field, label}) => {
    console.log(itemAll);
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{itemAll[field]}</span>
        </li>
    )
}

export {
    Field
}


export default class CharDetails extends Component {

    state = {
        itemAll: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateChar();
        }
    }

    onCharDetailsLoaded = (itemAll) => {
        this.setState({
            itemAll,
            loading: false
        })
    }


    updateChar() {
        const {itemId} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        const {getOne} = this.props;
        getOne(itemId)
            .then(this.onCharDetailsLoaded)
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            itemAll: null,
            error: true
        })
    }


    render() {

        if (!this.state.itemAll && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.itemAll) {
            return <span className="select-error">Please select a character</span>
        }


        const {itemAll} = this.state;
        const {name} = itemAll;


        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }



        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {itemAll})
                        })
                    }
                </ul>
            </div>
        );
    }
}