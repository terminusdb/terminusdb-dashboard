import { EDIT, ONEOFVALUES } from "./constants"

// function to remove all empty json object 
// this is to remove all optional subdocument data other wise database will 
// complain on submit
function removeEmptyObject(data) {
  if (typeof data !== 'object') {
    return data;
  }

  return Object.keys(data).reduce(function(accumulator, key) {
    //const isObject = typeof data[key] === 'object';
    const isObject = !Array.isArray(data[key]) && data[key]!==null && typeof data[key] === 'object' ? true : false
    const value = isObject ? removeEmptyObject(data[key]) : data[key];
    const isEmptyObject = isObject && !Object.keys(value).length;
    if (value ===null && value === undefined || isEmptyObject) {
      return accumulator;
    }

    return Object.assign(accumulator, {[key]: value});
  }, {});
}

function removeOneOfPropertyFromDocumentLevel(data) {
  if(!data.hasOwnProperty(ONEOFVALUES)) return data
  let newData = data 
  let oneOfData = data[ONEOFVALUES] 
  delete newData[ONEOFVALUES] 
  for(let choice in oneOfData) {
    newData[choice] = oneOfData[choice]
  }
  return newData
}



/**
* 
* @param {*} data - data extracted from the form 
* @param {*} onSubmit - callback on Submit which will contain the data submitted onClick of Submit button
* @param {*} setData - useState constant to show modified data on form
* @param {*} type - document type of interest
* @param {*} mode - Create | Edit | View
* @returns extracted data to onSubmit callback function 
*/
export const handleSubmit = (data, onSubmit, setData, type, mode) => { 
  if(onSubmit) { 
    let alteredFormData=removeEmptyObject(data.formData)
    let formData=removeOneOfPropertyFromDocumentLevel(alteredFormData)
    console.log("Before submit: ", formData)
    setData(formData)
    let extracted = formData
    //var extracted = transformData(mode, schema.properties, formData, frame, type)
    // add document type 
    extracted["@type"] = type

    if(mode === EDIT &&  // append id in edit mode
      extracted && 
      !extracted.hasOwnProperty("@id") && 
      formData.hasOwnProperty("@id")) {
        extracted["@id"] = formData["@id"]
    }

    onSubmit(extracted)
    console.log("Data submitted: ",  extracted)
    console.log("Data submitted: STRINGIFY",  JSON.stringify(extracted, null, 2))
    return extracted
  }
}
 
export function loadTheme(theme) {
  // dynamically add bootstrap library
  var link = document.createElement('link');
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `https://bootswatch.com/5/${theme}/bootstrap.css`;
  document.head.appendChild(link);
}