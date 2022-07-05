import React,{useState} from 'react';
import './Index.scss'
import axios from 'axios';
import Card from './component/Card.js';
import useAsync from '../customHook/useAsync';
import {API_URL} from '../config/contansts';
import { Carousel } from 'antd';


async function getProducts(){
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
}

const contentStyle = {
    height: '250px',
    color: '#000',
    lineHeight: '160px',
    textAlign: 'center',
    position : 'absolute',
    bottom : '50px'
  };

const MainPage = () => {
    const [state, refetch] = useAsync(getProducts,[]);
    const { loading, data, error } = state;
    if(loading) return <div>로딩중.....</div>
    if(error) return <div>에러가 발생해습니다</div>
    if(!data) return <div>로딩중입니다.</div>
    return (
        <div>
            <div id='main'>
                <div id='banner'>
                    <Carousel autoplay>
                        <div>
                            <img src='images/banners/main_banner1.jpg'/>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <img src='images/banners/main_banner2.jpg'/>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <img src='images/banners/main_banner3.jpg'/>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                    </Carousel>
                </div>
                <div id='product-list' className='inner'>
                    <h2>그린조명 최신상품</h2>
                    <div id='product-items'>
                        {data.map(product=>(
                            <Card key={product.id} product={product}/>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default MainPage;