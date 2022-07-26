import React, {useState,useEffect} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from "react-bootstrap";
import   axios  from "axios" ; 

export const Extrafields = (props) => {

    let [pid, setPid] = useState("")
    let [error, setError] = useState("")
    let [state, setState] = useState()
    let [uid, setUid] = useState()
    let [bearer, setBearer] = useState()

    function updatePid(e){
        setError("")
        setPid(e.target.value)
    }

    function sendBackToAuth(){
        //REACT_APP_AUTH0_DOMAIN
        window.location.replace("https://" + process.env.AUTH0_DOMAIN + "/continue?state=" + state+"&team=testmyteam");
    }


    function invalid_id(id){
        if(!id || id == ""){
            return "empty"
        }
        if(id.length > 30){
            return "Maximum length of id is 30 Characters"
        }
        if(id.length < 4){
            return "Minimum length of id is 6 Characters"
        }
        if(!id.match(/^[0-9a-z_\-]+$/)) {
            return "ID can only consist of lower case letters a-z, numbers 0-9, dash -, and underscore _"
        }
        return false
    }

    function updateAuth0() {

        const bff_url= process.env.REACT_APP_BFF_URL || '/';
        const baseUrl=`${bff_url}api/username`
        const axiosHub=axios.create();
        const body = {
            uid: uid,
            username: pid,
            token: bearer
        }

        axiosHub.post(baseUrl, body)
        .then( () => {
            sendBackToAuth()
        })
        .catch((e) => {
            if(e && e.response && e.response.data){
                setError(e.response.data)
            }
            else {
                setError("Failed to set team with authentication provider")
            }
        })
    }


    function tryPid(){ 
        return sendBackToAuth()  
        let e = invalid_id(pid)
        if(e){
            setError(e)
            return false
        }
        const bff_url= process.env.REACT_APP_BFF_URL || '/';
        const baseUrl=`${bff_url}api/username`
    	const axiosHub=axios.create();
        axiosHub.get(`${baseUrl}/${pid}`)
        .then( () => {
            setError("Publisher ID already exists - choose a different one")
        })
        .catch((e) => {
            if(e.response && e.response.status === 404){
                updateAuth0()
            }
            else {
                setError(error.response.data)
            }
        })
    } 
    
    function checkKeys(event){
        if(event.key === "Enter") {
            tryPid()
        }
    } 

    useEffect(() => {
        if (window.location.search.includes("token=") ) {
            const query = new URLSearchParams(window.location.search);
            const token = query.get('token')
            const base64Url = token.split('.')[1]
            //const buff = Buffer.from(base64Url, 'base64');
            //const b64 = buff.toString();
            //const jwtDec = JSON.parse(b64)        
            const auth = query.get('state')
            setState(auth)
            //setUid(jwtDec.sub)
            //setBearer(jwtDec.update)
           //console.log(jwtDec)//123
        }    
    }, [])

    return (
        <div style={{height: "2000px", width: "100%",backgroundColor: "#00C08B"}}>
            <div className="sign-in-modal">
                <div className="sign-in-logo">
                    <img src="https://terminusdb.com/img/logos/logo.svg" />
                </div>
                <div className="sign-in-title">
                    Choose Team name 
                </div>
                <div className="pid_input">
                    <div className="pid_input_box">
                        <input 
                            type='text'
                            value={pid}
                            placeholder="Enter team name" 
                        />
                    </div>
                    <div className="pid_help">
                        {error && 
                            <span className="pid_error">{error}</span>
                        }
                        {!error && 
                            <span className="pid_info">Your databases will be published at <span className='pseudo-link'>https://hub.terminusdb.com/{pid || "<id>"}</span></span>
                        }
                    </div>
                </div>
                <div className="pid_submit">
                    <Button
                            color = "primary"
                            onClick={tryPid}
                            className = "btn-margin">
                        Go 
                    </Button>
                </div>
            </div>
        </div>
    )    
}
