import React, {useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "./Api";
import { Button, Form, FormGroup, FormControl} from 'react-bootstrap'; 
import {FormPaymentLabels} from "./labels";
// import { useAuth0 } from "../../react-auth0-spa";  
import CardSection from "./CardSection";

import  axios  from "axios" ; 

/*
Visa: 4242 4242 4242 4242.  //00000
Mastercard: 5555 5555 5555 4444.
American Express: 3782 822463 10005.
https://stripe.com/docs/testing#international-cards
https://dashboard.stripe.com/test/customers
*/
const bff_url= process.env.REACT_APP_BFF_URL || '/';
const baseUrl=`${bff_url}api/private`

export default function FormPayment(props) {
 // const { user, isAuthenticated, getTokenSilently } = useAuth0();
  //const user = 
  const [subQuantities,setQuantities] = useState(1);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false)


  //const user_email= user ? user['http://terminusdb.com/schema/system#user_identifier'] : ''

  const [ userEmail, setEmail ] = useState(props.defaultEmail)//props.defaultEmail);
  const [ userCard, setUserCard ] = useState('');

  
  const setSubQuantities=(evt)=>{
      const value = evt.target.value;
      setQuantities(value);
  }

  const changeEmail = (evt) =>{
       const value = evt.target.value;
       setEmail(value);
  }

  const changeCardUser = (evt) =>{
       const value = evt.target.value;
       setUserCard(value);
  }

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (ev) =>{
  //var cardholderEmail = document.querySelector('#email').value;
    ev.preventDefault();
    setProcessing(true);
    setSucceeded(false);
    setError(null);
    stripe.createPaymentMethod('card', elements.getElement(CardElement), {
      billing_details: {

          name: userCard,
          email:userEmail
       }
    })
    .then(function(result) {
      if (result.error) {
        setError(result.error);
        setProcessing(false);
       //console.log("[error]", result.error);
      } else {
        createCustomer(result.paymentMethod.id, userEmail);
      }
    }).catch(function(err){

     //console.log(err)

    })
    ;
};


const createCustomer = async (paymentMethod, cardholderEmail) => {
    let uname = user ? user['http://terminusdb.com/schema/system#agent_name'] : ""

    const options = {
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'client',
    };

    const body= {email: cardholderEmail,
                username: uname, 
                payment_method: paymentMethod}

 // async function getToken(){
      setError(false);
      setSucceeded(false);
      setProcessing(true);
      try{
        //const accessToken = await getTokenSilently();
        options.headers = { Authorization: `Bearer ${props.accessToken}` };
        const result = await axios.post(`${baseUrl}/createcustomer`, body, options)
        
        handleSubscription(result.data);

        setError(false);
        setSucceeded(true);
        setProcessing(false);
      }catch(err){
        const message = err.response.data ? err.response.data.message : 'There was an error processing your request'
        setError(message);
        setSucceeded(false);
      }finally{
        setProcessing(false)
    } 
    }
      


const handleSubscription = (subscription) => {
  const { latest_invoice } = subscription;
  const { payment_intent } = latest_invoice;

  if (payment_intent) {
    const { client_secret, status } = payment_intent;
    if (status === 'requires_action' || status === 'requires_payment_method') {
      stripe.confirmCardPayment(client_secret).then(function(result) {
        if (result.error) {
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc)
          setProcessing(false);
          setSucceeded(false);
          setError(result.error);
        } else {
          // Show a success message to your customer
          confirmSubscription(subscription.id);
        }
      });
    } else {
      // No additional information was needed
      // Show a success message to your customer
      setProcessing(false);
      setSucceeded(true);
      setError(null);
    }
  } else {
    setProcessing(false);
    setSucceeded(true);
    setError(null);
  }
}

 const confirmSubscription = async (subscriptionId) => {
  //async function getToken(){
    const accessToken = await getTokenSilently();
    return fetch(`${baseUrl}/subscription`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        subscriptionId: subscriptionId
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(subscription) {
        setProcessing(false);
        setSucceeded(true);
        setError(null);
      });
 // }

  //return getToken();
}

  const renderSuccess = () => {
      return (
        <div className="sr-field-success message mt-4 mb-4  ">
          <img width="300" src="https://assets.terminusdb.com/terminusdb-console/images/cowduck-space.png" />
          <h1 className="router-link-exact-active mt-4">{FormPaymentLabels.successTitle}</h1>
          <p>{FormPaymentLabels.successSubtile}</p>
          <a href="./profile">Return to Profile</a>
        </div>
      );
  };

  const renderForm = () => {


      if(elements) {
            let ce = elements.getElement(CardElement)
            if(ce){
                ce.on('change', function(event) {
                    if (event.complete) {
                        setEnableSubmit(true)                    
                        // enable payment button
                    } else if (event.error) {
                        setEnableSubmit(false)
                        if(event.error.message){      
                            setError(event.error.message)
                        }
                        else {
                            //console.log(event.error)
                            setError("There was an error in processing your request")
                        }
                        // show validation to customer
                    }  
                    else {
                        setError(false)
                        setEnableSubmit(false)   
                    }               
                });
            }  
        }
    return (
      <Form className="text-left mt-4" onSubmit={handleSubmit}>
        <FormGroup >
          <Form.Label for="email">Billing Email</Form.Label>
          <FormControl className="border-light-01" type="email" name="email" id="email" placeholder="email" defaultValue={userEmail} onBlur={changeEmail} />          
        </FormGroup>
        <FormGroup >
          <Form.Label for="name">Name on Card</Form.Label>
          <FormControl className="border-light-01" type="text" name="name" id="name" placeholder="name on card" required={true} onBlur={changeCardUser}/>
        </FormGroup>
        <FormGroup>
          <Form.Label for="cardNumber">Card Number</Form.Label>
            <CardSection />
            {error && <div className="mt-4 alert alert-danger">{error}</div>}
        </FormGroup>
            <div style={{float: "left", fontSize: "10px", color: "#888" }}>
                <i>* your account will be billed based on your usage of the service until cancelled.</i>
            </div>
          <button style={{padding:0}}
          className="large-banner_button large-banner_button--no-shadow" disabled={processing  || !enableSubmit || !stripe}>

          {processing ? "Processing…" : "Subscribe"}
        </button>

      </Form>
    );
  };

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
       {succeeded ? renderSuccess() : renderForm()}
      </div>
    </div>
  );
}
//{succeeded ? renderSuccess() : renderForm()}