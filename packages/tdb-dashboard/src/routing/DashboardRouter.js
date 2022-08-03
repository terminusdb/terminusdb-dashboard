import React from "react"
import {
    Router,
    Switch,
    Route,
} from "react-router-dom"

export const DashboardRouter = () => {

    return (<Switch>
            <Route path="/" >
                  <div> HOME PAGE</div>
            </Route>
            <Route path="/first" >
                  <div> HELLO FIRST PAGE</div>
            </Route>
            <Route path="/second" >
                  <div> HELLO second PAGE</div>
            </Route>
        </Switch>)
}