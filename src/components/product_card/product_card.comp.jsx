import React, { useEffect, useState } from 'react';

// Styles
import './product_card.comp.scss'
// import './Products.scss';

// React components
// import Filters from '../Filters/Filters';

export const ProductCard = ({ product }) => {
    return (
        <div className='product'>
            <img src={product?.image_url} alt={product?.product_name} />
            <div className='content'>
                <span className='brand_name'>{product?.brand_name}</span>
                <p className='name'>{product?.name}</p>
                <div className='pricing'>
                    <div className='discount_price'>₹{product?.discount_price}</div>
                    <div className='original_price'>₹{product?.original_price}</div>
                    <div className='discount_percent'>{product?.discount_percentage}% off</div>
                </div>
            </div>
        </div>
    );
};
