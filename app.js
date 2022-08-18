var titlesDiv = document.getElementById('titles');
var modalDiv = document.getElementById('modal');
var exitBtn = document.getElementById('exitBtn');
var modalTitle = document.getElementById('title');
var modalBody = document.getElementById('body');
var users;
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) { return response.json(); })
    //.then(json => titlesDiv.innerHTML = JSON.stringify(json))
    .then(function (json) { return users = json; })
    //.then(() => console.log(users))
    .then(function () { return updateList(); });
function updateList() {
    //console.log(users);
    titlesDiv.innerHTML = '';
    users.forEach(function (user) {
        //console.log(user.body);
        titlesDiv.innerHTML += "<button id=\"".concat(user.id, "\" > ").concat(user.title, " </button>");
    });
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function (button) {
        if (!(button.innerText == 'exit')) {
            button.addEventListener('click', function () {
                //console.log(button.id)
                fetchToModal(button.id);
            });
        }
    });
}
function fetchToModal(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id)
        .then(function (response) { return response.json(); })
        //.then(json => console.log(json.body))
        .then(function (json) {
        modalBody.innerHTML = json.body;
        modalTitle.innerHTML = json.title;
    })
        .then(function () {
        modalDiv.classList.remove('closed');
        modalDiv.classList.add('open');
    });
    //.then(() => console.log('heh'))
}
exitBtn.addEventListener('click', function () {
    modalDiv.classList.remove('open');
    modalDiv.classList.add('closed');
    //console.log('wha')
});
