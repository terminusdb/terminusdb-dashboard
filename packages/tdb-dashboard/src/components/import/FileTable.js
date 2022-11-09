import React, {useState,useMemo} from "react"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {Card} from "react-bootstrap"
import {tableViewConfigLocal} from "../../functions/ViewConfig"

export const FileTable = (props)=>{


    return  (<Card>
             <Card.Title>{props.title}</Card.Title>
             <Card.Body>
                <WOQLTable
                bindings={props.result}
                freewidth={true}
                view={tableViewConfigLocal().json()}
                limit={20}
                start={0}
                orderBy={null} 
                setLimits={null}
                setOrder={null}
                query={null}
                loading={false}
                totalRows={20}/>
            </Card.Body>
        </Card>)
}