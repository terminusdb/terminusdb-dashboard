import React from "react"

export const TDBReactCardList=(props) => {

    let config = props.config || []
    let data=props.dataProvider || 0

    const iconName=`fas ${config.icon} fa-1x m-4` 

    return <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
        <div>

            <h6>
                <i className={iconName}></i>
                <span ml={4} className="ml-4">
                    {config.title}
                </span>
            </h6>
        </div>
        <div>
            {/*<Card.Link href="#" className="text-primary fw-bold">
                {data}
            </Card.Link>*/}
            <h4 className="text-primary fw-bold">{data}</h4>
        </div>
    </div>
}
