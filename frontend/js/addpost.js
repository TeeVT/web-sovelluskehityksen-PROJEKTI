'use strict';
//const url = 'http://localhost:3000'; // change url when uploading to server
const url = 'https://10.114.34.66/app';
// select existing html elements
const addForm = document.querySelector('#addPostForm');
const userList = document.querySelector('.add-owner');

// submit add cat form
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/post', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'frontend\galleria.html';
});