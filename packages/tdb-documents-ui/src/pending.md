- add language support for enums  ✅ 
{ "@id" : "Choice",
  "@type" : "Enum",
  "@documentation" : [
     {
       "@language" : "en",
       "@label" : "Choice",
       "@comment" : "A Choice of a thing",
       "@values" : {
         "yes" : { "@label" : "yes",
                   "@comment" : "Is it a yes?" },
         "no" : { "@label" : "no",
                  "@comment" : "Or is it a no?" }
       }
     },
     {
       "@language" : "ka",
       "@label" : "არჩევანი",
       "@values" : {
          "yes" : { "@label" : "დიახ",
                    "@comment" : "კია?" },
          "no" : { "@label" : "არა",
                   "@comment" : "ან არის არა?" }
       }
     }
  ],
  "@value" : ["yes", "no"]
}

- finish  @documentation to choice sub documents - fix legend & documentation ✅ 
- finish  @documentation to choice documents - fix legend & documentation
- finish one ofs - @documentation

- array dimensions

- fix traverse of docs 

- test frame viewer against CAMS/ Nucalear/ Playground 

- diff viewer

- geo jsons - fix b box & multi polygon & geo json 

- fix ui visible ✅ 

- check if key - should be editable if not filled

- fix labels under set and list 

- align label and input properly in form - css

- fix on submit error message and form data refresh 

- fix subdocument in view mode if empty dont display 

- boolean false in VIEW mode

- diff with markdown insert/ delete


DONE LIST 
PLAYGROUND 
 =  Person  ✅ 
 =  Info    ✅ 
 =  Job     ✅ 
 =  Unordered Person   ✅ 
 =  Ordered Person     ✅ 
 =  Feature 
 =  Feature Collection 
 =  Geometry Collection
 =  Point
 =  Polygon
 =  Line String
 =  Multi Polygon
 =  Student (Choice Subdocument)  ✅ 
 =  Art  ✅ 
 =  Dance ✅ 
 =  Music ✅ 
 =  Guy (Choice Documents) 
 =  Employee ✅ 
 =  Teacher => fix ui hidden  ✅ 
 =  Graduate (One ofs)
 =  Computer Students ✅ 
 =  Example
 =  DifferentPerson 
 =  List 
 =  TEST 




 !!!!!!! IMPORTANT !!!!!!!!!!

 - workspace linked to tdb_documents_ui_test 
 - before push rename and re install all the links from workspace at root package level




--------- AFTER COMING BACK ----  JAN 3
--- markdown WWYSIG editor with preview button  ✅ 
--- nomal diff checker diff for markdown  ✅ 
--- ui order for classes & sub documents ... ✅ 



DASHBOARD 
- fix json code mirror - cursor is always at end
- fix prefix document View ID routing
- add new data product button to TEAM PAGE 
- add team list to clone interface



