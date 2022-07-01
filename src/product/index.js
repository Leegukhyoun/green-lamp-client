import React, {useState, useEffect} from 'react';
import './product.scss'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const [ product, SetProduct ] = useState(null);

    //useParams가 실행되면 파라미터 값을 가지고 있는 객체 반환
    const { id } = useParams();
    useEffect(function(){
        axios.get(`http://localhost:3000/product/${id}`)
        .then(result => {
            const data = result.data;
            SetProduct(data);
        })
        .catch(e=>{
            console.log(e);
        })
    },[])
    if(!product) return <div>로딩중입니다</div>
    return (
        <div>
            <div id='image-box' className='inner'>
                <img src={product.imageUrl} alt='' />
            </div>
            <div id='profile-box' className='inner'>
                <ul>
                    <li>
                        <div>
                            <img src='/images/icons/avatar.png' alt='' />
                            <span>{product.seller}</span>
                        </div>
                    </li>
                    <li>
                        {product.name}
                    </li>
                    <li>
                        {product.price}
                    </li>
                    <li>
                        등록일 2022년 6월 2일
                    </li>
                    <li>
                        상세설명
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductPage;