import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const PrivateRouter = ({children}) => {
    let location = useLocation();
    const {user,loading}=useContext(AuthContext)

    if(loading){
      return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user?.uid){
        return children
    }
    else{
      return  <Navigate to="/login" state={{ from: location }} replace />;
    }

};

export default PrivateRouter;