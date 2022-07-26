import React, {useState,useEffect} from "react";
import TerminusClient from '@terminusdb/terminusdb-client';
import moment from 'moment';
const DATETIME_FULL = "hh:mm:ss, DD-MM-YYYY"

const QUERY_TYPE_LOAD = 'QUERY_TYPE_LOAD';
const QUERY_TYPE_PREVIOUS = 'QUERY_TYPE_PREVIOUS';
const QUERY_TYPE_NEXT = 'QUERY_TYPE_NEXT';

export const useCommitsControl = (woqlClient, setError, branch='main', currentStartTime=null, currentCommit=null, firstCommit=null, limit=10,page=0) => {

    const WOQL = TerminusClient.WOQL
    const [currentPage, setCurrentPage] = useState(page);
   // const [commit, setCurrentCommit] = useState(currentCommit);
    //const [dataProvider, setDataProvider] = useState([]);
    const [startTime, setUpdateStartTime] = useState(currentStartTime);
    const [gotoPosition,setGotoPosition] = useState(null);
    const [reloadQuery,setReloadQuery] = useState(0);

    const [queryType,setQueryType] = useState(QUERY_TYPE_LOAD);

    const [dataProviderValues,setDataProviderValues] = useState({dataProvider:[],selectedValue:0})

    const setSelectedValue=(value)=>{
        const newValue={dataProvider:dataProviderValues.dataProvider,
                        selectedValue:value}
        setDataProviderValues(newValue)
    }
    /*ss
    * move the commit search from time
    */
    const getPage=()=>{
        return limit*currentPage
    }

    const setStartTime=(time)=>{
        setCurrentPage(0);
        setGotoPosition(null)
        //setCurrentCommit(null)
        setUpdateStartTime(time)
    }

    /*
    *the result the first is the last commit the last last is the older
    */
    //next_commits
    //previous_commits

    //load commit Count
    /*
    * first render
    * commit ref or is the last commit
    */
    useEffect(() => {//WOQL.eq("v:Branch","master"),
        //start from
        let queryObj = WOQL.query()
        switch(queryType){
            case QUERY_TYPE_NEXT:
                const firstElement= dataProviderValues.dataProvider.slice(-1)[0]
                queryObj=WOQL.lib().next_commits(firstElement.commit,branch,limit)
                break;
            case QUERY_TYPE_PREVIOUS:
                const lastElement= dataProviderValues.dataProvider[0]
                queryObj=WOQL.lib().previous_commits(lastElement.commit,limit)
                break;
            default:
                if(currentCommit){
                    queryObj = WOQL.lib().commit_timeline(currentCommit, branch, limit)
                }else {
                    queryObj.and(
                        WOQL.lib().active_commit_id(branch, startTime, "Active Commit ID"), 
                        WOQL.lib().commit_timeline("v:Active Commit ID", branch, limit)
                    )
                }

        }
        const tmpWoqlClient =  woqlClient.copy()
        
        tmpWoqlClient.checkout('_commits')
        tmpWoqlClient.query(queryObj).then((result) => {
            if (result.bindings) {
                const dataFormatted=formatResult(result.bindings);
                let newPoss=dataFormatted.newPoss;
                let selVal=dataFormatted.toBeSelect;
                /*
                * if I have the time set and I'm in the first page
                * I'm not in append mode
                */
                //if(startTime && currentPage===0){
                //newPoss=selVal;
                //}

                setDataProviderValues({dataProvider:dataFormatted.dataP,selectedValue:selVal})
                setQueryType(QUERY_TYPE_LOAD);
                setGotoPosition(newPoss)
            }
        }).catch((err)=>{
            if(setError)setError(err);
            console.log(err);
        })
    }, [reloadQuery, startTime, branch, currentCommit])

    /*
    * the result comes order by time so the first is the last commits.
    * we need to reverse the array for the time travel
    * (the last in the right position must be the last in the array),
    * the 0 post have to be the oldest of the result commits
    */

    const formatResult=(result)=>{
        let dataP=[];
        const resLength= Math.max(result.length-1,0)
        /*
        * head of the commit
        */
        let toBeSelect= resLength;

        if(queryType===QUERY_TYPE_PREVIOUS || queryType===QUERY_TYPE_NEXT){
            dataP=dataProviderValues.dataProvider;
        }else{
            result.reverse();
        }
        result.forEach((entry,index)=>{
               const time=entry.Time['@value'] //* 1000;
               const commitValue=entry['Commit ID']['@value'];
               const branchId=entry['Branch ID']['@value'];

               if(currentCommit && currentCommit===commitValue)toBeSelect=index;
               const isLastCommit=branchId===branch? true : false;

               const item={ datetime:time * 1000,
                            time: time,
                            label:moment.unix(time).format(DATETIME_FULL),
                            message:entry['Message']['@value'],
                            commit:commitValue,
                            author:entry['Author']['@value'],
                            parent:entry['Parent ID']['@value'],
                            isLastCommit:isLastCommit
                        }
                if(queryType===QUERY_TYPE_PREVIOUS){
                    /*
                    *I need to prepend if already I have some data
                    */
                    dataP.unshift(item)
                }else{
                    dataP.push(item)
                }
        })
        let newPoss=toBeSelect;
        if(queryType===QUERY_TYPE_PREVIOUS){
             toBeSelect=dataProviderValues.selectedValue + resLength + 1
             newPoss=5;
             if(resLength<5)newPoss=0;
        }
        if(queryType===QUERY_TYPE_NEXT){
            toBeSelect=dataProviderValues.selectedValue;
            //if(resLength<5)
            newPoss=Math.max(dataP.length-1,0);
        }
        return {dataP:dataP,toBeSelect:toBeSelect,newPoss:newPoss};
    }

    const loadPreviousPage=(obj)=>{
       // {lastPosition:positionValue,maxPosition:maxPosition}
       setQueryType(QUERY_TYPE_PREVIOUS)
       setReloadQuery(Date.now());
    }

    const loadNextPage=(obj)=>{
       // {lastPosition:positionValue,maxPosition:maxPosition}
       setQueryType(QUERY_TYPE_NEXT)
       setReloadQuery(Date.now());
    }

    return {
        dataProviderValues,
        gotoPosition,
       // dataProvider,
       // selectedValue,
        loadPreviousPage,
        startTime,
        setStartTime,
        setSelectedValue,
        setReloadQuery,
        loadNextPage,//:()=>{setCurrentPage(currentPage+1)}
    }
}


