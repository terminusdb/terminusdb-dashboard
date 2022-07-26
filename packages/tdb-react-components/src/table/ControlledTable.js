import React, {useState, useEffect} from 'react'
import { ControlledQueryHook } from "./ControlledQuery"
import { WOQLTable } from './WOQLTable';

export const ControlledWOQLTable = ({client, query, results, order, rows, freewidth, view, onEmpty, onError, onLoading}) => {
    const [loaded, setLoaded] = useState(false)

    const {
        updateQuery,
        changeOrder,
        changeLimits,
        woql,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount,
        onRefresh
    } = ControlledQueryHook(client, query, results, rows, order)


    useEffect(() => {
        if(query && woql){
            if(loaded){
                updateQuery(query)
            }
            else {
                setLoaded(true)
            }
        }
    }, [query])

    function isEmpty(res){
        if(start == 0 && res.rows == 0) return true
        return false
    }

    if(result && view && view.prefixes) result.prefixes = view.prefixes

    return (
        <div className="tdb__loading__parent">
            {loading && onLoading &&
                <>{onLoading()}</>
            }
            {result && result.status != 200 &&
                <>{onError(result)}</>
            }
            {result && result.status == 200 && isEmpty(result) && onEmpty &&
                <>{onEmpty(result)}</>
            }
            {result && result.status == 200 && !isEmpty(result) &&
                <WOQLTable
                    result={result}
                    freewidth={freewidth}
                    view={(view ? view.json() : {})}
                    limit={limit}
                    query={woql}
                    start={start}
                    orderBy={orderBy}
                    setLimits={changeLimits}
                    setOrder={changeOrder}
                    totalRows={rowCount}
                    onRefresh={onRefresh}
                />
            }
        </div>
    )
}
