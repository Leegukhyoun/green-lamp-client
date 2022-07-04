import React from 'react';
import './product.scss'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAsync from '../customHook/useAsync';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../config/contansts';

async function getProducts(id){
    const response = await axios.get(`${API_URL}/product/${id}`);
    return response.data;
}

const ProductPage = () => {
    const navigate = useNavigate();
    //useParams가 실행되면 파라미터 값을 가지고 있는 객체 반환
    const { id } = useParams();
    const [state] = useAsync(()=>getProducts(id),[id]);
    const {loading, data:product, error} = state;

    const productDel = () => {
        axios.delete(`${API_URL}/product/${id}`)
        .then((result)=>{
            console.log("삭제되었습니다.");
            navigate("/");
        })
        .catch(e=>{
            console.log(e)
        })
    }
    if(loading) return <div>로딩중입니다</div>
    if(error) return <div>에러발생했어요</div>
    if(!product) return null;
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
                    <li>
                        {product.description}
                    </li>
                </ul>
            </div>
            <div>
                <span onClick={productDel}>삭제하기</span>
            </div>
        </div>
    );
};

export default ProductPage;