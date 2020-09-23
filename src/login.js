import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signin',
      data: {
        email,
        password
      }
    });
    if (res.data.status === 'success') {
      var socket = io();
      socket.emit('join', { mail: email });
      alert('you are logged in');
    }
  } catch (err) {
    console.log('error');
  }
};
