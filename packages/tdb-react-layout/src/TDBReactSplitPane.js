
import React from "react"
import SplitPane from "react-split-pane";
import { SizeMe } from 'react-sizeme'

export const TDBReactSplitPane = (props) => {

    return <SplitPane className={props.className} split={props.direction} minSize={props.minSize} size={props.size}>
        <SizeMe monitorHeight={true}>{({ size }) =>
			<div style={{ minHeight:"400px", height: "calc(100vh - 10px)"}}>
                {props.children}
            </div>
        }
        </SizeMe>
    </SplitPane>

}