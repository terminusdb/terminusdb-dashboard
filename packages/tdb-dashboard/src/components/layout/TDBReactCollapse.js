import React, {useState} from "react"
import useCollapse from 'react-collapsed';

export const TDBReactCollapse = (props) => {
    let isExpanded = props.isExpanded
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

    return (
        <div>
          <section {...getCollapseProps()}>{props.children}</section>
        </div>
      )
}