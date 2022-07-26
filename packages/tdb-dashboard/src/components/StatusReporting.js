import React, {useState} from 'react'
import {Tabs,Tab} from "react-bootstrap"
// Add a request interceptor
//const axios = require('axios');
const TerminusClient = require('@terminusdb/terminusdb-client')

export const StatusReporting = (props) => {
    const [newCall,setCall] =useState(null)
    const [newError,setError] =useState(null)
    const [result,setResult] =useState(null)

    TerminusClient.axiosInstance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        
        config.metadata = { startTime: new Date()}
        //console.log(config)
        setCall(config.url+JSON.stringify(config.data,null,4))
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      },
    )
  
  // Add a response interceptor
  TerminusClient.axiosInstance.interceptors.response.use(
    function (response) {
  
      response.config.metadata.endTime = new Date()
      response.config.duration = (response.config.metadata.endTime - response.config.metadata.startTime)/1000
  
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      setResult(JSON.stringify(response.data))
      return response
    },
    function (error) {
      error.config.metadata.endTime = new Date()
      error.config.metadata.duration = (error.config.metadata.endTime - error.config.metadata.startTime)/1000
      //error.config.metadata.logger.error(`__REQUEST_ERROR__ | ${error.config.metadata.duration} sec | ${error.config.metadata.url}`,)
      setError(error.message)
      return Promise.reject(error)
    },
  )

    return(
    <Tabs defaultActiveKey="error" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="error" title="Problems">
          {newError && <pre className="p-5">{newError}</pre>}
        </Tab>
        <Tab eventKey="call" title="Call">
          <pre className="p-5">{newCall}</pre>
        </Tab>
        <Tab eventKey="result" title="Result">
        
        </Tab>  
    </Tabs>

    )


}