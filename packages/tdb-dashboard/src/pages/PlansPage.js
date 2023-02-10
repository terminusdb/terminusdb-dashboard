import React, {useState,useEffect} from "react";
import { PLANS_DESCRIPTION,COMMUNITY_PLAN,PROFESSIONAL_PLAN,SCALE_PLAN,ENTERPRISE_PLAN} from "../payment/labels"
import {Layout} from "./Layout"
import {Container, Card, Row, Col, Button, Stack} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {PaymentPage} from "../payment/PaymentPage"
import {WOQLClientObj} from '../init-woql-client' 
import { Feedback } from "./Feedback";
import {MdEuroSymbol} from "react-icons/md"
import { StripeManager } from "../payment/StripeManager";
import {CancelSubscription} from "../payment/CancelSubscription";
import {AiOutlineCheck} from "react-icons/ai"
import Badge from "react-bootstrap/Badge"

/*
* the plan card, we use this component in home page
*/
export const PlansPage = (props) => {
	const {clientUser} = WOQLClientObj()
	const navigate = useNavigate()
	const [showFeedbackForm, setShowFeedbackForm] = useState(false)
	const [showModalPlan ,setShowModalPlan] = useState(false)
	const [showModalCancel ,setShowModalCancel] = useState(false)
	const {getPaymentMethod,paymentMethod} = StripeManager()
	
	const tier = clientUser && clientUser.userInfo ? clientUser.userInfo.tier : "Community"

	useEffect(() => {
		getPaymentMethod()
    },[])

	const proButtonStyle= {padding:"0px"} //: {padding:"0px"}


	const getLabels = (arr)=>{
		return arr.labelsList.map((label,index)=>{
			let css=""
			if(label==="placeholder_label") css="opacity-0"
			return <div className={`d-flex w-100 justify-content-center ${css}`}>
				<AiOutlineCheck className="text-muted mt-1 mr-2"/>
				<label key={index}>{label}</label>
			</div>
		})
	}
	const toBedisabled= {
		[PROFESSIONAL_PLAN] : PROFESSIONAL_PLAN,
		[SCALE_PLAN] : SCALE_PLAN
	}

	const communityActions = () =>{
		if(toBedisabled[tier]){
			setShowModalCancel(true)
		}else{
			navigate("/")
		}
	}

	const getPlanButton = (plansObj)=>{
		const plansActionsObj = {
			[COMMUNITY_PLAN] : ()=>{communityActions()},
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

		let buttonLabel = plansObj.buttonLabel
		if(plansObj.title === COMMUNITY_PLAN && toBedisabled[tier]){
			buttonLabel = "Downgrade to Community"
		}

		return <Button {...planAction} style= {style} {...disabled}
			className={`${plansObj.buttonTextColor} fw-bold w-100 mt-1 mb-1 pt-3 pb-3`} >
			{buttonLabel}
		</Button>
	}

	const CurrentSubscriptionBadge = ({tier}) => {
		let payment = PLANS_DESCRIPTION.filter(arr => arr.title === tier)

		if(!payment) return <div/>

		return <Card className="mr-4">
			<Card.Body>
				<Stack direction="horizontal" gap={3}>
					<h6 className="text-light fw-bold">Current Subscription</h6>
					<Badge bg="" className={`ms-auto`} style={{backgroundColor: payment[0].color , color: payment[0].textColor}}>
						{payment[0].title.toUpperCase()}
					</Badge>
					{(tier === PROFESSIONAL_PLAN || tier === SCALE_PLAN) && <div className={`${payment[0].className} border border-0 fw-bold`}>
						<MdEuroSymbol className="mb-1"/>
						{payment[0].price}
					</div>}
					{tier === COMMUNITY_PLAN && <div className={`${payment[0].className} ${payment[0].textColor} border border-0`}>
						{payment[0].price}
					</div>}
				</Stack>
			</Card.Body>
		</Card>
	}

	return(<Layout showLeftSideBar={false}>
		{showModalPlan && <PaymentPage showModal={showModalPlan !== false ? true : false } 
				setShowModal={setShowModalPlan} subscriptionObj={showModalPlan}/>}
		{showModalCancel && <CancelSubscription showModal={showModalCancel} setShowModal={setShowModalCancel} />}
		{showFeedbackForm && < Feedback boxType= {ENTERPRISE_PLAN} setShowFeedbackForm={setShowFeedbackForm}/>}
		 <Container className="center-align col-md-10">
		 	<CurrentSubscriptionBadge tier={tier}/>
			<Row xs={1} md={4} className="g-4 py-2 w-100">
				{PLANS_DESCRIPTION.map((arr) => {
					const planButton = getPlanButton(arr)
					const cardClass = tier === arr.title ? "border border-white border-5 h-100" : "h-100"
					return <Col className="py-1 col-md-3" key={arr.title}>
						<Card className={cardClass}>
							<Card.Body className="justify-content-center">
								<h6 className="text-light fw-lighter text-uppercase mb-3 mt-3">{arr.title}</h6>
								{arr.icon}
								<Stack direction="horizontal" gap={0} className="mt-3 mb-3 justify-content-center">
									{(arr.title === PROFESSIONAL_PLAN || arr.title === SCALE_PLAN) &&
										<MdEuroSymbol size="35"/>
									} 		
									<h1>{arr.price} <span className="h6 text-muted" style={{marginLeft:"-10px;"}}>
										{arr.subprice}
										</span>
									</h1>
								</Stack>									
									
								<Stack direction="vertical" className="mb-3">
									{getLabels(arr)}
								</Stack>	

								{<Card.Text className="text-muted  small">
									{arr.text}
								</Card.Text>}
								{planButton}						
							</Card.Body>
						</Card>
					</Col>
				})}
			</Row>
			<Card>
			</Card>
		 </Container>
		</Layout>

	)

}