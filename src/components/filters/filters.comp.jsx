import { useEffect } from 'react';

// context
import { useData, useModalManager } from '../../context';

// constants
import { brand_filters, gender_filters, price_filters, size_filters } from './filters.constant';

// styles
import './filters.comp.scss';

// hooks
import { useWindowSize } from '../../hooks';

export const NavFilters = ({ setFilterMenu }) => {
    const _window = useWindowSize();
    const { showModal } = useModalManager();
    const [{ filters }, dispatch] = useData();

    if (_window?.width < 1200)
        return (
            <div className='nav_filters'>
                <svg
                    onClick={() => showModal('FILTER_MODAL')}
                    // onClick={() => setFilterMenu((prevState) => !prevState)}
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 16 16'
                    height='26'
                    width='26'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        d='M4 7H3V2h1v5zm-1 7h1v-3H3v3zm5 0h1V8H8v6zm5 0h1v-2h-1v2zm1-12h-1v6h1V2zM9 2H8v2h1V2zM5 8H2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1zm5-3H7c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1zm5 4h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1z'
                    ></path>
                </svg>
            </div>
        );

    return (
        <div className='nav_filters'>
            <h1>Sort By</h1>
            {price_filters?.map((filter) => {
                const is_selected = filters?.price === filter;

                return (
                    <p
                        key={filter}
                        className={`${is_selected ? 'active' : ''}`}
                        onClick={() =>
                            dispatch({
                                type: 'ADD_FILTER',
                                filter_type: 'price',
                                payload: filter,
                            })
                        }
                    >
                        {filter}
                    </p>
                );
            })}
        </div>
    );
};
export const SidebarFilters = ({ setFilterMenu }) => {
    const _window = useWindowSize();
    const [{ filters }, dispatch] = useData();

    useEffect(() => {
        const close_filter = (event) => {
            console.log('evenet => ', event);
            if (event?.key === 'Escape' && _window?.width < 1200) setFilterMenu(false);
        };
        document.addEventListener('keydown', close_filter);

        return () => document.removeEventListener('keypress', close_filter);
    }, []);

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
            {_window?.width < 1200 && (
                <FilterGroup title='Sort by' filter_options={price_filters} type='price' />
            )}
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
                            key={filter}
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
