import React from "react";
import {Card, Row, Col} from '@themesberg/react-bootstrap';

export function DatabaseCard (props) {

  return  <div className="card border-secondary mb-4">
    <div className="card-body">
        <h4 className="card-title">Secondary card title</h4>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    </div> 

    let label = props.label || props.id
    let description = props.description || false
    

    return <Card className="shadow-sm m-4">
        <Card.Body>
          <Row className="d-block d-xl-flex align-items-center">
            
            <Col xl={2} className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0">
                <div className={`icon icon-shape icon-md rounded me-4 me-sm-0`}>
                  <h6><i class={"far fa-bookmark fa-2x"}/></h6>
                </div>
            </Col>

            <Col md={10} className="px-xl-0">
              <div className="d-none d-sm-block">
                <h5 className="h5 ml-3">{label}</h5>
                <p className="ml-3 mr-3">{description}</p>
                <h6 className="ml-3">{label}</h6>
                <h6 className="ml-3">{123}</h6>
                <h6 className="ml-3">{"2 months ago"}</h6>
                <h6 className="ml-3">{"5 months ago by reg@gmail.com"}</h6>
                <h6 className="ml-3">{"276.97 KB"}</h6>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
     

}