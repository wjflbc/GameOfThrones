import React, {useState, useEffect} from 'react';
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


function ItemDetails ({itemId, getItem, children }) {

    const [itemAll, updateItAll] = useState([]);


    useEffect(() => {
        if (itemId) {
            updateItem();
        }
    }, [itemId])



  function  updateItem() {

        if (!itemId) {
            return;
        }

        getItem(itemId)
            .then((itemAll) => {
                console.log(itemAll);
                updateItAll(itemAll)

            })


    }


        if (!itemAll) {
            return <span className="select-error">Please select a item</span>
        }

        const {name} = itemAll;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {itemAll})
                        })
                    }
                </ul>
            </div>
        );

}

export default ItemDetails;