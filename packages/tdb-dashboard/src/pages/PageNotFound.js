import React from "react"
import CowDuckHead from '../assets/CowDuckHead.png';
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
    const navigate = useNavigate()

    function goBack() {
        navigate('/')
    }

    return <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
            <h1 className="display-1 d-flex justify-content-center fw-bold">
                <div className="tdb__page__not__found__heading tdb__page__not__found__text mt-4">4</div>
                <img className="card-img cowduck-feedback-avatar large-avatar rounded-circle mx-auto cowduck__border" 
                    src={CowDuckHead} 
                    alt="CowDuckHead404" />
                <div className="tdb__page__not__found__heading tdb__page__not__found__text mt-4">4</div>
            </h1>
      
            <p className="fs-3 tdb__page__not__found__text"> <span className="text-success">Oops!</span> Page not found.</p>
            <p className="tdb__page__not__found__text">
                The page you’re looking for doesn’t exist.
            </p>
            <Button className="btn btn-info w-100" onClick={goBack}>Go Home</Button>
        </div>
    </div>
}