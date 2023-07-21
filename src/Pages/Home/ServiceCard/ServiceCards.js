import React from 'react';
import fluoride from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/whitening.png'
import ServiceCard from './ServiceCard';

const ServiceCards = () => {
    const datas=[
        {
            id:1,
            name:"Fluoride Treatment",
            descr:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, sunt! Voluptates delectus reprehenderit rem fugiat.",
            img:fluoride
        },
        {
            id:2,
            name:"Cavity Filling",
            descr:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, sunt! Voluptates delectus reprehenderit rem fugiat.",
            img:cavity
        },
        {
            id:3,
            name:"Teeth Whitening",
            descr:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, sunt! Voluptates delectus reprehenderit rem fugiat.",
            img:whitening
        },
    ]
    return (
        <div className='mt-20'>  
          <h1 className='text-center text-xl font-bold text-primary' >Our Services</h1>
          <p  className='text-center text-4xl font-normal'>Service we provide</p> 
          <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                datas.map(data=><ServiceCard key={data.id} data={data}></ServiceCard>)
            } 
          </div>
        </div>

    );
};

export default ServiceCards;