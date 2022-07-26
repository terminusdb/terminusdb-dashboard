// recharts doesn't export the default tooltip,
// but it's located in the package lib
import moment from 'moment'
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';
import React from 'react';
export const CustomTooltip = props => {
  
  //we check if the tooltip is active
  if (!props.active) {
    return null
  }

  // so we create a new payload with the name and value fields set to what we want
  /*format the tooltip payload*/

  const newPayload01 = ()=>{
      const payloadFormatted=[]
      props.payload.forEach((item)=>{
        let name=item.name;
        let value=item.value;
        /*
    		*to be review  ["formatted value", "formatted name"， ]
    		*/
        if(name==="Promotion"){
          const mom=moment(value[0])
          const startValue=mom.format("YYYY-MM-DD ddd")
          const mom01=moment(value[1])
          const endValue=mom01.format("YYYY-MM-DD ddd")
          value=`${startValue} - ${endValue}`
        }

        //label=[value,name]
        if(item.payload[name]){
          const diffTooltip=item.payload[name]

          if(typeof diffTooltip==='object'){
            const keysObj=Object.keys(diffTooltip);
            const tmpArr=[]
            keysObj.sort();              
            keysObj.forEach((key=>{
                const clonedObj = { ...item }
                clonedObj.value=diffTooltip[key]
                clonedObj.name=key
                payloadFormatted.push(clonedObj)
            }))         
          }else{
            const clonedObj = { ...item }
            clonedObj.name=diffTooltip
          }
           
        }else{
          const clonedObj = { ...item }
          clonedObj.name=name;
          clonedObj.value=value;
          payloadFormatted.push(clonedObj)
        }
    })
    return payloadFormatted
  }

  const newPayload=newPayload01()

/*
* add as a rule
*/
  const axisLabelFormatter = (axisLabel)=>{
      const mom=moment(axisLabel)
      return mom.format("YYYY-MM-DD ddd")
  }

  // we render the default, but with our overridden payload
  return <DefaultTooltipContent labelFormatter={axisLabelFormatter} {...props} payload={newPayload} />;
};