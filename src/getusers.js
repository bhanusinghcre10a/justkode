import axios from 'axios';

export default class Users {
  constructor() {}

  async getusers() {
    try {
      const res = await axios({
        method: 'GET',
        url:
          'https://cors-anywhere.herokuapp.com/http://localhost:3000/api/v1/users/allusers'
      });
      this.result = res.data;
    } catch (err) {
      console.log('error');
    }
  }
}
