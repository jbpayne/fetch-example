function showContent(userNumber, postNumber, myPostId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userNumber}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      document.getElementById('content-text').innerHTML = `<span id="post-${postNumber}">${myJson[postNumber].body}</span><div id="comments"><h3>Comments</h3></div><div id="comment-list"></div>`;
      document.getElementById('content-title').innerHTML = `<span id="post-${postNumber}">${postNumber + 1}. ${myJson[postNumber].title}</span>`;
      fetch(`https://jsonplaceholder.typicode.com/comments?userId=${userNumber}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          document.getElementById('comment-list').innerHTML = '';
          for (i = 0; i < myJson.length; i++) {
            if (myJson[i].postId === +myPostId) {
                document.getElementById('comment-list').innerHTML += `<div class="comment-email">A comment from <a href=#>${myJson[i].email}</a>:</div><div class="comment-title">${myJson[i].name}</div><div class="comment-body">${myJson[i].body}</div>`;
            }
          }
        });
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
            document.getElementById('user-' + k).addEventListener('click', function () { showPosts(position); showContent(position, 0, 1) });
          }
        });
    });
}

function showPosts(myUserNumber) {
  let postArray = [];
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
      for (k = 0; k < myJson.length; k++) {
        if (myJson[k].userId === myUserNumber) {
          postArray.push(myJson[k].id);
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
            document.getElementById('post-list').innerHTML += `<div id="post-${j}" class="post-link postId-${postArray[j]}">${j + 1}. ${array[j]}</div>`;
          }

          let theParent = document.querySelector("#post-list");
          theParent.addEventListener("click", doSomething, false);

          function doSomething(e) {
            if (e.target !== e.currentTarget) {
              let clickedItem = e.target.id.slice(5);
              let postId = e.target.className.slice(17);
              console.log(postId);
              showContent(myUserNumber, +clickedItem, postId);
            }
            e.stopPropagation();
          }
        });
    });
}

drawPage = () => {
  document.getElementById('drawHere').innerHTML = '';
  document.getElementById('drawHere').innerHTML = '  <div id="title">  <div id="title1"></div>  <div id="title2">    <h1>Title</h1>  </div>  <div id="title3"></div></div><div id="main"><div id="users" class="flex-col">  <div>    <h2>Users</h2>  </div>  <div id="user-list">test</div></div><div id="content" class="flex-col">  <div>    <h2 id="content-title">Content</h2>  </div>  <div id="content-text">test</div></div><div id="posts" class="flex-col">  <div id="post-title">    <h2>Posts</h2>  </div>  <div id="post-list">test</div></div></div><div id="post-0"></div>';
  setTimeout('showUsers()', 0);
  setTimeout('showContent(1, 0, 1)', 0);
  setTimeout('showPosts(1)', 0);
};

drawPage();
