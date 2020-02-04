import axios from 'axios';

export default class Users {
  constructor() {}

  async getusers() {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/v1/users/allusers'
      });
      this.result = res.data;
    } catch (err) {
      console.log('error');
    }
  }
}
