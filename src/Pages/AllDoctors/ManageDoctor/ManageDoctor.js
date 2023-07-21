import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';

const ManageDoctor = () => {
    const [modalData,setModalData]=useState(null)
    const { data: doctors = [], isPending, isError, error, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch(`https://doctor-portal-server-lyart.vercel.app/doctor`, {
                headers: {
                    token: `${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    if (isPending) {
        return <span className="loading loading-dots loading-lg"></span>
    }
    if (isError) {
        return <h2>Error: {error.message}</h2>
    }
    const handleDelete = (id) => {
            fetch(`https://doctor-portal-server-lyart.vercel.app/deleteDoctor?id=${id}`,{
                method:'DELETE',
                headers:{
                    token:`${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if(data.acknowledged){
                        setModalData(null)
                        refetch()
                    }
                    
                })
        
    }
    return (
        <div>
            <h1 className='text-3xl font-semibold mb-5'>Manage Doctor: {doctors.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <tr>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={doctor.url} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{doctor.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {doctor.email}
                                </td>
                                <td>
                                    {doctor.specialty}
                                </td>
                                <th>
                                    <label onClick={()=>setModalData(doctor)} htmlFor="confirm_modal" className="btn btn-error btn-xs">Delete</label>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
                {
                    modalData && <ConfirmModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${modalData.name}. It can't be undo `}
                    setModalData={setModalData}
                    modalData={modalData}
                    handleDelete ={ handleDelete }
                    ></ConfirmModal>
                }
            </div>

        </div>
    );
};

export default ManageDoctor;