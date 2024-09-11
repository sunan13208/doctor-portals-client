import React from 'react';
import commna from '../../../assets/icons/quote.svg'
import peo1 from '../../../assets/images/people1.png'
import peo3 from '../../../assets/images/people3.png'
import Testimonial from './Testimonial';

const Testimonials = () => {
    const datas = [
        {
            id: 1,
            name: "Winson Herry",
            des: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            address: "California",
            img: peo1
        },
        {
            id: 2,
            name: "Bill gates",
            des: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            address: "New York",
            img: peo3
        },
        {
            id: 3,
            name: "Elon mask",
            des: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            address: "LA",
            img: peo1
        }
    ]
    return (
        <div className='mt-52'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-xl text-secondary font-bold'>Testimonial</p>
                    <h1 className='text-4xl '>What Our Patients Says</h1>
                </div>
                <img src={commna} style={{ width: "192px", height: "156px" }} alt="" />
            </div>
            <div className='grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3 mt-20'>
                {
                    datas.map(data => <Testimonial key={data.id} data={data}></Testimonial>)
                }
            </div>
        </div>
    );
};

export default Testimonials;