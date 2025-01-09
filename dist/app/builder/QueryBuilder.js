"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // search method
    search(searchAbleFields) {
        var _a;
        const search = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search) || '';
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchAbleFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' }
                }))
            });
        }
        return this;
    }
    // sort method
    sort() {
        var _a, _b, _c;
        const sortOrder = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortOrder) || 'desc';
        if (sortOrder && sortOrder === 'asc') {
            const sort = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sort) || 'createdAt';
            this.modelQuery = this.modelQuery.sort(sort);
            return this;
        }
        else if (sortOrder && sortOrder === 'desc') {
            const sort = ((_c = this === null || this === void 0 ? void 0 : this.query) === null || _c === void 0 ? void 0 : _c.sort) || '-createdAt';
            this.modelQuery = this.modelQuery.sort(sort);
            return this;
        }
        return this;
    }
    // filter method
    filter() {
        var _a;
        const filterValue = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.filter;
        if (filterValue) {
            this.modelQuery = this.modelQuery.find({ _id: filterValue });
        }
        return this;
    }
}
exports.default = QueryBuilder;
