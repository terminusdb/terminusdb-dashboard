import React, {useState, useEffect} from "react"
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart, Area } from 'recharts'
import {useTimeTravel} from "../hooks/useTimeTravel"
import {printtsDate, printtsTime} from "./utils"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {Col} from "react-bootstrap"

export const DataProductActivityStatus = ()=>{
    const {
        dataProvider
    } = useTimeTravel(50)

    return  <React.Fragment>
                <Col md={12}>
                    <DataProductActivityGraph dataProvider={dataProvider}/>
                </Col>

                <Col md={12}  className="mb-5">
                    <DataProductActivityBoard dataProvider={dataProvider} />
                </Col>
        </React.Fragment>
}

const DataProductActivityGraph = ({dataProvider}) => {
    const [commits, setCommits] = useState([])
    const [json, setJson] = useState({})
    const [graphData, setGraphData] = useState([])
    const [loading, setLoading]=useState(true)

    useEffect(() => {
        if(!dataProvider) return 
        setCommits([])
        setGraphData([])
        dataProvider.slice(0).reverse().map(item => {
            let date =item.label.substring(0, "00/00/0000".length).replace(/\//g, '-') 
            //item.label.substring(9, item.label.length).replace(/\s/g, '')
            setCommits(arr => [...arr, {[date]: item.commit}])
        })

    }, [dataProvider])

    useEffect(() => {
        if(!commits) return
        
        let jsonInfo = {}
        commits.map ( item => {	
            for (var key in item) {
                if(key in jsonInfo){
                    let count = jsonInfo[key]
                    jsonInfo[key] = count + 1
                }
                else jsonInfo[key] = 1
            }
        })
        setJson(jsonInfo)
        setLoading(false)
    }, [commits])


    useEffect(() => {
        let arr = []
        for(var key in json) {
            arr.push({
                name: key,
                commits: json[key],
                amt: json[key]
            })
        }
        setGraphData(arr)
    }, [json])
    
    //display graph after 2 days of work 
    if(commits.length < 2) return <div/>
    if(graphData.length < 2 ) return <div/>

    return  <div className="card mb-5">
        {loading && <Loading message={`Loading activity graph ...`} type={PROGRESS_BAR_COMPONENT}/>}
        <div className="card-header text-light mb-3 fw-bold bg-transparent ">Recent Commits</div>
        <div className="card-body">
            <div className="row align-items-center gx-0">
                <div className="col">
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart
                            width={500}
                            height={200}
                            data={graphData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {/*text-green*/}
                                {/*<Area type="monotone" dataKey="commits" stroke="#82ca9d" fill="#82ca9d" />*/}
                                {/*text-pink*/}
                                {/*<Area type="monotone" dataKey="commits" stroke="#ee1ee0" fill="#de7dd8" />*/}
                                {/*text-purple*/}
                                {<Area type="monotone" dataKey="commits" stroke="#4312cc" fill="#8f75d8" />}
                            </AreaChart>
                            {/*<LineChart
                                width={500}
                                height={200}
                                data={graphData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="commits" stroke="#8f75d8" activeDot={{ r: 8 }} />
                            </LineChart>*/}
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    </div>
     
}

const DataProductActivityBoard = ({dataProvider}) => {    
    const TimelineElements = () => {
        if(!dataProvider) return <div/>

        let timeElements = []
        let selectedCounter = 0
        

        //<div className="list-group-item">
        dataProvider.map((item,num) => {
            if(selectedCounter>=5) return
            timeElements.push(<div key={`element__${num}`}>
                    <div className="row">
                        {/*<div className="col-auto">
                            <div className="avatar avatar-sm avatar-online">
                                <BiTimer className="activity-icon text-muted"/>
                            </div>

                        </div>*/}
                        <div className="col ms-n2">
                            <h6 className="d-flex">
                                {`By ${item.author}`}
                            </h6>

                            <h6 className="float-right">
                                {printtsDate(item.time)} 
                                <small className="text-light d-block mt-1">
                                    {printtsTime(item.time)}
                                </small>
                            </h6>

                            <p className="small text-light mb-0">
                                {item.message}
                            </p>
                        </div>
                    </div> 
                </div> )  
            selectedCounter += 1
        })

        return timeElements
    }

    return  <React.Fragment>
        {dataProvider.length>0  && <div>
            <div className="card">
                <div className="card-header text-light mb-3 fw-bold bg-transparent ">Recent Activities</div>
                <div className="card-body">
                    <div className="row align-items-center gx-0">
                        <div className="col">
                            <div className="mt-4 mb-1 list-group list-group-flush list-group-activity my-n3">
                                <TimelineElements/>
                            </div>
                        </div>
                    </div> 
                </div>
        </div>
    </div>}
    
    </React.Fragment>

}