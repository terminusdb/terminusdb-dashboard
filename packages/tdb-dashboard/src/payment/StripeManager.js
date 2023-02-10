import {useState} from "react"
import { localSettings } from "../../localSettings";
import   axios  from "axios"
import {getOptions,getBaseUrl} from "../hooks/hookUtils"
import {WOQLClientObj} from '../init-woql-client'

const baseUrl=`${localSettings.server}api/private`

export function StripeManager(stripe=null){  
  const axiosHub=axios.create();
  const {clientUser } = WOQLClientObj()
  const baseUrl=getBaseUrl();

  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(false)


  async function deleteSubscrition(){
    try{  
      processStart()
      const token = await clientUser.getTokenSilently()
      const options = getOptions(token);
      const response = await axiosHub.delete(`${baseUrl}/private/subscription`, options)
      return true
    }catch(err){
      const message =  err && err.response && err.response.data ? err.response.data.message : 'There was an error processing your request'
      processError(message)
    }finally{
      processSuccess()
    }
  }

  async function getPaymentMethod(){
      try{  
        const token = await clientUser.getTokenSilently()
        const options = getOptions(token);
        const response = await axiosHub.get(`${baseUrl}/private/paymentmethods`, options)
        setPaymentMethod(response.data)
        return response.data
      }catch(err){
        setPaymentMethod(false)
      }
  }
  

  async function updateSubscription(tier){
    try{
      processStart()
      const token = await clientUser.getTokenSilently()
      const options = getOptions(token);
      await axiosHub.put(`${baseUrl}/private/subscription/${tier}`, {}, options)
      clientUser.userInfo.tier = tier
      processSuccess()
    }catch(err){
      const message =  err && err.response && err.response.data ? err.response.data.message : 'There was an error processing your request'
      processError(message)
    }
}


  async function getPublicStripeKey (){   
     try{
      const token = await clientUser.getTokenSilently()
			const options = getOptions(token);
      const response = await axiosHub.get(`${baseUrl}/private/publickey`, options)
      return response.data.publicKey
     }catch(err){
        console.log("getPublicStripeKey",err.message)
     }
  }

   // after create the pagament method you have to create the customer and link it to the pagament method
  const createCustomer = async ( paymentMethod, billing_details, tier ) => {
    const uname = clientUser.agentName

    const token = await clientUser.getTokenSilently()
    const options = getOptions(token);

    const body= {billing_details: billing_details,
                username: uname, 
                payment_method: paymentMethod,
                tierType:tier}

 // async function getToken(){
      setError(false);
      setSucceeded(false);
      setProcessing(true);
      try{
        const result = await axios.post(`${baseUrl}/private/createcustomer`, body, options)       
        handleSubscription(stripe,result.data,tier)
      }catch(err){
        const message =  err && err.response && err.response.data ? err.response.data.message : 'There was an error processing your request'
        setError(message);
        setSucceeded(false);
      }finally{
        setProcessing(false)
    } 
  }

    const handleSubscription = (stripe,subscription,tier) => {
      const { latest_invoice } = subscription;
      const { payment_intent } = latest_invoice;
    
      if (payment_intent) {
        const { client_secret, status } = payment_intent;
        if (status === 'requires_action' || status === 'requires_payment_method') {
          stripe.confirmCardPayment(client_secret).then(function(result) {
            if (result.error) {
              // Display error message in your UI.
              // The card was declined (i.e. insufficient funds, card has expired, etc)
              processError(result.error.message)
            } else {
              // Show a success message to your customer
              confirmSubscription(subscription.id,tier);
            }
          });
        } else {
          // No additional information was needed
          // Show a success message to your customer
          processSuccess()
          clientUser.userInfo.tier = tier
        }
      } else {
        processSuccess()
        clientUser.userInfo.tier = tier
      }
    }

    const confirmSubscription = async (subscriptionId,tier) => {
      //async function getToken(){
        const token = await clientUser.getTokenSilently()
        const options = getOptions(token);
        const body = {
          subscriptionId: subscriptionId
        }
        const response = await axios.post(`${baseUrl}/private/subscription`, body, options)
        //const {clientUser} = WOQLClientObj()
        //update tiers
        //get from the server
        //update the tier sub 
        // maybe call server and get the info again !!
        clientUser.userInfo.tier = tier
        setProcessing(false);
        setSucceeded(true);
        setError(null);

        return response
      }  
      

      const processStart = () =>{ 
        setProcessing(true);
        setSucceeded(false);
        setError(null);
      }

      const processError = (errorMessage) =>{ 
        setProcessing(false);
        setSucceeded(false);
        setError(errorMessage);
      }

      const processSuccess = () =>{ 
        setProcessing(false);
        setSucceeded(true);
        setError(null);
      }
    

  return {getPublicStripeKey, deleteSubscrition,
          createCustomer, 
          updateSubscription,
          processError, 
          processStart, 
          processSuccess, succeeded, error, processing,getPaymentMethod,paymentMethod};
}