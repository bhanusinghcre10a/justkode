class Apifeature {
  constructor(query, querystring) {
    this.query = query;
    this.querystring = querystring;
  }
  filter() {
    const queryobj = { ...this.querystring };
    const excludefield = ['page', 'sort', 'limit', 'fields'];
    excludefield.forEach(obj => {
      delete queryobj[obj];
    });

    let queryString = JSON.stringify(queryobj);
    queryString = queryString.replace(
      /\b(gte|lte|gt|lt)\b/g,
      match => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.querystring.sort) {
      const sortby = this.querystring.sort.split(',').join(' ');
      this.query = this.query.sort(sortby);
    } else {
      const sortby = '-createdAt';
      this.query = this.query.sort(sortby);
    }
    return this;
  }

  fields() {
    if (this.querystring.fields) {
      const fields = this.querystring.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    const page = this.querystring.page * 1 || 1;
    const limit = this.querystring.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = Apifeature;
