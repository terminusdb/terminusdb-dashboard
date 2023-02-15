/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
//import './CardSectionStyles.css'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "white",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#cccccc",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
// Element collects postal code based on the country where the credit card is from and check if it is valid
// it will only collect zip/postal for credit cards from US, UK, and CA. 
// the postal code is not visible for contry that not need it
function CardSection({onChange}) {
  return (
      <CardElement options={CARD_ELEMENT_OPTIONS} className="border-light-01 form-control pt-3" onChange={onChange}/>
  );
};

export default CardSection;