import axios from 'axios';

export default class Blogs {
  constructor() {}

  async getblogs() {
    try {
      const res = await axios(
        `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
      );
      console.log(res.data);
      this.result = res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
