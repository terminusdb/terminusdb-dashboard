import React from 'react'; 

export const NodeMenuList = (props)=> {

	const onClick=(evt)=>{
		const action_name=evt.currentTarget.id;
		if(props.setNodeAction)props.setNodeAction(action_name);
	} 

	const checkDisabledItem = (itemId)=>{
		if(props.disabledItemsList){
			const index = props.disabledList.findIndex((item)=>{return item===itemId})
			if(index>-1)return true;
		}
		return false
	}

	const addMenuItems= () =>{
	   const menuList=props.menuList || [];

	   let fontSize=props.fontSize || 16
	   let fontColor=props.fontColor || '#000000'

	   let startstep=40;

	   return menuList.map((menuItem,index)=>{
	   		let onClickEvent = {onClick:onClick}
	   		if(checkDisabledItem(menuItem.id)){
	   			onClickEvent={disabled:true}
	   		}	

	   		return  <g key={`item__${index}`} transform={`translate(0,${startstep * index})`} id={menuItem.id} {...onClickEvent}>
	   					<rect fill={'#ffffff'} x={1} y={0} width="165" height="39" />
	   					<text dx={10} dy={22} fontSize={fontSize}  fill={fontColor} > {menuItem.label} </text> 
	   				</g>
	   		
	   })
	}

	const menuItems=addMenuItems();
	const height=40 * menuItems.length;
		
	return (
		<g transform='translate(20,0)' id="nodeTreeList">
			<rect width="167" height={height} stroke={2} fill={'#cccccc'}/>
			{menuItems}	
		</g>
	)

}