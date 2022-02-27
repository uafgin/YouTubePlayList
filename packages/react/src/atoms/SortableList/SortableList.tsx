import React from "react";
import {SortableContainer, SortableContainerProps, SortableElement, SortableHandle} from 'react-sortable-hoc';
import { AiOutlineMenu } from "react-icons/ai";

interface SortableListProps {
    items: Array<any>,
    itemStructure: Function,
    sortableOptions?: SortableContainerProps | {}
}

const SortableList:React.FC<SortableListProps> = ({items, itemStructure, sortableOptions}) => {
    const DragHandle = SortableHandle(() => <AiOutlineMenu className="dse-sortable-list_dragicon" />);
    const SortableItem = SortableElement((props: any) => itemStructure(props.value, DragHandle));
    const SortableCont = SortableContainer((props: any) => {
      return <ul className="dse-sortable-list">{props.children}</ul>;
    });
    return <SortableCont {...sortableOptions}>{items.map((value, index) => (
        <SortableItem key={`item-${value.videoId}`} index={index} value={value} />
      ))}</SortableCont>
}

export default SortableList;