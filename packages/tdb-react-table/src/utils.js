import React from 'react';

const replaceStr=(label)=>{
    if(typeof label ==="string"){
      return label.replace('v:','');
    }
    return label;
}

/*
the conf must be implemented
*/

export const FormatColumns=(columnVars,conf)=>{    
    const columnList=columnVars || []

    return columnList.map((item,index)=>{
         return {
                  Header: replaceStr(item),
                  id: item,
                  accessor: item,
                  filterable: false,
                  show:true,
                  Cell: function(props){
                      let value;
                      if(typeof props.cell.value==='object'){
                        value=props.cell.value['@value']

                      }else {
                        value = (props.cell.value)//.substring(props.value.lastIndexOf('/')+1)).replace("#",":")
                      }
                      return <span>{value}</span>
                  }
          }

      })
}

