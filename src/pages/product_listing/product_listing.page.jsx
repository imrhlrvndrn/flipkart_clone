import React, { useEffect, useState } from 'react';

// context
import { useData } from '../../context';

// styles
import './product_listing.page.scss';

// components
import { NavFilters, ProductCard, SidebarFilters } from '../../components';

// utilities
import { ApplyFilters } from '../../utils/filter.util';

// hooks
import { useWindowSize } from '../../hooks';

// layouts
import { Modal } from '../../layouts';

export const ProductListingPage = () => {
    const _window = useWindowSize();
    const [show_filter_menu, setFilterMenu] = useState(false);
    const [{ products, filters }, dispatch] = useData();
    const [final_products, setFinalProducts] = useState([]);

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
    }, [filters]);

    return (
        <div className='product_listing'>
            {_window?.width > 1200 && <SidebarFilters />}
            <NavFilters setFilterMenu={setFilterMenu} />
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
