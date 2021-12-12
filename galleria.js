const createPhotoCards = (photos) => {
    // clear ul
    ul.innerHTML = '';
    photos.forEach((photo) => {
      // create li with DOM methods
      const img = document.createElement('img');
      img.src = url + '/thumbnails/' + photo.filename;
      img.alt = photo.name;
      img.classList.add('resp');
  
      // open large image when clicking image
      img.addEventListener('click', () => {
        modalImage.src = url + '/' + photo.filename;
        imageModal.alt = photo.name;
        imageModal.classList.toggle('hide');
        try {
          const coords = JSON.parse(photo.coords);
          // console.log(coords);
          addMarker(coords);
        } catch (e) {}
      });
  
      const figure = document.createElement('figure').appendChild(img);
  
      const h2 = document.createElement('h2');
      h2.innerHTML = photo.name;
  
      const p1 = document.createElement('p');
      p1.innerHTML = `Käyttäjältä: ${username.kayttaja}`;
  
      const p2 = document.createElement('p');
      p2.innerHTML = `Otsikko: ${photo.otsikko}`;
  
      const p3 = document.createElement('p');
      p3.innerHTML = `Kuvaus: ${photo.kuvaus}`;
  
      const li = document.createElement('li');
      li.classList.add('light-border');
  
      li.appendChild(h2);
      li.appendChild(figure);
      li.appendChild(p1);
      li.appendChild(p1b);
      li.appendChild(p2);
      li.appendChild(p3);
      ul.appendChild(li);

      if (user.role === 0 || user.user_id === photo.owner) {
        // add modify button
        const modButton = document.createElement('button');
        modButton.innerHTML = 'Modify';
        modButton.addEventListener('click', () => {
          const inputs = modForm.querySelectorAll('input');
          inputs[0].value = photo.name;
          inputs[1].value = photo.birthdate;
          inputs[2].value = photo.weight;
          modForm.action = `${url}/photo/${photo.photo_id}`;
          if (user.role === 0) modForm.querySelector('select').value = photo.owner;
        });
        const delButton = document.createElement('button');
        delButton.innerHTML = 'Delete';
        delButton.addEventListener('click', async () => {
          const fetchOptions = {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
          };
          try {
            const response = await fetch(
              url + '/photo/' + photo.photo_id,
              fetchOptions
            );
            const json = await response.json();
            console.log('delete response', json);
            getphoto();
          } catch (e) {
            console.log(e.message());
          }
        });
        li.appendChild(modButton);
        li.appendChild(delButton);
      }
    });
  };