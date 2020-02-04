import axios from 'axios';

export const signup = async (name, email, password, passmatch) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passmatch
      }
    });

    if (res.data.status === 'success') {
      alert('you are signed up');
    }
  } catch (err) {
    console.log('error');
  }
};
