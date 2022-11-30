
import React from "react"
import { Resizable } from "re-resizable";

export const TDBReactResizable = (props) => {

    const box = {
        display: "inline-block",
        background: "#ccc",
        border: "1px solid black",
        textAlign: "center",
        padding: "10px",
        boxSizing: "border-box",
        marginBottom: "10px",
        overflow: "hidden",
        position: "relative",
        margin: "20px",
    }

    const children = {
        textAlign: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        margin: "auto"
      }

    return <Resizable style={props.style} 
        className={box}
        enable={props.constraints}
        defaultSize={{ width: "98%", height: "auto", minWidth: "100%"}}>
            <span className={children}>
                {props.children}
            </span>
    </Resizable>

}