import products from '../../shared/products.json';

export const initial_state = {
    products:
        JSON.parse(
            JSON.stringify(
                products?.products?.map((product) => {
                    return {
                        ...product,
                        discount_price: Math.ceil(
                            product?.original_price -
                                product?.original_price * (product?.discount_percentage / 100)
                        ),
                    };
                })
            )
        ) || [],
    filters: {
        price: 'Price - Low to High',
        gender: '',
        sizes: [],
        brands: [],
    },
};

export const reducers = (state, action) => {
    console.log(`action(${action?.type}) => `, action?.payload);
    switch (action?.type) {
        case 'SET_PRODUCTS': {
            return { ...state, products: action?.payload };
        }

        case 'RESET_FILTER': {
            // action: { type, payload }
            let filter_reset;
            const filters = Object?.keys(state?.filters);

            // Checking if the payload is a valid filter or not
            if (filters?.includes(action?.payload)) {
                // Checking which of the filters need to be reset
                if (action?.payload === 'price' || action?.payload === 'gender') {
                    filter_reset = { ...state?.filters, [action?.payload]: '' };
                } else if (action?.payload === 'sizes' || action?.payload === 'brands') {
                    filter_reset = { ...state?.filters, [action?.payload]: [] };
                }
            } else if (action?.payload === 'all') {
                // Reseting all the filters
                filter_reset = { price: 'Price - Low to High', gender: '', sizes: [], brands: [] };
            }

            return { ...state, filters: filter_reset };
        }

        case 'ADD_FILTER': {
            // action: { type, filter_type, payload }
            let added_filter;
            const filters = Object?.keys(state?.filters);

            // Checking if the payload is a valid filter or not
            if (filters?.includes(action?.filter_type)) {
                // Checking which of the filters need to be reset
                if (action?.filter_type === 'price' || action?.filter_type === 'gender') {
                    added_filter = { ...state?.filters, [action?.filter_type]: action?.payload };
                } else if (action?.filter_type === 'sizes' || action?.filter_type === 'brands') {
                    added_filter = {
                        ...state?.filters,
                        [action?.filter_type]: [
                            ...state?.filters?.[action?.filter_type],
                            action?.payload,
                        ],
                    };
                }
            }

            return { ...state, filters: added_filter };
        }

        case 'REMOVE_FILTER': {
            // action: { type, filter_type, payload }
            let removed_filter = null;
            const filters = Object?.keys(state?.filters);

            // Checking if the payload is a valid filter or not
            if (filters?.includes(action?.filter_type)) {
                // Checking which of the filters need to be reset
                if (action?.filter_type === 'gender') {
                    removed_filter = { ...state?.filters, [action?.filter_type]: '' };
                } else if (action?.filter_type === 'sizes' || action?.filter_type === 'brands') {
                    removed_filter = {
                        ...state?.filters,
                        [action?.filter_type]: state?.filters?.[action?.filter_type]?.filter(
                            (filter) => filter !== action?.payload
                        ),
                    };
                }
            }

            return { ...state, filters: removed_filter || state?.filters };
        }

        default: {
            return state;
        }
    }
};
