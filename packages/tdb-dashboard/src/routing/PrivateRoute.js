import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route , useParams } from "react-router-dom";
import {INVITE_PAGE} from "./constants";
import {WOQLClientObj} from '../init-woql-client'

const PrivateRoute = ({ component: Component, ...rest }) => {

const {clientUser } = WOQLClientObj()
if(!clientUser) return
const { isAuthenticated, loginWithRedirect }  = clientUser

let {refid,teamid} = useParams()

const path = window.location.pathname
//const path="http://localhost:3030/my_product_test?refid=testttjdfjlfwkeowo3ponvjgie4u3iw&team=team0" //`${window.location.origin}/my_product_test?refid=jdfjlfwkeowo3ponvjgie4u3iw%26team=team01`;

//in refid we have the invitation id and the teamName
  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        const loginConf ={
          appState: { targetUrl: path }
          
        }
        if(refid && teamid){
          const returnTo=`${window.location.origin}?refid=${refid}&team=${teamid}`
          const targetUrl=`/invite/${teamid}/${refid}`
          loginConf['returnTo'] = returnTo
          loginConf['appState'] = { targetUrl: targetUrl }
        }
       await loginWithRedirect(loginConf)
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, path]);

  return isAuthenticated === true ? <Component {...rest} /> : <div/>;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

export default PrivateRoute;
