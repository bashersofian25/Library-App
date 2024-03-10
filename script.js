let myBooks = [];
const dialog = document.querySelector(".dialog");
const addButton = document.querySelector(".add");
const confirmButton = document.querySelector("#confirm");
const cancelButton = document.getElementById("cancel");
const books =  document.querySelector(".books");

const form = {
    title: document.getElementById("title"),
    author: document.getElementById("author"),
    pages: document.getElementById("pages"),
    isRead: document.getElementById("is-read"),
    id: document.getElementById('Id')
}

addButton.addEventListener('click', () => {dialog.showModal();});

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

function isIDUnique(ID){
    for(let i = 0; i<myBooks.length; i++){
        if(myBooks[i].id == ID){
            return false;
        }
    }
    return true;
}
confirmButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    const totalPages = form.pages.value;
    const isRead = form.isRead.checked;
    const ID = form.id.value;
    console.log(ID);
    const uniqueID = isIDUnique(ID);
    console.log(uniqueID)
    if(title && author && totalPages && uniqueID){
        addBookToLibrary(title, author, totalPages, isRead, ID);
        appendCards();
    }else {
        alert("Invalid Book Data");
    }
    

});

function createCardDetails(book){
    const details = document.createElement('ul');
    const title = document.createElement('li');
    title.append(`title: ${book.title}`);
    const pages = document.createElement('li');
    pages.append(`pages: ${book.totalPages}`);
    const author = document.createElement('li');
    author.append(`author: ${book.author}`);
    const id = document.createElement('li');
    id.append(`id: ${book.id}`);

    details.append(title);
    details.append(pages);
    details.append(author);
    details.append(id);

    return details;
}

function createCardButtons(book){
    const buttonContainer =  document.createElement('div');
    buttonContainer.classList.add('button-container');
    const isReadButton = document.createElement('button');
    
    isReadButton.setAttribute('class', `read ${book.id}`);
    isReadButton.addEventListener('click', (e) => {
        e.target.classList.toggle('done');
    });
    if(book.isRead){
        isReadButton.classList.add('done');
        isReadButton.append("Read");
    }else {
        isReadButton.append("NOT Read");
    }
    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', e => {
        const removedCard = e.target.parentNode.parentNode;
        const cardId = removedCard.id;
        removedCard.remove();
        myBooks = myBooks.filter((book) => cardId != book.id);
        console.log(myBooks.length);
        console.log(myBooks);

        
    });
    removeButton.setAttribute('class', `remove ${book.id}`);
    removeButton.append("Remove");

    buttonContainer.append(isReadButton);
    buttonContainer.append(removeButton);

    return buttonContainer;
}
function createCard(book){
    const card = document.createElement('div');
    card.classList.add('card');
    const details = createCardDetails(book);
    const buttonContainer = createCardButtons(book);

    card.append(details);
    card.append(buttonContainer);

    card.setAttribute('id', `${book.id}`);
    return card;
}

function emptyShelf(){
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.remove();
    });
}

function appendCards(){
    emptyShelf();
    myBooks.forEach(book => {
        console.log(book);
        const card = createCard(book);
        books.append(card);
    });
}

function Book(title, author, totalPages, isRead, id){
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.isRead = isRead;
    this.id = id;
}

function addBookToLibrary(title, author, totalPages, isRead, id){
    const book = new Book(title, author, totalPages, isRead, id);
    myBooks.push(book);
    dialog.close();
    console.log(myBooks);
}