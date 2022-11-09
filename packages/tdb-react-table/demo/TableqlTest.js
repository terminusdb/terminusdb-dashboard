import React,{useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import {WOQLTable,ControlledGraphqlQuery} from '@terminusdb/terminusdb-react-table'
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
  query PartSetQuery($offset: Int, $limit: Int,$orderBy:Part_Ordering,$category:Category,$material:Material,$name:String,$part_number:String) {
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
    //graphqlQuery, documentType, queryLimit, queryStart, order, filterBy
    const { documentError,
         changeOrder,
         changeLimits,
         changeFilters,
         limit,
         start,
         loading,
         documentResults} = ControlledGraphqlQuery(ELEMENT_QUERY, "Element", 10,0,{},{});
    

    const result = documentResults ? documentResults.Element : []

    const tableConfig= TerminusClient.View.table();
    tableConfig.column("image_url").width(100).renderer({type: "image",options:{"width":"80px"}})
    tableConfig.column("image_url").filterable(false).header(" ")
     // tableConfig.column("material").filter({type:"list",dataprovider:material})
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
   

    //console.log("RESULT",  data)

    if (loading) return <p>Loading...</p>;
    if (documentError) return <p>Error :({documentError.message}</p>;

  
    return <div>{result.map(({id, rgb}) => (
        <div key={id}>
            <p>
                {id}: {rgb}
            </p>
        </div>
    ))} 
    <div>{limit}_____{start}</div>
    {result  && <WOQLTable
           // dowloadConfig={{filename:"test.csv",headers:["Author","Commit ID"]}}
            result={result}
            freewidth={true}
            view={(tableConfig ? tableConfig.json() : {})}
            limit={limit}
            start={start}
            orderBy={{}} 
            setFilters = {changeFilters}
            setLimits={changeLimits}
            setOrder={changeOrder}
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

