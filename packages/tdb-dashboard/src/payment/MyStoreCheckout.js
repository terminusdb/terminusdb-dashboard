import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import FormPayment from './FormPayment'
import {
  Elements,
} from '@stripe/react-stripe-js';

//process.env.STRIPE_TEST_PUBLISHABLE_KEY
import api from "./Api";

//const stripePromise = loadStripe('pk_test_gMeVkO8PvMWToY2uTezDA52D00Tpsnvy5S');

const MyStoreCheckout = (props) => {

  const stripePromise = api.getPublicStripeKey(props.accessToken).then(key => loadStripe(key));
 
  return (<Elements stripe={stripePromise}>
		    <FormPayment {...props}/>
		  </Elements>)
};


export default MyStoreCheckout;