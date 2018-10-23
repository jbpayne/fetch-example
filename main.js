function showContent(userNumber, postNumber) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userNumber}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      document.getElementById('content-text').innerHTML = `<span id="post-${postNumber}">${myJson[postNumber].body}</span>`;
      document.getElementById('content-title').innerHTML = `<span id="post-${postNumber}">${postNumber + 1}. ${myJson[postNumber].title}</span>`;
    });
}

function showUsers() {
  let array = [];
  let nameArray = [];
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      for (i = 0; i < myJson.length - 1; i++) {
        if (array.includes(myJson[i].userId) === false) {
          array.push(myJson[i].userId);
        }
      }
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          for (i = 0; i < myJson.length; i++) {
            if (nameArray.includes(myJson[i].name) === false) {
              nameArray.push(myJson[i].name);
            }
          }
          document.getElementById('user-list').innerHTML = '';
          for (j = 0; j < array.length; j++) {
            document.getElementById('user-list').innerHTML += `<div id="user-${j}" class="user-link">${nameArray[j]}</div>`;
          }
          for (k = 0; k < array.length; k++) {
            let position = k + 1;
            document.getElementById('user-' + k).addEventListener('click', function () { showPosts(position); showContent(position, 0) });
          }
        });
    });
}

function showPosts(myUserNumber) {
  let nameArray = [];
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${myUserNumber}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      let array = [];
      for (i = 0; i < myJson.length; i++) {
        if (array.includes(myJson[i].title) === false) {
          array.push(myJson[i].title);
        }
      }
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          for (i = 0; i < myJson.length; i++) {
            if (nameArray.includes(myJson[i].name) === false) {
              nameArray.push(myJson[i].name);
            }
          }
          document.getElementById('title2').innerHTML = `<h1 id="user-${myUserNumber - 1}">${nameArray[myUserNumber - 1]}</h1>`;
          document.getElementById('post-title').innerHTML = `<h2 id="user-${myUserNumber - 1}">${nameArray[myUserNumber - 1]}'s Posts</h2>`;
          document.getElementById('post-list').innerHTML = '';
          for (j = 0; j < array.length; j++) {
            document.getElementById('post-list').innerHTML += `<div id="post-${j}" class="post-link">${j + 1}. ${array[j]}</div>`;
          }

          let theParent = document.querySelector("#post-list");
          theParent.addEventListener("click", doSomething, false);

          function doSomething(e) {
            if (e.target !== e.currentTarget) {
              let clickedItem = e.target.id.slice(5);
              showContent(myUserNumber, +clickedItem);
            }
            e.stopPropagation();
          }
          /*
          for (k = 0; k < array.length; k++) {
            let position = k;
            let post = document.getElementById(`post-${position}`);
            console.log(`document.getElementById(${post}).addEventListener('click', function () { showContent(${myUserNumber}, ${position}); })`);
            console.log(post);
            post.addEventListener('click', function () { showContent(myUserNumber, position); });
          }
          */
        });
    });
}

showUsers();
showContent(1, 0);
showPosts(1);
