import React from 'react';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../Hook/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashBoardLayout = () => {
    const {user}=useContext(AuthContext)
    const [isAdmin]=useAdmin(user.email)
    return (
        <div>
            <Navbar></Navbar>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content w-full">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to='/dashboard'>My Appointment</Link></li>
                     { isAdmin && <li><Link to='/dashboard/Users'>All Users</Link></li>}
                     { isAdmin && <li><Link to='/dashboard/doctors'>Add Doctors</Link></li>}
                     { isAdmin && <li><Link to='/dashboard/mangedoctors'>Mange Doctors</Link></li>}
                       
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;