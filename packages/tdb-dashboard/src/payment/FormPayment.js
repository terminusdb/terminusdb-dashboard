import React, {useRef, useState,useEffect} from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "./StripeManager";
import { Button, Form, FormGroup, FormControl,Card, Row, Col, Stack, } from 'react-bootstrap'; 
import {FormPaymentLabels} from "./labels";
// import { useAuth0 } from "../../react-auth0-spa";  
import CardSection from "./CardSection";
import {StripeManager} from "./StripeManager"
import { CountrySelector } from "./CountrySelector";

import  axios  from "axios" ; 
import { Label } from "recharts";
import {MdEuroSymbol} from "react-icons/md"
import { useNavigate } from "react-router-dom";
/*
Visa: 4242 4242 4242 4242.  //00000
Mastercard: 5555 5555 5555 4444.
American Express: 3782 822463 10005.
https://stripe.com/docs/testing#international-cards
https://dashboard.stripe.com/test/customers
https://stripe.com/docs/testing#cards test cards
*/

export function FormPayment(props) {
  const [enableSubmit, setEnableSubmit] = useState(false)
  const navigate = useNavigate()

  const userEmail = useRef(null);
  const userCard = useRef(null);
  const country = useRef(null);
  const postalCode = useRef(null);
  //const companyName= useRef(null);
  const province = useRef(null);
  const city = useRef(null);
  const address = useRef(null);

  const stripe = useStripe();
  const elements = useElements();

  const {createCustomer, 
        processError, 
        processStart, 
        succeeded, 
        error, 
        processing, 
        getPaymentMethod, 
        paymentMethod,
        updateSubscription} = StripeManager(stripe)

  useEffect(() => {
		getPaymentMethod()
  },[])

  const handleSubmit = (ev) =>{
  //var cardholderEmail = document.querySelector('#email').value;
    ev.preventDefault();
    processStart()
    const userCardValue = userCard.current.value
    const userEmailValue = userEmail.current.value
    const countryValue = country.current.value
    const postalCodeValue = postalCode.current.value
    //const companyNameValue = companyName.current.value
    const provinceValue = province.current.value
    const cityValue = city.current.value
    const addressValue = address.current.value
    /*
    * Stripe will send an email receipt when the payment 
    * succeeds in live mode (but will not send one in test mode).
    */
    const billing_details = {
      name: userCardValue,
      email:userEmailValue,
      "address": {
          "city": cityValue,
          "country": countryValue,
          "line1": addressValue,
          "postal_code": postalCodeValue,
          "state": provinceValue
      }
   }
    stripe.createPaymentMethod('card', 
      elements.getElement(CardElement), {
      billing_details: billing_details
    })
    .then(function(result) {
      if (result.error) {
        processError(result.error.message)
      } else {
        createCustomer(result.paymentMethod.id, billing_details,props.subscriptionObj.title);
      }
    }).catch(function(err){
        processError(err.message)
    })
    ;
};

const renderSuccess = () => {
      function goToHome (){
          navigate("/")
      }

      return (
        <Card className="h-100">
          <Card.Body>
            <img width="300" src="https://assets.terminusdb.com/terminusdb-console/images/cowduck-space.png" />
            <Card.Text className="h1">{FormPaymentLabels.successTitle}</Card.Text>
            <Card.Text className="h4 mt-2">{`${FormPaymentLabels.successSubtitle} ${props.subscriptionObj.title}`} </Card.Text>
            <Button onClick={goToHome}>Go to Home</Button>
          </Card.Body>
        </Card>
      );
  };

  const updateSub = (evt) =>{
    evt.preventDefault()
    updateSubscription(props.subscriptionObj.title)
  }
  const renderForm = () => {
    // we can have 2 type of form 
    // the insert card data or the update price
    // 
    if(!paymentMethod) return ""
    if(paymentMethod.card){
       
        return <Form className="text-left mt-4" onSubmit={updateSub}> 
              <Card className="h-100">
              {error && <div className="mt-4 alert alert-danger">{error}</div>}
                <Card.Title>Credit card</Card.Title>
                <Card.Text className="mb-3">{`${paymentMethod.card.brand} - ${paymentMethod.card.last4}`}</Card.Text>
                {paymentMethod.billing_details && paymentMethod.billing_details.address && 
                  <React.Fragment>
                    <Card.Title>
                      Billing address
                    </Card.Title>
                    <Card.Text>{paymentMethod.billing_details.address.line1}</Card.Text>
                    <Card.Text>{paymentMethod.billing_details.address.line2}</Card.Text>             
                    <Card.Text>{`${paymentMethod.billing_details.address.city} ${paymentMethod.billing_details.address.state}`}</Card.Text>
                    <Card.Text>{`${paymentMethod.billing_details.address.postal_code} ${paymentMethod.billing_details.address.country}`}</Card.Text>
                  </React.Fragment>
                }
                <Card.Footer >
                     <Card.Text className="justify-content-right">Subscription Details</Card.Text>
                      <Stack direction="horizontal" gap={10} className="justify-content-end">
                      <Card.Text>
                      {props.subscriptionObj.title} <MdEuroSymbol /> {props.subscriptionObj.price} (Billed monthly)</Card.Text>
                      </Stack>
                    <div className="d-flex justify-content-end mt-2"> 
                    <Button onClick={props.closeModal} disabled={processing} variant="light" >Cancel</Button>
                    <Button type="submit" disabled={processing || !stripe} className="ml-3">

                      {processing ? "Processing…" : "Subscribe"}
                    </Button>
                    </div>
                    <div className="d-flex justify-content-end mt-2"> 
                      <span style={{fontSize: "15px", color: "#888" }}>* your account will be billed monthly until cancelled.
                      </span>
                    </div>       
								</Card.Footer >
              </Card>
          </Form>
    }
    function onChangeCardElement(event) {
          if (event.complete) {
              setEnableSubmit(true)
              processError(null)                    
              // enable payment button
          } else if (event.error) {
              setEnableSubmit(false)
              if(event.error.message){      
                  processError(event.error.message)
              }
              else {
                  processError("There was an error in processing your request")
              }
              // show validation to customer
          }  
          else {
              // processError(false)
              setEnableSubmit(false)   
          }               
      }

    return <Card className="h-100">
              {error && <div className="mt-4 alert alert-danger">{error}</div>}
              <Form className="text-left mt-4" onSubmit={handleSubmit}>
                <Card.Body>         
                    <FormGroup className="mb-4">
                      <Form.Label for="name">Name on Card</Form.Label>
                      <FormControl  ref={userCard} className="border-light-01" 
                        type="text" name="name" id="name" placeholder="name on card" required={true}/>
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Form.Label for="cardNumber">Card Number</Form.Label>
                        <CardSection onChange={onChangeCardElement}/>
                    </FormGroup>
                    <Card.Title className="mt-5">Billing Information</Card.Title>
                    <FormGroup className="mb-4">
                      <Form.Label for="email">Email</Form.Label>
                      <FormControl ref={userEmail}  
                        className="border-light-01" type="email" name="email" id="email" placeholder="Email" 
                        defaultValue={props.defaultEmail} />          
                    </FormGroup>             
                    <FormGroup className="mb-4">
                      <Form.Label for="address">Street Address</Form.Label>
                      <FormControl ref={address}  className="border-light-01" type="text" name="name" id="name" placeholder="Street Address" required={true} />
                    </FormGroup> 
                    <Row>
                        <Col >
                      <FormGroup className="mb-4">
                          <Form.Label for="name">Province/State</Form.Label>
                          <FormControl ref={province}  className="border-light-01" type="text" name="name" id="name" placeholder="Province/State" required={true} />
                        </FormGroup>
                      </Col>
                      <Col >
                      <FormGroup className="mb-4">
                        <Form.Label for="name">City</Form.Label>
                        <FormControl ref={city}  className="border-light-01" type="text" name="name" id="name" placeholder="City" required={true} />
                      </FormGroup>
                      </Col>
                     </Row>
                    <Row>
                    <Col >
                      <FormGroup className="mb-4">
                          <Form.Label for="name" >Country</Form.Label>
                          <CountrySelector setRef={country}  />
                        </FormGroup>
                      </Col>
                      <Col >
                      <FormGroup className="mb-4">
                        <Form.Label for="name">Postal Code</Form.Label>
                        <FormControl ref={postalCode}  className="border-light-01" type="text" name="name" id="name" placeholder="Postal Code" required={true} />
                      </FormGroup>
                      </Col>
                     </Row>             
                </Card.Body>
                <Card.Footer >
                     <Card.Text className="justify-content-right">Subscription Details</Card.Text>
                      <Stack direction="horizontal" gap={10} className="justify-content-end">
                      <Card.Text>
                      {props.subscriptionObj.title} <MdEuroSymbol /> {props.subscriptionObj.price} (Billed monthly)</Card.Text>
                      </Stack>
                    
                      <div className="d-flex justify-content-end mt-2"> 
                        <Button onClick={props.closeModal} disabled={processing} variant="light" >Cancel</Button>
                        <Button type={"submit"} disabled={processing  || !enableSubmit || !stripe} className="ml-3">
                            {processing ? "Processing…" : "Subscribe"}
                        </Button>
                      </div>
                      <div className="d-flex justify-content-end mt-2"> 
                        <span style={{fontSize: "15px", color: "#888" }}>* your account will be billed monthly until cancelled.
                          </span>
                      </div>   
								</Card.Footer >
                </Form>     
                         
      </Card>
  };

 
  return  <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        {succeeded ? renderSuccess() : renderForm()}
      </div>
    </div>  
}

/*
 <FormGroup className="mb-4">
                      <Form.Label for="name">Company Name</Form.Label>
                      <FormControl ref={companyName}  className="border-light-01" type="text" name="name" id="name" placeholder="Company Name" required={true} />
                    </FormGroup>*/