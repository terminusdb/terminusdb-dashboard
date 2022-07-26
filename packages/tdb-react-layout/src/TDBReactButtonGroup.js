import React from "react"
import {ButtonGroup, Button} from '@themesberg/react-bootstrap';

export const TDBReactButtonGroup = (props) => {

    let config = props.config || []
    
    const ButtonElement = ({item, variant, size, onClick}) => {
        var icCss
        if(item.icon && item.label) icCss="me-2"
        else icCss=""
        let iconName=item.icon ? `${item.icon} ${icCss}` : null

        function handleOnClick(e, onClick) {
            if(onClick) onClick(e.target.id)
          }

        return <Button title={item.title} variant={variant} size={size} id={item.id} onClick={(e) => handleOnClick(e, onClick)}>
            {iconName && <i className={iconName}/>}
            {item.label}
        </Button>
    }

    return <ButtonGroup className="mr-1 ml-1">
        {config.buttons.map(d => <ButtonElement key={`button-${d.id}`} item={d} onClick={props.onClick} variant={config.variant} size={config.size}/>)}
    </ButtonGroup>
}
