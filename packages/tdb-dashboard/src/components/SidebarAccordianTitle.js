import React from "react"

export const SidebarAccordianTitle = ({message, dataProduct, status}) => {
    return <h6 className="text-muted w-100 text-left ml-1">
        <strong className={`${status} w-100 text-left ml-1`}> {message}  {dataProduct}</strong>
    </h6>
}

