interface PostType {
  userId: number,
  id: number,
  title: string,
  body: string
}

const titlesDiv = document.getElementById('titles');
const modalDiv = document.getElementById('modal');
const exitBtn = document.getElementById('exitBtn');

const modalTitle = document.getElementById('title');
const modalBody = document.getElementById('body');
let users: PostType[];

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => users = json)
  .then(() => updateList())

function updateList() {
  titlesDiv.innerHTML = '';
  users.forEach(user => {
    titlesDiv.innerHTML += `<button id="${user.id}" > ${user.title} </button>`;
  });

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!(button.innerText == 'exit')) {
      button.addEventListener('click', () => {
        fetchToModal(button.id)
      });
    }
  });
}

function fetchToModal(id) {
  fetch('https://jsonplaceholder.typicode.com/posts/' + id)
    .then(response => response.json())
    .then(json => {
      modalBody.innerHTML = json.body;
      modalTitle.innerHTML = json.title;
    })
    .then(() => {
      modalDiv.classList.remove('closed');
      modalDiv.classList.add('open');
    })
}

exitBtn.addEventListener('click', () => {
  modalDiv.classList.remove('open');
  modalDiv.classList.add('closed');
})