import React, {useState} from "react"
import { Card, Accordion,Button } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

//border-secondary
export const TDBReactAccordian = (props) => {
    const { defaultKey, data = [], className = "" } = props;
    const [arrowIconName, setArrowIconName] = useState('fas fa-chevron-down')

    const AccordionItem = (item) => {

        const { eventKey, title, description, icon } = item;
        let iconName = `me-2 ${icon}`

        function CustomToggle ({ children, eventKey }) {
          const decoratedOnClick = useAccordionToggle(eventKey, (e) =>{
           
            setArrowIconName('fas fa-chevron-down')
          }
          )
        
          return <button
              type="button"
              style={{ backgroundColor: 'transparent', border: '0' }}
              onClick={decoratedOnClick}
            >
              {children}
            </button>
        }

        return ( <React.Fragment>
           <Card className="bg-transparent ">

            <CustomToggle as={Card.Header}  
              eventKey={eventKey} 
              className="bg-transparent border-bottom-0">
              {title && <span className="h6 mb-0 fw-bold d-flex">
                  {title}
                  {arrowIconName && <i className={`mr-2 mt-2 text-light ${arrowIconName}`}/>}  
              </span>}
           
            </CustomToggle>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body className="py-2 px-0 mr-4 ml-4">
                {description}
                </Card.Body>
            </Accordion.Collapse>

          </Card>
          <hr className="my-3 border-indigo dropdown-divider mr-3 ml-3" role="separator"></hr>
        </React.Fragment> 
          
        )

    }
  
    return (
      <Accordion className={className} defaultActiveKey={defaultKey}>
            {data.map(d => <AccordionItem key={`accordion-${d.id}`} {...d} />)}
      </Accordion>
    )
}
