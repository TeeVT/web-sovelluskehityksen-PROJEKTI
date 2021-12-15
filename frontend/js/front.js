'use strict';

const url = 'https://10.114.34.66/app'; // change url when uploading to server

// select existing html elements
const ul = document.querySelector('#list');
const hakulomake = document.querySelector('#searchForm');
// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));


const createPostCards = (posts) => {
  // clear ul
  ul.innerHTML = '';
  posts.forEach((post) => {
    // create li with DOM methods
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + post.filename;
    img.alt = post.name;
    img.classList.add('resp');

    // open image in single.html
    img.addEventListener('click', () => {
      location.href = 'single.html?id=' + post.post_id;
    });

    const p1 = document.createElement('h2');
    p1.innerHTML = `Kuvaus: ${post.title}`;

    const figure = document.createElement('figure').appendChild(img);

    const p2 = document.createElement('p');
    p2.innerHTML = `Omistaja: ${post.ownername}`;

    /*const thumb = document.createElement('button');
    thumb.innerHTML = `<i class="far fa-thumbs-up"></i> ${post.likes}`;*/

    const li = document.createElement('li');
    
    li.appendChild(p1);
    li.appendChild(figure);
    li.appendChild(p2);
    //li.appendChild(thumb);
    ul.appendChild(li);
    if (user.role === 0 || user.user_id === post.owner) {
      // link to modify form
      const modButton = document.createElement('a');
      /*modButton.innerHTML = 'Modify';
      modButton.href = `modify-post.html?id=${post.post_id}`;*/
      modButton.classList.add('button');

      // delete selected post
      const delButton = document.createElement('button');
      delButton.innerHTML = 'Delete';
      delButton.classList.add('button');
      delButton.addEventListener('click', async () => {
        const fetchOptions = {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            
          },
        };
        try {
          const response = await fetch(
            url + '/post/' + post.post_id,
            fetchOptions,
            location.reload()
          );
          const json = await response.json();
          console.log('delete response', json);
          getPost();
        } catch (e) {
          console.log(e.message);
        }
      });

      li.appendChild(modButton);
      li.appendChild(delButton);
    }
  });
};

// AJAX call
const getPost = async (osoite) => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + osoite, fetchOptions);
    const posts = await response.json();
    createPostCards(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPost('/post');

hakulomake.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const hakusana = hakulomake.querySelector('input').value;
  if(!hakusana){
    location.reload();
  }else{
  getPost('/post/haku/'+ hakusana);
  }
}); 
