//import { useAuth0 } from "../../react-auth0-spa";  

const bff_url= process.env.REACT_APP_BFF_URL || '/';
const baseUrl=`${bff_url}api/private`

const getPublicStripeKey = accessToken => {
  return window
    .fetch(`${baseUrl}/publickey`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
     //console.log("__DATA__",data)
      if (!data || data.error) {
       //console.log("API error:", { data });
        throw Error("API Error");
      } else {
        return data.publicKey;
      }
    });
};

const api = {
  getPublicStripeKey: getPublicStripeKey
};

export default api;