'use strict';
const url = 'https://10.114.34.66/app'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// get id from address
const post_id = getQParam('id');

// select existing html elements
const img = document.querySelector('#image img');

// add existing cat data to form
const getPost = async (id) => {
  const fetchOptions = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  const response = await fetch(url + '/post/' + id, fetchOptions);
  const post = await response.json();
  img.src = `${url}/${post.filename}`;

};

getPost(post_id);