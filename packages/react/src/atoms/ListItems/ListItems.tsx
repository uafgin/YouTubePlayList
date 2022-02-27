import React from "react";

interface listProps {
    items: []
}

const ListItems: React.FC<listProps> = ({items}) => {
    return <ul>
        {items.map(item => <li key={item}>{item}</li>)}
    </ul>
}

export default ListItems;