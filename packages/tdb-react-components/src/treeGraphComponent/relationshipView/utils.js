import { Position, MarkerType, Handle, } from 'reactflow';
import {PROPERTY_TYPE_NAME} from '../utils/elementsName'

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode, targetNode) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const {
    width: intersectionNodeWidth,
    height: intersectionNodeHeight,
    positionAbsolute: intersectionNodePosition,
  } = intersectionNode;
  const targetPosition = targetNode.positionAbsolute; 

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + w;
  const y1 = targetPosition.y + h;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

export function createNodesAndEdges(selectedNodeObject, objPropsRelatedToClass, propertyList, mainGraphObj) {

  const initialNodes = [], sourceList = [], targetList = [];
  const initialEdges = [];
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  initialNodes.push({ 
    id: selectedNodeObject.id, 
    data: { label: selectedNodeObject.id }, 
    type: 'bidirectional',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    style: {
      color: "#333",
      background: "#eee",
      border: "3px solid #ff0072",
      //padding: "5"
      //width: 180
    },
    position: center 
  });
  
  /*
	* get all the relationship where the select node is a target
	*/
  objPropsRelatedToClass.map( (complexPropertyObj) =>{
    const property = mainGraphObj.getObjectProperty(complexPropertyObj.nodeName, complexPropertyObj.propName)
    if(property){
      sourceList.push({
        id: complexPropertyObj.nodeName,
        label: complexPropertyObj.nodeName,
        propertyName: complexPropertyObj.propName
      })
    }
	}) 

  /*
	* get all the relationship where the select node is a source
	* current node properties 
	*/
	propertyList.map((propertyItem)=>{
		if(propertyItem.type===PROPERTY_TYPE_NAME.CHOICE_PROPERTY || 
		  propertyItem.type===PROPERTY_TYPE_NAME.OBJECT_PROPERTY){
		  const info = mainGraphObj.getPropertyInfo(propertyItem.id)
      //console.log("info", info)
		  if(info.range){
        const label =  propertyItem.range
        const rangeElement=mainGraphObj.getElement(info.range, false) 
        //console.log("rangeElement", rangeElement)
        targetList.push({
          id: rangeElement.id,
          label: rangeElement.id,
          propertyName: info.id
        })
      }
           
		}
	})

 

 
  // source list 
  for (let i = 0; i < sourceList.length; i++) {
    const degrees = i * (360 / 8);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;


    initialNodes.push({ 
      id: `${sourceList[i].id}`, 
      data: { label: sourceList[i].label }, 
      type: 'bidirectional',
      position: { x, y },
      style: {
        color: "#333",
        padding: "5"
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    })

   
    initialEdges.push({
      id: `edge-${sourceList[i].id}->${selectedNodeObject.id}`,
      target: selectedNodeObject.id,
      source: sourceList[i].id,
      label: sourceList[i].propertyName,
      //sourceHandle: sourceList[i].propertyName,
      sourceHandle: 'left',
      targetHandle: 'right',
      className: 'normal-edge',
    });
  }

  // target list 
  for (let i = 0; i < targetList.length; i++) {
    const degrees = i * (360 / 8);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    let isAvailable = initialNodes.filter(arr => arr.id === targetList[i].id)
   
      initialNodes.push({ 
        id: `${targetList[i].id}`, 
        data: { label: targetList[i].label }, 
        //type: 'output',
        type: 'bidirectional',
        position: { x, y },
        style: {
          color: "#333",
          padding: "5"
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      })
      
    initialEdges.push({
      id: `edge-${selectedNodeObject.id}->${targetList[i].id}->${targetList[i].propertyName}`,
      //target: targetList[i].id,
      label: targetList[i].propertyName,
      source: selectedNodeObject.id,
      target: targetList[i].id,
      className: 'normal-edge',
      sourceHandle: 'right',
      targetHandle: 'left',
    })
  }


  console.log("nodes", initialNodes)
  console.log("edges", initialEdges)

  return { initialNodes, initialEdges };
}
