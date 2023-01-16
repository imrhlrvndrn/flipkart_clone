import React, { useEffect, useState } from 'react';

// context
import { useData } from '../../context';

// styles
import './product_listing.page.scss';

// components
import { Nav, NavFilters, ProductCard, SidebarFilters } from '../../components';

// utilities
import { ApplyFilters } from '../../utils/filter.util';

// hooks
import { useWindowSize } from '../../hooks';

// layouts
import { Modal } from '../../layouts';

export const ProductListingPage = () => {
    const _window = useWindowSize();
    const [{ products, filters, search_query }, dispatch] = useData();
    const [final_products, setFinalProducts] = useState([]);

    useEffect(() => {
        const apply_filters = new ApplyFilters(products, filters, search_query);
        setFinalProducts(
            (prevState) =>
                apply_filters
                    ?.search_products()
                    ?.sort_by_price()
                    ?.filter_by_gender()
                    ?.filter_by_brand()
                    ?.filter_by_size()?.products
        );
    }, [filters, search_query]);

    return (
        <div className='product_listing'>
            <Nav />
            {_window?.width > 1200 && <SidebarFilters />}
            <NavFilters />
            <div className='product_wrapper'>
                {final_products?.length <= 0 ? (
                    <h1>No products match current filters</h1>
                ) : (
                    final_products?.map((product) => (
                        <ProductCard key={product?.name} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};
