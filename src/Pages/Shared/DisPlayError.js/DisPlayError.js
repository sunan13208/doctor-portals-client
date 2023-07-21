import React from 'react';
import { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const DisPlayError = () => {
    const error = useRouteError()
    const {logout}=useContext(AuthContext)
    const handleLogOut=()=>{
        logout()
        .then(()=>{})
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <h1 className='text-2xl'>Oops!</h1>
            <p className='text-xl text-red-500'>Sorry, an unexpected error has occurred.</p>
            <p className='text-xl text-red-500'>
               {error.statusText || error.message}
            </p>
            <p>Please <button onClick={handleLogOut} className='btn btn-error'>LogOut</button> and Login again</p>
        </div>
    );
};

export default DisPlayError;