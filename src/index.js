import { login } from './login';
import { signup } from './signup';
import axios from 'axios';
import * as blogview from './blogview';

import Blogs from './blog';

const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');
const blogss = document.querySelector('.head1');

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordmatch = document.getElementById('passwordmatch').value;
    signup(name, email, password, passwordmatch);
  });
}

const blogloderr = async obj => {
  await obj.getblogs();
  obj.result.forEach(async el => {
    try {
      const res = await axios(
        `https://hacker-news.firebaseio.com/v0/item/21258127.json?print=pretty`
      );

      blogview.renderResults(res);
    } catch (error) {
      console.log(error);
    }
  });
};
const blogloder = async obj => {
  await obj.getblogs();

  try {
    const res1 = await axios(
      `https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/item/21258127.json?print=pretty`
    );
    const res2 = await axios(
      `https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/item/21260214.json?print=pretty`
    );
    const res3 = await axios(
      `https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/item/21260364.json?print=pretty`
    );
    console.log(res1);
    console.log(res2);
    console.log(res3);

    blogview.renderResults(res1, res2, res3);
  } catch (error) {
    console.log(error);
  }
};

if (blogss) {
  const blg = new Blogs();
  blogloder(blg);
}
