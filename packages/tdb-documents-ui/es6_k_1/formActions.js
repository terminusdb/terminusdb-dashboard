"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSubmit = void 0;
var _constants = require("./constants");
/**
* 
* @param {*} data - data extracted from the form 
* @param {*} onSubmit - callback on Submit which will contain the data submitted onClick of Submit button
* @param {*} setData - useState constant to show modified data on form
* @param {*} type - document type of interest
* @param {*} mode - Create | Edit | View
* @returns extracted data to onSubmit callback function 
*/
var handleSubmit = function handleSubmit(data, onSubmit, setData, type, mode) {
  if (onSubmit) {
    var formData = data.formData;
    console.log("Before submit: ", formData);
    setData(formData);
    var extracted = formData;
    //var extracted = transformData(mode, schema.properties, formData, frame, type)
    // add document type 
    extracted["@type"] = type;
    if (mode === _constants.EDIT &&
    // append id in edit mode
    extracted && !extracted.hasOwnProperty("@id") && formData.hasOwnProperty("@id")) {
      extracted["@id"] = formData["@id"];
    }
    onSubmit(extracted);
    console.log("Data submitted: ", extracted);
    console.log("Data submitted: STRINGIFY", JSON.stringify(extracted, null, 2));
    return extracted;
  }
};
exports.handleSubmit = handleSubmit;