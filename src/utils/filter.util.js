export class ApplyFilters {
    constructor(products, filters) {
        this.filters = filters;
        this.products = products;
    }

    sort_by_price() {
        console.log(
            'sorted products => ',
            this.products?.map((p) => p.discount_price)
        );
        this.products = this.products?.sort((a, b) =>
            this.filters?.price === 'Price - Low to High'
                ? a?.discount_price - b?.discount_price
                : b?.discount_price - a?.discount_price
        );
        return this;
    }

    filter_by_gender() {
        if (!this?.filters?.gender) return this;
        else
            this.products = this.products?.filter(
                (product) => product?.category === this.filters?.gender?.toLowerCase()
            );

        return this;
    }

    filter_by_brand() {
        if (!this?.filters?.brands?.length) return this;
        else
            this.products = this.products?.filter((product) =>
                this.filters?.brands?.includes(product?.brand_name)
            );

        return this;
    }

    filter_by_size() {
        if (!this?.filters?.sizes?.length) return this;
        else
            this.products = this.products?.filter(
                (product) =>
                    product?.available_sizes?.filter((size) => this.filters?.sizes?.includes(size))
                        ?.length > 0
            );

        return this;
    }
}
