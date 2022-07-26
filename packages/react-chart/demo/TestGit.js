import React from 'react';
import {ChartComponent} from '@terminusdb/terminusdb-react-chart';


const App= (props) =>{

const dataProvider= [{"Commit_num":9,"TimeStamp":"2021-03-16T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":13,"TimeStamp":"2021-03-17T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":2,"TimeStamp":"2021-03-17T00:00:00.000Z","UserName":"GavinMendelGleason"},{"Commit_num":4,"TimeStamp":"2021-03-18T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":16,"TimeStamp":"2021-03-23T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":2,"TimeStamp":"2021-03-23T00:00:00.000Z","UserName":"github-actions[bot]"},{"Commit_num":11,"TimeStamp":"2021-03-24T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":18,"TimeStamp":"2021-03-25T00:00:00.000Z","UserName":"Cheukting"},{"Commit_num":1,"TimeStamp":"2021-03-25T00:00:00.000Z","UserName":"KittyJose"},{"Commit_num":3,"TimeStamp":"2021-03-25T00:00:00.000Z","UserName":"github-actions[bot]"},{"Commit_num":1,"TimeStamp":"2021-03-26T00:00:00.000Z","UserName":"Francesca-Bit"}]
const  config = {"chart":{"margin":{"top":10,"right":20,"left":0,"bottom":70},"title":"Commits","description":"30 Days"},
"rules":[{"pattern":{"scope":"Line","variables":["Commit_num"]},"rule":{"label":"Commit_numTool","showLabel":false, "dot":true,"strokeWidth":"3px","stroke":"#05a677","fill":"#05a677","type":"monotone", "dotR":"20"}},{"pattern":{"scope":"XAxis","variables":["TimeStamp"]},"rule":{"labelRotate":-40,"label":"Day","labelDateOutput":"YYYY-MM-DD ddd","padding":{"left":20,"right":20}}},{"pattern":{"scope":"YAxis"},"rule":{"type":"number","domain":["dataMin","dataMax  + 10"]}},
{"pattern":{"scope":"Legend"},"rule":{"layout":'vertical',"align":"left","payload":[{"value":"commits","color":"#05a677","id":"Commit_num"},{"value":"commits003","color":"red"}]}}]}

return <div className="Container mt-4 ">
    <ChartComponent config={config} dataProvider={dataProvider} />
    </div>

}


export default App;