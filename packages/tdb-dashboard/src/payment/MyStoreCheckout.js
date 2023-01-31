import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {FormPayment} from './FormPayment'
import {
  Elements,
} from '@stripe/react-stripe-js';

//process.env.STRIPE_TEST_PUBLISHABLE_KEY
import {StripeManager} from "./StripeManager";

//const stripePromise = loadStripe('pk_test_gMeVkO8PvMWToY2uTezDA52D00Tpsnvy5S');

const MyStoreCheckout = (props) => {

  const {getPublicStripeKey} = StripeManager()

  const stripePromise = getPublicStripeKey(props.accessToken).then(key => loadStripe(key));
 
  return (stripePromise && <Elements stripe={stripePromise}>
               <FormPayment {...props}/>
		  </Elements>)
};


export default MyStoreCheckout;

// 