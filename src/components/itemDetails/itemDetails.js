import React, {Component} from 'react';
import './itemDetails.css';



const Field = ({itemAll, field, label}) => {
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


export default class ItemDetails extends Component {

    state = {
        itemAll: null

    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }


    updateItem() {
        const {itemId, getItem} = this.props;
        if (!itemId) {
            return;
        }

        getItem(itemId)
            .then((itemAll) => {
                this.setState({itemAll})
            })
    }



    render() {

        if (!this.state.itemAll) {
            return <span className="select-error">Please select a character</span>
        }


        const {itemAll} = this.state;
        const {name} = itemAll;



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