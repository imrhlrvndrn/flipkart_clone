// import data from '../../shared/products.json';
import React, { useEffect, useState } from 'react';
import { useData } from '../../context/data.context';

// Styles
import './product_listing.page.scss';

// components
import { NavFilters, ProductCard, SidebarFilters } from '../../components';
import { ApplyFilters } from '../../utils/filter.util';

export const ProductListingPage = () => {
    const [{ products, filters }, dispatch] = useData();
    const [final_products, setFinalProducts] = useState([]);
    // const sort_products_by_price = (products) =>
    //     products?.sort((a, b) =>
    //         filters?.price === 'Price - Low to High'
    //             ? a?.discount_price - b?.discount_price
    //             : b?.discount_price - a?.discount_price
    //     );
    // const filter_by_gender = (products) =>
    //     products?.filter((product) => product?.category === filters?.gender?.toLowerCase());
    // const filter_by_brand = (products) =>
    //     products?.filter((product) => filters?.brands?.includes(product?.brand_name));

    useEffect(() => {
        const apply_filters = new ApplyFilters(products, filters);
        setFinalProducts(
            (prevState) =>
                apply_filters
                    ?.sort_by_price()
                    ?.filter_by_gender()
                    ?.filter_by_brand()
                    ?.filter_by_size()?.products
        );
    }, [final_products, filters]);

    return (
        <div className='product_listing'>
            <SidebarFilters />
            <NavFilters />
            <div className='product_wrapper'>
                {final_products?.map((product) => (
                    <ProductCard key={product?.name} product={product} />
                ))}
            </div>
        </div>
    );
};
