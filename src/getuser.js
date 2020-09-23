import axios from 'axios';

export default class User {
  constructor() {}

  async getuser() {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/v1/users/viewuser'
      });
      this.result = res.data;
    } catch (err) {
      console.log('error');
    }
  }
}
