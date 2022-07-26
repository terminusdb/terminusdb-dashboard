import React, { useState,useEffect} from "react";
import   axios  from "axios"

export const useWorker = (startData, onloadEndPoint, useGroup) => {
    const axiosHub=axios.create();
    const [dataProvider, setDataProvider] = useState(false)
    const [error,setError]= useState('')
    const [loading,setOnLoading]= useState(false)

    const conf = {
      groupKey:"TimeStamp",
      tooltipKey:"UserName", 
      groupValues:["Commit_num","Star_num","Fork_num","Issue_num","PullRequest_num"]
    }  

    useEffect(() => { 
        async function onLoad(componentName,endPoint){
            try{
                const result = await axiosHub.get(onloadEndPoint)
                let fResult=formatResult(conf,result.data)
                setDataProvider(fResult)
            }catch(err){
                console.log(err)
            }finally{
        
            }
        }
        
      if(onloadEndPoint)onLoad()
      //if(startData) console.log("KITTY")
      
   }, [onloadEndPoint])


   useEffect(() => {
      if(startData.length>0) {
        let fData = formatResult({}, startData)
        setDataProvider(fData)
      }
   }, [startData]) 


   //function formatItem(element,)

    /**
       * Group groups rows that have the same values into summary rows, 
       * for example we use this formatting with the chart component,  
       * @param {object} element 
       * @param {string} groupkey 
       * @param {string} valueName  
       * @param {string} tooltipKey 
       * @param {object} groupBy 
       * @example
       * const groupBy = {}
       * const element = {Commits: 6, 
       *                  TimeStamp: "2021-03-26T00:00:00.000Z", 
       *                  UserName: "Rossi"}
       * addValue(element,"TimeStamp","Commits","UserName",groupBy)
       */
        
      const addValue = (element, groupkey, valueName, tooltipKey, groupBy) =>{
        const toolKey=element[tooltipKey]
        const value=element[valueName]
        let val_tot= value;
        const groupValue=element[groupkey]
        const valueNameTool = `${valueName}Tool`
        //group for a specific paramters es Timestamp
        if(!groupBy[groupValue]){ 
           groupBy[groupValue]= {}
           groupBy[groupValue][groupkey]= groupValue
        }

        if(value){
          if(!groupBy[groupValue][valueNameTool]){
              groupBy[groupValue][valueNameTool]={}
          }        
          if(groupBy[groupValue][valueName]){
            val_tot = groupBy[groupValue][valueName] + value
          } 
          groupBy[groupValue][valueName] = val_tot
          groupBy[groupValue][valueNameTool][toolKey] = value
      }      
     }
  

   function formatResult(config,result){
      if(result){
        let groupBy = [];
        if(useGroup  === true){

          //data format
          result.forEach( element =>{
            console.log(element)
            conf.groupValues.forEach((valueName)=>{
                  addValue(element, config.groupKey, valueName, config.tooltipKey, groupBy)
            })
          })
        }
        else{
          groupBy=result  
        }
        return groupBy
      }

   }
   
   async function onChange(endPoint){

   }

   return {dataProvider,onChange,error,loading}
}
  