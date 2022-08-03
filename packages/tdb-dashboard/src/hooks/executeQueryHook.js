import {useState, useEffect} from 'react'


function executeQueryHook(woqlClient, startQuery) {
    const query = startQuery || false
    //const [report, setReport] = useState()
    const [result, setResult] = useState(false)
    //const [loading, setLoading] = useState()

    const [cmsg, setCMsg] = useState('Update Query from Console Query Page')

    function executeQuery(q) {
        //setLoading(true)
        // to be review we call this function without query
        if(JSON.stringify(q.json())==="{}")return
        q.execute(woqlClient, cmsg)
        .then((response) => {
            // set the bindings 
            //console.log("response", response)
            setResult(response.bindings)
        })
        .catch((error) => {
            console.log("query run error", error) 
        })
        .finally(() => {
            //setLoading(false)
        })
    }

    useEffect(() => {
        if (query !== false) 
            executeQuery(query)
    }, [query])

    return [result]
}

export {executeQueryHook}
