let myLibrary = [];
const container = document.querySelector('.container');
const author = document.querySelector('#author');
const title = document.querySelector('#title');

class Book {
    constructor(
        id = 0,
        title = 'none',
        author = 'none',
        isRead = false,
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }

    addBook(event) {
        event.preventDefault();
        window.localStorage.setItem('myLibrary', JSON.stringify([...myLibrary, new Book(myLibrary.length + 1, title.value, author.value)]));
        // const myLibraryRaw = window.localStorage.getItem('myLibrary');
        // myLibrary = JSON.parse(myLibraryRaw)
        author.value = '';
        title.value = '';
        console.log(myLibrary);
        render()
    }
}

const addBtn = document.querySelector('.add');
addBtn.addEventListener('click', Book.prototype.addBook);

function render() {

    const myLibraryRaw = window.localStorage.getItem('myLibrary')
    if (!myLibraryRaw) {
        window.localStorage.setItem('myLibrary', JSON.stringify([]))
    } else {
        const cards = document.querySelectorAll('.card')
        cards.forEach(x => container.removeChild(x))
        myLibrary = JSON.parse(myLibraryRaw)
        for (let i=0; i<myLibrary.length; i++){
            createBook(myLibrary[i]);
        }
    }

}
render()

function createBook(item) {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('div');
    const cardText = document.createElement('p')
    const removeBtn = document.createElement('button')
    const idInput = document.createElement('input')

    card.classList.add('card', 'mt-3');
    // // card.setAttribute('id', myLibrary.indexOf(item).toString());

    cardHeader.classList.add('card-header');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardText.classList.add('card-text');
    removeBtn.classList.add('remove', 'custom-btn');
    idInput.classList.add('id')

    removeBtn.textContent = 'remove'

    container.append(card)
    card.append(cardHeader)
    card.append(cardBody)
    cardHeader.append(cardTitle)
    cardBody.append(cardText)
    cardBody.append(removeBtn)
    cardBody.append(idInput)

    cardHeader.innerHTML = item.title
    cardTitle.innerHTML = item.author
    cardTitle.innerHTML = item.isRead
    // idInput.value = item.id
    idInput.setAttribute('hidden', "")
    idInput.setAttribute('id', item.id)
    removeBtn.addEventListener('click', (e) => {
        e.preventDefault()
        myLibrary = myLibrary.filter(x => x.id !== item.id)
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        render()
    })
}