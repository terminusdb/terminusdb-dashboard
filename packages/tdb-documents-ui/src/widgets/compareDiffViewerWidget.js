import React, { useState, useRef, useEffect } from "react"
import ReactDiffViewer from 'react-diff-viewer' 

export const CompareDiffViewerWidget = ({ formData, compareFormData, name, index, className, classNameController }) => {
  let style = {
    variables: {
        dark: {
            addedBackground: className === "tdb__doc__input tdb__diff__original" ? "#f8d7da" : "#00bc8c"
        }
    }
  }

  return <div className={`${classNameController} ${className} w-100 border border-secondary rounded`}>
    <ReactDiffViewer 
      oldValue={formData} 
      newValue={compareFormData} 
      useDarkTheme={true} 
      linesOffset={0}
      showDiffOnly={true}
      splitView={true}
      styles={style}
      disableWordDiff={true}/>
  </div>
}