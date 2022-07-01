import React,{useEffect, useState} from 'react';
import './Index.scss'
import axios from 'axios';
import Card from './component/Card.js';


const MainPage = (props) => {
    const [ products, SetProducts ] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/products")
        .then(result=>{
        const products = result.data;
        SetProducts(products);
        console.log(products);
    }).catch((e)=>{
        console.log(e);
    });
    },[])
    if(products===[]) return <div>로딩중입니다.</div>
    return (
        <div>
            <div id='main'>
                <div id='banner'>
                    <img src='images/banners/main_banner1.jpg' alt=''/>
                </div>
                <div id='product-list' className='inner'>
                    <h2>그린조명 최신상품</h2>
                    <div id='product-items'>
                        {products.map(product=>(
                            <Card key={product.id} product={product}/>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default MainPage;