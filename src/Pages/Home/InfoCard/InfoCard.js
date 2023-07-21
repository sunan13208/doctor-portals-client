import React from 'react';

const InfoCard = ({data}) => {
    const {title,descri,img,bgClass}=data
    return (
        <div className={`card md:card-side ${bgClass} text-white shadow-xl p-6`}>
            <figure>
                <img src={img} alt="Movie"/>
                </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{descri}</p>
            </div>
        </div>
    );
};

export default InfoCard;