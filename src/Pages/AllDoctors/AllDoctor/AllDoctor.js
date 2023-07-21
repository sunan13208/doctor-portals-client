import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate=useNavigate()
  
    const handleAddDoctor =async (data) => {
       const key =process.env.REACT_APP_image
       const formData=new FormData()
       const image=data.img[0]
       formData.append('image',image)
       const url=`https://api.imgbb.com/1/upload?key=${key}`
       try{
           const res =await fetch(url,{
               method:"POST",
               body:formData
           })
           const result=await res.json()
           if(result.success){
            const doctor={
                name:data.name,
                email:data.email,
                specialty:data.specialty,
                url:result.data.url

            }
            fetch('https://doctor-portal-server-lyart.vercel.app/doctor',{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    token:`${localStorage.getItem('accessToken')}`
                },
                body:JSON.stringify(doctor)
            })
            .then(res=>res.json())
            .then(result=>{
                if(result.acknowledged){
                    toast.success(`${data.name} added successfully`)
                    navigate('/dashboard/mangedoctors')
                }
            })
           }
       }
       catch(err){
           console.error(err)
       }


    }
    const {data:speciltyOptions=[],isPending,isError,error}=useQuery({
        queryKey:['specialty'],
        queryFn:async()=>{
            const res=await fetch(`https://doctor-portal-server-lyart.vercel.app/appointmentSpecialty`)
            const data=await res.json()
            return data
        }
    })
    if(isPending){
        return <span className="loading loading-dots loading-lg"></span>
    }
    if(isError){
       return <h2>Error: {error.message}</h2>
    }
    return (
        <div className='w-96 p-7'>
            <h1 className='text-4xl font-semibold'>All Doctors</h1>
            <form onSubmit={handleSubmit(handleAddDoctor)} >
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
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register('specialty')} className="select select-bordered">
                        <option disabled selected>Add your Specialty fields</option>
                        {
                            speciltyOptions.map(option=><option key={option._id}>{option.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input type="file" {...register('img', { required: "Give the Doctor's image" })} className="input input-bordered w-full " />
                </div>
                <input type="submit" value='Add Doctor' className='btn btn-accent w-full my-4' />
            </form>
        </div>
    );
};

export default AllDoctor;