
import React from "react"
import {Card, Row, Col} from '@themesberg/react-bootstrap';

export const CardWidget = (props) => {

	let data=props.dataProvider || 0
	let config=props.config || {}
	const iconName=`fas ${config.icon} fa-2x`

	return (
		<Card border="light" className="shadow-sm">
			<Card.Body>
				<Row className="d-block d-xl-flex align-items-center">
					<Col xl={5} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
						<div className={`icon icon-shape icon-md rounded me-4 me-sm-0`}>
							<h6><i className={iconName}/></h6>
						</div>
						<div className="d-sm-none">
						<h5>{config.title}</h5>
						<h3 className="mb-1">{config.data}</h3>
						</div>
					</Col>
					<Col xs={12} xl={7} className="px-xl-0">
						<div className="d-none d-sm-block">
						<h5>{config.title}</h5>
						<h3 className="mb-1">{data}</h3>
						</div>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};
