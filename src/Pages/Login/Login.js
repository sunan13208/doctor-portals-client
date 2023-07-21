import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hook/useHook';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();
    let location = useLocation();


    let from = location.state?.from?.pathname || "/";
    const { login } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [createMyEmail, setCreateMyEmail] = useState('')
    const [token] = useToken(createMyEmail)
    const handleLogin = (data) => {
        setError('')
        login(data.email, data.password)
            .then(result => {
                toast.success("Sign up successful")
                navigate(from, { replace: true });


            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })
        setCreateMyEmail(data.email)
    }
 if(token){
    
 }
    return (
        <div className='h-[550px] w-[420px] p-10 mx-auto flex justify-center items-center flex-col gap-3 shadow-xl rounded-xl'>
            <div>
                <h1 className='text-4xl'>Log in</h1>
            </div>
            <div className='grid grid-cols-1 gap-3s'>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Provide a valid Email address" },)} className="input input-bordered w-full " />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label pt-0">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", { required: "Provide a valid password", minLength: { value: 6, message: "Password must be 6 characters or longer" } })} className="input input-bordered w-full " />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label pb-0">
                            <span className="label-text"><Link to=''>Forget Passowrd?</Link></span>
                        </label>
                    </div>
                    <input type="submit" className='btn btn-accent w-full my-4' />
                    {error && <p className='text-red-600'>{error}</p>}
                </form>
                <p>New to Doctors Portals? <Link to='/signup' className='text-secondary'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline'>Contiune with google</button>
            </div>

        </div>
    );
};

export default Login;