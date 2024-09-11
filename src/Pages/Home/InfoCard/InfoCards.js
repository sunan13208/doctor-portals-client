import React from 'react';
import clock from '../../../assets/icons/clock.svg'
import phone from '../../../assets/icons/phone.svg'
import marker from '../../../assets/icons/marker.svg'
import InfoCard from './InfoCard';

const InfoCards = () => {
    const datas = [
        {
            id: 1,
            title: "Opening Hours",
            descri: "Open 9.00AM to 5.00PM everyday",
            img: clock,
            bgClass: "bg-gradient-to-r from-primary to-secondary"
        },
        {
            id: 2,
            title: "Visit Our Location",
            descri: "191/A, Monnafer Mor, Rajshahi",
            img: marker,
            bgClass: "bg-accent"
        },
        {
            id: 3,
            title: "Contact us now",
            descri: "+8801533692833",
            img: phone,
            bgClass: "bg-gradient-to-r from-primary to-secondary"
        },
    ]
    return (
        <div className='grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                datas.map(data => <InfoCard key={data.id} data={data}></InfoCard>)
            }
        </div>
    );
};

export default InfoCards;