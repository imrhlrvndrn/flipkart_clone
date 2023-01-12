import { useData } from '../../context/data.context';

// constants
import { brand_filters, gender_filters, price_filters, size_filters } from './filters.constant';

// styles
import './filters.comp.scss';

export const NavFilters = () => {
    const [{ filters }, dispatch] = useData();

    return (
        <div className='nav_filters'>
            <h1>Sort By</h1>
            {price_filters?.map((filter) => {
                const is_selected = filters?.price === filter;
                return (
                    <p
                        className={`${is_selected ? 'active' : ''}`}
                        onClick={() =>
                            dispatch({ type: 'ADD_FILTER', filter_type: 'price', payload: filter })
                        }
                    >
                        {filter}
                    </p>
                );
            })}
        </div>
    );
};
export const SidebarFilters = () => {
    const [{ filters }, dispatch] = useData();

    return (
        <div className='sidebar_filters'>
            <div className='filter_heading'>
                <h1>Filters</h1>
                <button
                    className='secondary'
                    onClick={() => dispatch({ type: 'RESET_FILTER', payload: 'all' })}
                >
                    Reset all
                </button>
            </div>
            <FilterGroup title='Ideal for' filter_options={gender_filters} type='gender' />
            <FilterGroup title='Size' filter_options={size_filters} type='sizes' />
            <FilterGroup title='Brands' filter_options={brand_filters} type='brands' />
        </div>
    );
};

export const FilterGroup = ({ title, filter_options, type }) => {
    const [{ filters }, dispatch] = useData();

    return (
        <div className='filter_group'>
            <div className='filter_heading'>
                <h1>{title}</h1>
                <button
                    className='secondary'
                    onClick={() => dispatch({ type: 'RESET_FILTER', payload: type })}
                >
                    Reset
                </button>
            </div>
            <div className='filter_options'>
                {filter_options?.map((filter) => {
                    const is_selected =
                        filters?.[type] === filter || filters?.[type]?.includes(filter);
                    const dispatch_action = () =>
                        is_selected
                            ? dispatch({
                                  type: 'REMOVE_FILTER',
                                  filter_type: type,
                                  payload: filter,
                              })
                            : dispatch({
                                  type: 'ADD_FILTER',
                                  filter_type: type,
                                  payload: filter,
                              });

                    return (
                        <div
                            className={`filter_option ${is_selected ? 'selected' : ''}`}
                            onClick={dispatch_action}
                        >
                            {filter}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
