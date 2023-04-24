
import React, { useState, useEffect } from "react"
import * as CONST from "../constants";
import * as util from "../utils"
import { ArrayFieldTemplate } from "../arrayHelpers/nestedArrayTemplates"
import { ArrayFieldObj } from "./documentFieldArrayContext"

export const DisplayField = () => {
  const {
    arrayProps,
    args,
    field,
    items,
    handleAdd,
    handleDelete,
    handleReorderClick, 
    refresh
  } = ArrayFieldObj()

  // ({ args, props, property, handleAdd })
  return <>
    {refresh && <ArrayFieldTemplate args={args} 
      handleAdd={handleAdd}
      handleDelete={handleDelete}
      handleReorderClick={handleReorderClick}
      items={items}
      props={arrayProps} 
      property={field}/>}
  </>

}