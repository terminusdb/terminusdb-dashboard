// to be review if we need a search inside the table
export const searchResult = ({searchInvitation}) => {
    let invites=[]
    orgInvitationsArr.map((item)=> {

        if(searchInvitation && (!item.email.toUpperCase().includes(searchInvitation.toUpperCase()))) {
            return false
        }
        var color

        const invFullId =  item['@id']
        const invId = invFullId.substr(invFullId.lastIndexOf("/")+1)
        //"Organization/collar_team/invitations/Invitation/b1dc905a8e64371c37c11db84d30790a42c0ab1b097abf3b16fca81a2c2c54e4"
        if(item.status == "pending") color="warning"
        else if (item.status == "rejected") color="danger"
        else if (item.status == "inactive") color="muted"

        invites.push(<Row key={`member_${invId}`} className="mb-3">
            <Col md={6} className="d-flex">
                {item.email_to}
            </Col>
            <Col md={4}>
                <span className={`text-${color}`}>
                    {item.status}
                </span>
            </Col>
            <Col md={2}>
                <button id={invId}  onClick={deleteInvitationItem} className="tdb__button__base tdb__panel__button tdb__panel__button--red fas fa-trash-alt"></button>                   
            </Col>
        </Row>)
    })
    return invites
}

export function filterCapability (capArr,orgId){
    let role;
    let databases= {}
    capArr.forEach(cap => {
        if(cap.scope === orgId){
            role = cap.role
        }else if(cap.scope.startsWith("UserDatabase")){
            databases[cap.scope] = cap.role
        }

    })

    return {role,databases}
}