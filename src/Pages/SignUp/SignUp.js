import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Context/AuthProvider';
import { toast } from 'react-toastify';
import useToken from '../../Hook/useHook';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createuser, updateName } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [email,setEmail]= useState('')
    const [token]=useToken(email)
    let navigate = useNavigate();
    let location = useLocation();

    
    let from = location.state?.from?.pathname || "/";
    const handleSignup = (data) => {
        setError('')
        createuser(data.email, data.password)
            .then(result => {
                const user = result.user
                const userInfo = {
                    displayName: data.name
                }
                updateName(userInfo)
                    .then(() => {
                        saveUser(data.name,data.email)
                    })
                    .catch(err => console.log(err))
                   
            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })
    }

    const saveUser=(name,email)=>{
        const details ={name,email}
        fetch('https://doctor-portal-server-lyart.vercel.app/users',{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(details)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                setEmail(email)
                toast.success("Sign up successful") 
                navigate(from, { replace: true });              
            }
        })
    }
    if(token){
       
    }
    return (
        <div className='h-[620px] w-[420px] p-10  mx-auto flex justify-center items-center flex-col gap-3 shadow-xl rounded-xl'>
            <div>
                <h1 className='text-4xl'>Sign Up</h1>
            </div>
            <div className='grid grid-cols-1 gap-3s'>
                <form onSubmit={handleSubmit(handleSignup)} >
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" {...register('name', { required: "Name is required" })} className="input input-bordered w-full " />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register('email', { required: "Email Address is required" })} className="input input-bordered w-full " />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label pt-0">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 charactes or above" },
                            pattern: { value: /(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])/, message: "Password must be strong" }
                        })} className="input input-bordered w-full " />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input type="submit" className='btn btn-accent w-full my-4' />
                    {error && <p className='text-red-600'>{error}</p>}
                </form>
                <p>Already have an account? <Link to='/login' className='text-secondary'>Log in your account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline'>Contiune with google</button>
            </div>

        </div>
    );
};

export default SignUp;