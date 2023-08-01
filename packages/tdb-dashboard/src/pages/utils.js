import {gql} from "@apollo/client"
import React from "react";
import {NavLink} from "react-router-dom"
export const handleWidthChange = (sz, setWidth) => {
    const maxWidth = 1000;
    const padding = 225;
    const paneWidth = maxWidth - sz - padding;
    setWidth({ width: paneWidth + "px" });
}

export const getGqlQuery = (str,setError)=>{
    try{
      const gqlStr = gql(`${str}`)
      return gqlStr
    }catch(err){
        if(setError)setError(err.message)
        console.log('getGqlQuery',err.message)
    }
}


export function formatError(errorStr,organization,dataProduct){
    if(typeof errorStr !=="string" ) return ''
    if(errorStr.search('Incorrect API key')> -1){
        return <>Incorrect API key Provided, You can find your API key at 
        <a className="mr-1 ml-1 text-success" href="https://platform.openai.com/account/api-keys" target="_blank"> 
        https://platform.openai.com/account/api-keys </a></>
        
    }else if (errorStr.search('missing field')> -1 || errorStr.search("input' is invalid.")> -1){
        return <>
        You can have an error in your graphql queries or handlebars templates. 
        <div>Go to <NavLink to={`/${organization}/${dataProduct}/openai_configuration`} className={"mr-1"}>Open AI configuration </NavLink> page
        to check your graphql queries and handlebars templates, load the query/template and use the 'Preview' button to see if there is any error</div></>
    }
    return errorStr
}

export const timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp)
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var hour = a.getHours()
    var min = a.getMinutes()
    var sec = a.getSeconds()
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return time
}

export  const cleanGraphiqlCache = () =>{
    const localStorageArr = 
    ['graphiql:docExplorerFlex',
    'graphiql:editorFlex',
    "graphiql:operationName",
    "graphiql:queries",
    "graphiql:query",
    "graphiql:tabState",
    "graphiql:variables",
    "graphiql:secondaryEditorFlex"] 

    localStorageArr.forEach(item=>{
        localStorage.removeItem(item)
    })
  }
  
  
 

