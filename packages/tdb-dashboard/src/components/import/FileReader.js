import React,{useState,useRef} from 'react'
import Papa from 'papaparse'
import {Row,Accordion,Card} from 'react-bootstrap'

export const FileReader = (props) => {

    const [csvfile, setCSVfile] = useState()
    const [fileData, setFileData] = useState([])
    const filesInput = useRef(null);

    const handleChange = event => {
        setCSVfile(event.target.files[0]);
    };
  
    const importCSV = () => {
      Papa.parse(csvfile, {
        complete: updateData,
        header: true
      });
    };
  
    const updateData = (result) => {
      setFileData(result.data)
      props.setResult(result.data)
      props.setFileName(csvfile.name)
      //console.log(result.data);
    }

    return (
        <div className="flex-column d-flex" style={{paddingLeft:"70px"}}>          
            <h2>Import CSV File!</h2>
          <input
            className="csv-input"
            type="file"
            ref={filesInput}
            name="file"
            placeholder={null}
            onChange={handleChange}
          />
          <p />
          <button onClick={importCSV}> Upload now!</button>
        </div>
    )
  }
  /*
  <Accordion >
          <h2>Import CSV File!</h2>
          <input
            className="csv-input"
            type="file"
            ref={filesInput}
            name="file"
            placeholder={null}
            onChange={handleChange}
          />
          <p />
          <button onClick={importCSV}> Upload now!</button>
          </Accordion>*/