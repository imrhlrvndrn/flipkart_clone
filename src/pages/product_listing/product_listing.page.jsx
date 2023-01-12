// import data from '../../shared/products.json';
import React, { useEffect, useState } from 'react';
import { useData } from '../../context/data.context';

// Styles
import './product_listing.page.scss';

// components
import { NavFilters, ProductCard, SidebarFilters } from '../../components';

export const ProductListingPage = () => {
    const [{ products }, dispatch] = useData();
    // const [products, setProducts] = useState([]);
    // const [filteredproducts, setFilteredProducts] = useState([]);

    // const getData = () => {
    //     JSON.parse(JSON.stringify(data));
    //     setProducts(
    //         data?.products?.map((product) => {
    //             return {
    //                 ...product,
    //                 discount_price: Math.floor(
    //                     product?.original_price -
    //                         product?.original_price * (product?.discount_percentage / 100)
    //                 ),
    //             };
    //         })
    //     );
    // };

    // useEffect(() => {
    //     getData();
    // }, []);

    // useEffect(() => {
    //     console.log('filetered Products');
    // }, [filteredproducts]);

    return (
        <div className='product_listing'>
            <SidebarFilters />
            {/* <Filters products={products} setFilteredProducts={setFilteredProducts} /> */}
            <NavFilters />
            <div className='product_wrapper'>
                {products?.map((product) => (
                    <ProductCard key={product?.name} product={product} />
                ))}
            </div>
        </div>
    );
};
