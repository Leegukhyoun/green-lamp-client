import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({product}) => {
    
    return (
        <div className='product-card'>
            <Link to={`/product/${product.id}`}>
            <div className='product-img'>
                <img src={product.imageUrl} alt=''/>
            </div>
            <div className='product-contents'>
                <span className='product-name'>{product.name}</span>
                <span className='product-price'>{product.price}원</span>
                <div className='product-seller'>
                    <img src='images/icons/avatar.png' alt=''/>{product.seller}                                
                </div>
            </div>
            </Link>
        </div>
    );
};

export default Card;