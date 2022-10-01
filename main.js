const container = document.querySelector('.container');
const form = document.querySelector('.appear');
const btn = document.querySelector('.btn');
const submit = document.querySelector('.sub');
const hideBtn = document.querySelector('.hide');
let title = document.getElementById('title');
let author = document.getElementById('author');
let category = document.getElementById('category');
let pages = document.getElementById('pages');
let read = document.getElementById('read');
let cards = document.createElement('div');
let para = document.createElement('p');
// let editBtn = document.createElement('button');
let removeBtn = document.createElement('button');

let myLibrary = [];

function Book(title, author, category, pages, read) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.category}, ${this.pages} pages, ${this.read}`
}

Book.prototype.toggle = function() {
    this.read = !this.read;
}

function addBookToLibrary() {
    // take user's input and store new book object to an array

    let bookTitle = title.value;
    let bookAuthor = author.value;
    let bookCategory = category.value;
    let bookPages = pages.value;
    let bookRead = read.value;
    let newBook = new Book(bookTitle, bookAuthor, bookCategory, bookPages, bookRead);
    if(newBook.title !== '' && newBook.author !== '' && newBook.category !== '') {
        return myLibrary.push(newBook.info());
    }
};

 function displayBooks(){
    container.textContent = '';

    myLibrary.forEach((item, index) => {

        //add ui

        cards = document.createElement('div');
        para = document.createElement('p');
        // editBtn = document.createElement('button');
        removeBtn = document.createElement('button');
        removeBtn.setAttribute('data-remove', index);
        // editBtn.textContent = 'Edit';
        removeBtn.textContent = 'Remove';
        cards.classList.add('cards');
        // editBtn.classList.add('edit')
        removeBtn.classList.add('btn-remove');
        cards.appendChild(para);
        // cards.appendChild(editBtn);
        cards.appendChild(removeBtn);
        container.appendChild(cards);
        return para.textContent = item;
})
}

container.addEventListener('click', e => {
    // e.stopPropagation();
    // e.preventDefault();

    let action = e.target.dataset.remove;
    if (action) {
        myLibrary.forEach((item, index, arr) => {
            if (action == index) {
                arr.splice(index, 1);
                [...container.childNodes].forEach((item, index) => {
                    if (action == index) {
                        item.remove();
                    }
                })
            }
        })
      }
    let updateAttribute = document.querySelectorAll('.btn-remove');
    updateAttribute.forEach((item, index, arr) => item.setAttribute('data-remove', index))
})


btn.addEventListener('click', () => {
    form.classList.remove('disappear');
})

hideBtn.addEventListener('click', () => {
    form.classList.add('disappear');
})

submit.addEventListener('click', addBookToLibrary, setTimeout(3000));

submit.addEventListener('click', displayBooks, setTimeout(3000));

submit.addEventListener('click', function clearInput() {
    title.value = '';
    author.value = '';
    category.value = '';
    pages.value = '';
})
