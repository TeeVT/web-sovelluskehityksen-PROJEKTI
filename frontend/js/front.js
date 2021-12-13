'use strict';
const url = 'http://localhost:3000/'; // change url when uploading to server

// select existing html elements
const ul = document.querySelector('#list');

// create cat cards
const addGalleria = (posts) => {
  // clear ul
  ul.innerHTML = '';
  posts.forEach((post) => {
    // create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/' + post.filename;
    img.alt = post.name;
    img.classList.add('resp');

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = post.name;

    const p1 = document.createElement('p');
    p1.innerHTML = `title: ${post.title}`;

    const p3 = document.createElement('p');
    p3.innerHTML = `Owner: ${post.ownername}`;

    // delete selected post
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Delete';
    delButton.classList.add('button');
    delButton.addEventListener('click', async () => {
      const fetchOptions = {
        method: 'DELETE',
      };
      try {
        const response = await fetch(url + '/post/' + post.post_id, fetchOptions);
        const json = await response.json();
        console.log('delete response', json);
        getpost();
      } catch (e) {
        console.log(e.message);
      }
    });

    const li = document.createElement('li');
    li.classList.add('light-border');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p3);
    li.appendChild(modButton);
    li.appendChild(delButton);
    ul.appendChild(li);
  });
};

// AJAX call
const getPost = async () => {
  try {
    const response = await fetch(url + '/post');
    const posts = await response.json();
    addGalleria(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPost();