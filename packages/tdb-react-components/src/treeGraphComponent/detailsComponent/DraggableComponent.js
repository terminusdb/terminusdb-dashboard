import React, { useEffect, useRef, useState } from "react"
//import DraggableList from "react-draggable-lists";
import DraggableList from "react-draggable-list";
import { RxDragHandleDots2 } from "react-icons/rx"
import { GraphContextObj } from '../hook/graphObjectContext'; 


const Item = ({ item, itemSelected, dragHandleProps }) => {
  const { onMouseDown, onTouchStart } = dragHandleProps;

  return <div className="disable-select"
    style={{
      display: "flex",
      justifyContent: "space-around",
      userSelect: "none"
    }}
  >
    {item.element}
    <div className="disable-select dragHandle ml-2 mt-4"
      title={`Click here to rearrange properties ordering`}
      style={{
        width: "20px",
        height: "20px"
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        //console.log("touchStart");
        e.target.style.backgroundColor = "blue";
        document.body.style.overflow = "hidden";
        onTouchStart(e);
      }}
      onMouseDown={(e) => {
        console.log("mouseDown");
        document.body.style.overflow = "hidden";
        onMouseDown(e);
      }}
      onTouchEnd={(e) => {
        e.target.style.backgroundColor = "black";
        document.body.style.overflow = "visible";
      }}
      onMouseUp={(e) => {
        document.body.style.overflow = "visible";
      }}>
        <RxDragHandleDots2/>
      </div>
  </div>
}

export const DraggableComponent = ({ propertyPanelList }) => {

  const { mainGraphObj } =GraphContextObj()
  const [list, setList] = useState([]);

  if (propertyPanelList && !propertyPanelList.length) return <label className="small text-muted fst-italic fw-bold">No Properties ...</label>

  useEffect(() => {
    if(propertyPanelList && propertyPanelList.length) {
      const panelList = propertyPanelList.map((item, index) => 
        ( { id: index, element: item } )
      );
      setList(panelList)
    }
  }, [propertyPanelList])

  const containerRef = useRef();

  const _onListChange = (newList) => {
    //console.log("newList", newList)
    setList(newList);
    let orderedList = []
    newList.map(list => {
      if(list.element.props && 
        list.element.props.currentNodeJson
        && list.element.props.currentNodeJson.id !== "") {
          // add into ordering only when id is entered by user
        orderedList.push(list.element.props.currentNodeJson.id)
      }
    })
    if(orderedList.length) mainGraphObj.setDocumentOrdering(orderedList)
  };

  if(!list.length) return <div/>

  return <div ref={containerRef}
    style={{ touchAction: "pan-y" }}>
    <DraggableList
      itemKey="id"
      template={Item}
      list={list}
      onMoveEnd={(newList) => _onListChange(newList)}
      container={() => containerRef.current}
    />
  </div>

}