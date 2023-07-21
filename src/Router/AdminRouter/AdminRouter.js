import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdmin from '../../Hook/useAdmin';

const AdminRouter = ({children}) => {
    let location = useLocation();
    const {user,loading}=useContext(AuthContext)
    const [isAdmin,isAdminLoading]=useAdmin(user.email)

    if(loading || isAdminLoading){
      return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user?.uid && isAdmin){
        return children
    }
    else{
      return  <Navigate to="/login" state={{ from: location }} replace />;
    }

};

export default AdminRouter;