import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const AllUser = () => {
    const {user}=useContext( AuthContext)
    const details = {
        email: user?.email,
        token:localStorage.getItem('accessToken')
    }
    const { data: users = [],refetch } = useQuery({
        queryKey: ['allusers',user],
        queryFn: async () => {
            const res = await fetch(`https://doctor-portal-server-lyart.vercel.app/allusers`,{
                headers:{
                    token: `${localStorage.getItem('accessToken')}`,
                    email:`${user?.email}`
                },
            })
            const data = await res.json()
            return (data)
        }
    })
   
    const handlemakeadmin=(id)=>{
        fetch(`https://doctor-portal-server-lyart.vercel.app/makeadmin/${id}`,{
            method:'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(details)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                refetch()
            }
        })
    }
    return (
        <div>
            <h1 className='text-xl font-semibold'>All Users</h1>
            <div className="overflow-x-auto mt-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,index)=>
                                <tr className="hover" key={user._id}>
                                <th>{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{
                                user?.role==='admin' ?
                               <button className='btn btn-xs btn-disabled'>Admin</button>: <button onClick={()=>handlemakeadmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>
                               
                                }
                                </td>
                                <td><button className='btn btn-xs btn-accent'>delete</button></td>
                            </tr>
                            )
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;