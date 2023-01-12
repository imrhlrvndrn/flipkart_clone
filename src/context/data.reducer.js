import products from '../shared/products.json';

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
        price: '',
        gender: '',
        size: [],
        brands: [],
    },
};

export const reducers = (state, action) => {
    switch (action?.type) {
        case 'RESET_FILTER': {
            let filter_reset;
            const filters = Object.keys(state?.filters);

            // Checking if the payload is a valid filter or not
            if (filters.includes(action?.payload)) {
                // Checking which of the filters need to be reset
                if (action?.payload === 'price' || action?.payload === 'gender') {
                    filter_reset = { ...state?.filters, [action?.payload]: '' };
                } else if (action?.payload === 'size' || action?.payload === 'brands') {
                    filter_reset = { ...state?.filters, [action?.payload]: [] };
                }
            } else if (action?.payload === 'all') {
                // Reseting all the filters
                filter_reset = { price: '', gender: '', size: [], brands: [] };
            }

            return { ...state, filters: filter_reset };
        }

        default: {
            return state;
        }
    }
};
