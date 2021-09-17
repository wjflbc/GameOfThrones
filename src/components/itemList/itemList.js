import React from 'react';
import './itemList.css';


 const ItemList = () => {

    const renderItems = (arr) => {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            console.log(item);
                return(
                    <li
                        key={id}
                        className="list-group-item"
                        onClick={ () => this.props.onItemSelected(id)}>
                        {label}
                    </li>
                )
        });
    }

    const {data}= this.props;
    const items = renderItems(data);


    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;


