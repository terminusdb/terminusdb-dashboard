import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import {InitObj} from "./init"
import {DATA_PRODUCTS} from "./constants"

export const Connect = () => { 
	const {
        dataProduct,
		setDataProduct
	} = InitObj()

	let elements=[]

	function handleConnect(dp) {
		if(setDataProduct) setDataProduct(dp)
	}

	DATA_PRODUCTS.map((dp, idx) => {
		elements.push(
			<React.Fragment>
				<Button variant="outline-success" 
					key={idx}
					onClick={(e) => handleConnect(dp)}>{dp}</Button>{' '}
			</React.Fragment>
		)
	})

	return <div className="w-100 mb-5">
		{elements}
	</div>
}