import React from 'react';

const Testimonial = ({data}) => {
    const {name,des,img,address}=data
    return (
        <div className="card shadow-xl">
        <div className="card-body">
            
            <p>{des}</p>
        </div>
        <div className='flex gap-5 items-center pl-8 pb-7'>
            <img src={img} className='block' alt="Shoes" />
            <div>
                <h2 className="card-title">{name}</h2>
                <p>{address}</p>
            </div>
        </div>
        </div>
    );
};

export default Testimonial;