class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  
  limitFields() {
    const fieldValue = this.queryString.fields;
    if (fieldValue) {
        // const fields = fieldValue.split(',').join(' ');
        this.mongooseQuery = this.mongooseQuery.select(`${fieldValue} -_id`);
    } else {
        // If no fields specified, select all except __v
        this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      let query = {};
      query = { title: { $regex: this.queryString.keyword, $options: 'i' } }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    // Pagination Result
    const pagination = {};
    pagination.currentPage = page;
    pagination.numberOfPages = Math.ceil(countDocuments / limit); // 90 / 20 = 4.3  => 5
    pagination.limit = limit;

    if (endIndex < countDocuments) {
      pagination.nextPage = page + 1;
    }
    if (skip > 0) {
      pagination.prevPage = page - 1;
    }

    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
