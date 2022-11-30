import React, {useState} from "react"
import useCollapse from 'react-collapsed';

export const TDBCollapse = (props) => {
    let isExpanded = props.isExpanded
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

    return (
        <div>
          <section {...getCollapseProps()}>{props.children}</section>
        </div>
      )
}