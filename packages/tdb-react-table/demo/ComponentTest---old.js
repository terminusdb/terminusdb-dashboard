import React,{useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import TerminusClient, {WOQL} from "@terminusdb/terminusdb-client/"
import { id } from 'date-fns/locale';
//$rgb:String,$name:String

const material =[
  "Cardboard/Paper",
  "Cloth",
  "Foam",
  "Metal",
  "Plastic",
  "Rubber"
]


const ELEMENT_QUERY = gql` query ElementQuery($offset: Int, $limit: Int,$orderBy:Element_Ordering) {
  Element(offset: $offset, limit: $limit, orderBy:$orderBy){
    image_url
        id
        part {
          id
          name
        }
  }
}`


const COLOR_QUERY = gql`
  query ColorQuery($offset: Int, $limit: Int, $orderBy:Color_Ordering ,$rgb : String , $name:String ) {
    Color(offset: $offset, limit: $limit, orderBy:$orderBy, rgb:$rgb , name:$name) {
        id
        rgb
        name
    }
}`

const PART_QUERY = gql` 
  query PartSetQuery($offset: Int, $limit: Int,$orderBy:Part_Ordering,$category:Category,$material:Material!,$name:String,$part_number:String) {
  Part(offset: $offset, limit: $limit, orderBy:$orderBy,category: $category,material:$material,name:$name,part_number:$part_number) {
    id
    category
    material
    name
    part_number
}
}`

function OrderByFunction(){
  return {rgb:"DESC"}
}

function Test() {
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState()

    const [filters, setFilters] = useState({})

    const [hasNextPage, setHasNextPage] = useState(true)//onCompleted:callCompleted ,
   
    const {loading, error, data, fetchMore } = useQuery(ELEMENT_QUERY, {variables:{offset:0 , limit:10}});

    const [dataProvider, setDataProvider] = useState(data)

    const result = data && data.Element ? data.Element : []
   
   // function callCompleted (data){
     //   setDataProvider(data)
   // }


    const tableConfig= TerminusClient.View.table();
      tableConfig.column("material").filter({type:"list",dataprovider:material})

    //   tabConfig.column_order("Time", "Author", "Commit ID", "Message", "Copy Commit ID")
     //  tabConfig.column("Commit ID")
     //  tabConfig.column("Time").width(180).renderer({type: "time"})
      // tabConfig.column("Message").width(300)
      // tabConfig.column("Author")
      // tabConfig.column("Copy Commit ID")
   
      // tabConfig.column("Copy Commit ID").render(getCopyButton)
      tableConfig.pager("remote")
      tableConfig.pagesize(limit)
       // tabConfig
   

    console.log("RESULT",  data)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :({error.message}</p>;

    const callfetchMore =(currentlimit,currentpage)=>{
       // console.log(offset,)
       // const newPage = Number(currentpage)+ Number(1)
        //console.log("_________",typeof offset, ll )
       // console.log(currentPage)
        //const offset = currentpage
        setPage(currentpage)
        setLimit(currentlimit)
       
        fetchMore({
            variables:{offset:currentpage , limit:currentlimit+1, ...filters},
            updateQuery: (prev, { fetchMoreResult }) => {
              //if (!fetchMoreResult) return prev;
              if(fetchMoreResult.Element.length<(limit+1)){
                setHasNextPage(false)
                return fetchMoreResult 
              }
              fetchMoreResult.Element.pop()
              return fetchMoreResult /*Object.assign({}, prev, {
                Color: [...prev.Color, ...fetchMoreResult.Color]
              });*/
            }
          })
    }

    
//{id, desc:true}

    const callSetFilters = (filtersArr) =>{
      const filters = {}
      if(Array.isArray(filtersArr)){
        filtersArr.forEach(item=>{
          filters[item.id] = item.value
        })
      }
      console.log("callSetFilters",filters)
      setFilters(filters)
      fetchMore({
        variables:{offset:page , limit:limit+1, orderBy:{}, ...filters},

        updateQuery: (prev, { fetchMoreResult }) => {
          //if (!fetchMoreResult) return prev;
          if(fetchMoreResult.Element.length<(limit+1)){
            setHasNextPage(false)
            return fetchMoreResult 
          }
          fetchMoreResult.Element.pop()
          return fetchMoreResult /*Object.assign({}, prev, {
            Color: [...prev.Color, ...fetchMoreResult.Color]
          });*/
        }
      })
    
    }

    const orderByAction = (orderByArr) =>{
      const orderByObj = {}
      if(Array.isArray(orderByArr)){
       
        orderByArr.forEach(item=>{
          orderByObj[item.id] = item.desc === true ? "DESC" : "ASC"
        })

      }
      setOrderBy(orderByArr)

      console.log("orderByObj",orderByObj)
      fetchMore({
        variables:{offset:page , limit:limit+1, orderBy:orderByObj},

        updateQuery: (prev, { fetchMoreResult }) => {
          //if (!fetchMoreResult) return prev;
          if(fetchMoreResult.Element.length<(limit+1)){
            setHasNextPage(false)
            return fetchMoreResult 
          }
          fetchMoreResult.Element.pop()
          return fetchMoreResult /*Object.assign({}, prev, {
            Color: [...prev.Color, ...fetchMoreResult.Color]
          });*/
        }
      })
    }

    
    return <div>{result.map(({id, rgb}) => (
        <div key={id}>
            <p>
                {id}: {rgb}
            </p>
        </div>
    ))} 
    {hasNextPage && <button onClick={callfetchMore}>CALL PAGE </button>}
    <div>{limit}_____{page}</div>
    {data && <WOQLTable
           // dowloadConfig={{filename:"test.csv",headers:["Author","Commit ID"]}}
            result={result}
            freewidth={true}
            view={(tableConfig ? tableConfig.json() : {})}
            limit={limit}
            start={page}
            orderBy={{}} 
            setFilters = {callSetFilters}
            setLimits={callfetchMore}
            setOrder={orderByAction}
            query={null}
            loading={loading}
            totalRows={230}
            onRefresh={function(){}}
        />}
    </div>
}

export function ComponentTest() {
    return (
        <div>
            <h2>get "test" using Apollo & Graphql</h2>
           
            <Test/>
        </div>
    );
}

//export default App;

