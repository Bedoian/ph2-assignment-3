import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>
    constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    // search method
    search(searchAbleFields: string[]) {
        const search = this?.query?.search || '';
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchAbleFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' }
                }) as FilterQuery<T>
                )
            })

        }
        return this
    }
    // sort method
    sort() {
        const sortOrder = this?.query?.sortOrder || 'desc';
        if (sortOrder && sortOrder === 'asc') {
            const sort = this?.query?.sort || 'createdAt';
            this.modelQuery = this.modelQuery.sort(sort as string);
            return this;
        } else if (sortOrder && sortOrder === 'desc') {
            const sort = this?.query?.sort || '-createdAt';
            this.modelQuery = this.modelQuery.sort(sort as string);
            return this;
        }
        return this
    }
    // filter method
    filter() {
        const filterValue = this?.query?.filter as string;
        if (filterValue) {
            this.modelQuery = this.modelQuery.find({ _id: filterValue })
        }
        return this
    }

}

export default QueryBuilder