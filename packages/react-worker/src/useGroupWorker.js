import React, { useState,useEffect} from "react";
import   axios  from "axios"

export const useGroupWorker = (startDataGroup,onloadEndPoint,useGroup) => {
  const axiosHub=axios.create();
  const startDataTmp=startDataGroup || {}
  const [dataProviderGroup,setDataProvider] = useState(startDataTmp)
  const [needUpdate,setNeedUpdate]= useState()
  const [error,setError]= useState('')
  const [loading,setOnLoading]= useState(false)

   useEffect(() => { 
        async function onLoad(componentName,endPoint){
            try{
                const result = await axiosHub.get(onloadEndPoint)
                formatResult(result.data)
                //setDataProvider(result)
            }catch(err){
                console.log(err)
            }finally{
        
            }
        }
      if(onloadEndPoint)onLoad()
   }, [onloadEndPoint])

   function formatResult(result){
       
       if(result){
        const formattedTmp=[]
        
       /* result.data.bindings.forEach(item=>{
            //console.log("___item____",item)
            const obj={}
            Object.keys(item).forEach(key=>{
                
                obj[key]=item[key]['@value']
            })
            formattedTmp.push(obj) 
        })*/

        let groupBy = [];
        if(useGroup  === true){
        result.forEach( el =>{
           const userName=el['UserName']
           const commit_num=el['Commit_num']
           if(!groupBy[el['TimeStamp']]){          
                groupBy[el['TimeStamp']]= {TimeStamp:el['TimeStamp'], 
                                           Commit_num:commit_num,
                                           Commit_numTool:{}}
                groupBy[el['TimeStamp']]['Commit_numTool'][userName] = commit_num           
               
           }else{
                const com_value = groupBy[el['TimeStamp']]['Commit_num'] + commit_num;
                groupBy[el['TimeStamp']]['Commit_numTool'][userName] = commit_num
                groupBy[el['TimeStamp']]['Commit_num'] = com_value
           }
        })
        return Object.values(groupBy)
      }else{
        return result
      }
    }

   }
   //post ok
   async function onChange(endPoint,payload,resultVarName){
    try{
      const result = await axiosHub.post(endPoint,payload)
      const resFormat=formatResult(result.data)
      const dataProvider = dataProviderGroup
      dataProvider[resultVarName]=resFormat
      setDataProvider(dataProvider)
      setNeedUpdate(Date.now())
    }catch(err){
          console.log(err)
    }finally{

    }
   }

   return {dataProviderGroup,onElementChange:onChange,error,loading}
}

  