export class ApplyFilters {
    constructor(products, filters, query) {
        this.filters = filters;
        this.products = products;
        this.query = query || '';
    }

    search_products() {
        if (!this.query) return this;
        else
            this.products = [
                ...this?.products?.filter(
                    (product) =>
                        product?.name?.toLowerCase()?.includes(this?.query?.toLowerCase()) ||
                        product?.brand_name?.toLowerCase()?.includes(this?.query?.toLowerCase())
                ),
            ];

        return this;
    }

    sort_by_price() {
        if (!this?.filters?.price) return this;
        else {
            this.products = [
                ...this?.products?.sort((a, b) => {
                    if (this?.filters?.price === 'Price - Low to High')
                        return a?.discount_price - b?.discount_price;
                    else if (this?.filters?.price === 'Price - High to Low')
                        return b?.discount_price - a?.discount_price;
                }),
            ];
        }
        return this;
    }

    filter_by_gender() {
        if (!this?.filters?.gender) return this;
        else
            this.products = this?.products?.filter(
                (product) => product?.category === this?.filters?.gender?.toLowerCase()
            );

        return this;
    }

    filter_by_brand() {
        if (!this?.filters?.brands?.length) return this;
        else
            this.products = this?.products?.filter((product) =>
                this?.filters?.brands?.includes(product?.brand_name)
            );

        return this;
    }

    filter_by_size() {
        if (!this?.filters?.sizes?.length) return this;
        else
            this.products = this?.products?.filter(
                (product) =>
                    product?.available_sizes?.filter((size) => this?.filters?.sizes?.includes(size))
                        ?.length > 0
            );

        return this;
    }
}
