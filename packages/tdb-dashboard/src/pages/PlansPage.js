import React, {useState,useEffect} from "react";
import { PLANS_DESCRIPTION,COMMUNITY_PLAN,PROFESSIONAL_PLAN,SCALE_PLAN,ENTERPRISE_PLAN} from "../payment/labels"
import {Layout} from "./Layout"
import {Container, Card, Row, Col, Button, Stack} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {PaymentPage} from "./PaymentPage"
import {WOQLClientObj} from '../init-woql-client' 
import { Feedback } from "./Feedback";
import {MdEuroSymbol} from "react-icons/md"
import { StripeManager } from "../payment/StripeManager";
/*
* the plan card, we use this component in home page
*/
export const PlansPage = (props) => {
	const {clientUser} = WOQLClientObj()
	const navigate = useNavigate()
	const [showFeedbackForm, setShowFeedbackForm] = useState(false)
	const [showModalPlan ,setShowModalPlan] = useState(false)
	const {getPaymentMethod,paymentMethod} = StripeManager()
	
	const tier = clientUser && clientUser.userInfo ? clientUser.userInfo.tier : "Community"

	const contactUs=(subject)=>{
		props.setSubject(subject)
	}

	useEffect(() => {
		getPaymentMethod()
    },[])

	const proButtonStyle= {padding:"0px"} //: {padding:"0px"}

	const getLabels = (arr)=>{
		return arr.labelsList.map((label,index)=>{
			return <label key={index}>{label}</label>
		})
	}
	const toBedisabled= {
		[PROFESSIONAL_PLAN] : PROFESSIONAL_PLAN,
		[SCALE_PLAN] : SCALE_PLAN
	}


	const getPlanButton = (plansObj)=>{
		const plansActionsObj = {
			[COMMUNITY_PLAN] : ()=>{navigate("/")},
			[PROFESSIONAL_PLAN] : () =>{setShowModalPlan(plansObj)},
			[SCALE_PLAN] : () =>{setShowModalPlan(plansObj)},
			[ENTERPRISE_PLAN] : ()=>{setShowFeedbackForm(true)},

		}
		let planAction = {onClick:plansActionsObj[plansObj.title]}
		const style= {background:plansObj.color}
		let disabled = {}
		if(plansObj.title ===  toBedisabled[tier]){
			planAction = {}
			disabled = {disabled:true}
		}

		return <Button {...planAction} style= {style} {...disabled}
				className="text-white fw-bold w-100 mt-5 mb-5 pt-3 pb-3" >
				{plansObj.buttonLabel}
				</Button>
	}

	return(<Layout showLeftSideBar={false}>
		{showModalPlan && <PaymentPage showModal={showModalPlan !== false ? true : false } 
				setShowModal={setShowModalPlan} subscriptionObj={showModalPlan}/>}
		{showFeedbackForm && < Feedback boxType= {ENTERPRISE_PLAN} setShowFeedbackForm={setShowFeedbackForm}/>}
		 <Container className="center-align col-md-10">
		 <Row xs={1} md={4} className="g-4 py-2 w-100">
				{PLANS_DESCRIPTION.map((arr) => {
					const planButton = getPlanButton(arr)
					const cardClass = tier === arr.title ? "border border-white border-5 h-100" : "h-100"
					return <Col className="py-1 col-md-3" key={arr.title}>
							<Card className={cardClass}>
								<Card.Header style={{background:arr.color}}>
									<Card.Title style={{color:"white !important"}} className=" fw-bold m-5">{arr.title}</Card.Title>
								</Card.Header>
								<Card.Body>
									<Stack direction="horizontal" gap={0} className="justify-content-center">
										{(arr.title === PROFESSIONAL_PLAN || arr.title === SCALE_PLAN) &&
											<MdEuroSymbol size="35"/>
										} 		
										<h1>{arr.price} <span className="h6" style={{marginLeft:"-10px;"}}>{arr.subprice}</span></h1>
									</Stack>									
										{planButton}							
									<Card.Text className="text-light text-left h6">
										{arr.text}
									</Card.Text>
									<Stack direction="vertical">
									{getLabels(arr)}
									</Stack>
								</Card.Body>
								<Card.Footer  style={{background:arr.color}}>
								</Card.Footer >
							</Card>
						</Col>
				})}
			</Row>
		 </Container>
		</Layout>

	)

}