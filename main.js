const myLibrary = [];
const libraryContainer = document.querySelector('.library');

function Book(title, author, pages) {
  if (!new.target) {
    throw Error('You must use the "new" operator to call the constructor.');
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages) {
  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
  displayBooks();
}

function createBookElement(el, content) {
  const element = document.createElement(el);
  element.textContent = content;
  return element;
}

function createBookCard() {
  libraryContainer.textContent = ''; //reset library to avoid duplicates

  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.setAttribute('class', 'card');

    bookCard.appendChild(createBookElement('h3', `Title: ${book.title}`));
    bookCard.appendChild(createBookElement('h4', `Author: ${book.author}`));
    bookCard.appendChild(createBookElement('h4', `Pages: ${book.pages}`));

    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button-container');

    buttonContainer
      .appendChild(createBookElement('button', book.read ? 'Read' : 'Unread'))
      .setAttribute(
        'class',
        book.read ? 'read-btn toggle-read-btn' : 'toggle-read-btn'
      );
    buttonContainer
      .appendChild(createBookElement('button', 'Delete'))
      .setAttribute('class', 'delete-btn');

    bookCard.appendChild(buttonContainer);
    libraryContainer.appendChild(bookCard);

    // Mark as Read or Unread
    bookCard
      .querySelector('.toggle-read-btn')
      .addEventListener('click', (e) => {
        book.toggleReadStatus();
        e.target.textContent = book.read ? 'Read' : 'Unread';
        e.target.classList.toggle('read-btn'); // add this class to style 'read' button
      });

    // Delete book
    bookCard.querySelector('.delete-btn').addEventListener('click', () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      myLibrary.splice(index, 1);
      displayBooks(); // refresh display
    });
  });
}

const dialog = document.querySelector('dialog');
const addBookBtn = document.querySelector('.add-book-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const submitBookBtn = document.querySelector('.submit-btn');

addBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
});

submitBookBtn.addEventListener('click', (e) => {
  e.preventDefault();

  let title = document.querySelector('#book-title').value;
  let author = document.querySelector('#book-author').value;
  let pages = document.querySelector('#book-pages').value;

  addBookToLibrary(title, author, pages);
  dialog.close();
  document.querySelector('#add-book-form').reset(); // clear form inputs
});

function displayBooks() {
  if (myLibrary.length === 0) {
    libraryContainer.textContent = ''; // need this for when you delete all books
    libraryContainer.appendChild(
      createBookElement('h2', 'Your library is empty! Click "Add Book"')
    );
  } else {
    createBookCard();
  }
}

displayBooks();
