import React from 'react';

const SideNav = () => {
    return (
        <div className="drawer hidden lg:block lg:drawer-open w-1/4">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center lg:hidden">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side bg-base-200">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <h1 className='text-xl font-semibold p-6'>My Appointment</h1>
                <ul className="menu p-4 w-80 h-full  text-base-content">
                    
                </ul>

            </div>
        </div>
    );
};

export default SideNav;