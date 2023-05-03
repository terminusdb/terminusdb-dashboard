import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ClientProvider} from './dashboard-context'
import '@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__darkly.css' 


const localSettings = {server:"http://localhost:4242/Terminusdb_demo_01",
                       organization:"Terminusdb_demo_01",
                       user:"francesca@datachemist.com",
                       token:"dGVybWludXNkYjovLy9kYXRhL2tleXNfYXBpLzIzNThlNmZkMDc2OGJjNDIzZjVjMzVjOTc4OGRmNzU4NTNjNjcyNjgwOTMwYWEwZmFiZjdiOGE3NDMzM2RhOTI=_f7e9d172dc984cc381f6913528f608f6fd12727b98c962bd9c57642d9ac0408e334c31965bf10cd198a642bf3696d67e63e6d2069be4a7e5993b82bb3bb135b0c293d970ff9d08e2",
                       db:"test"}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClientProvider params={localSettings}>
    <App/>
  </ClientProvider>
 
);
