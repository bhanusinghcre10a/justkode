import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signin',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      console.log('success');
    }
  } catch (err) {
    console.log('error');
  }
};
