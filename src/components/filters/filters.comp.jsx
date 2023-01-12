// constants
import { brand_filters, gender_filters, size_filters } from './filters.constant';

// styles
import './filters.comp.scss';

export const NavFilters = () => {
    return (
        <div className='nav_filters'>
            <h1>Sort By</h1>
            <p className={`active`}>Price - Low to High</p>
            <p>Price - High to Low</p>
        </div>
    );
};
export const SidebarFilters = () => {
    return (
        <div className='sidebar_filters'>
            <div className='filter_heading'>
                <h1>Filters</h1>
                <button className='secondary'>Reset all</button>
            </div>
            <div className='filter_group'>
                <div className='filter_heading'>
                    <h1>Ideal for</h1>
                    <button className='secondary'>Reset</button>
                </div>
                <div className='filter_options'>
                    {gender_filters?.map((gender) => (
                        <div className='filter_option selected'>{gender}</div>
                    ))}
                </div>
            </div>
            <div className='filter_group'>
                <div className='filter_heading'>
                    <h1>Size</h1>
                    <button className='secondary'>Reset</button>
                </div>
                <div className='filter_options'>
                    {size_filters?.map((size) => (
                        <div className='filter_option'>{size}</div>
                    ))}
                </div>
            </div>
            <div className='filter_group'>
                <div className='filter_heading'>
                    <h1>Brands</h1>
                    <button className='secondary'>Reset</button>
                </div>
                <div className='filter_options'>
                    {brand_filters?.map((brand) => (
                        <div className='filter_option selected'>{brand}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};
