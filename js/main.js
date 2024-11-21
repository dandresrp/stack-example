class Stack {
    constructor() {
        this.items = [];
        this.limit = 5;
    }

    push(item) {
        return this.isFull() ? "El Stack está lleno" : this.items.push(item);
    }

    pop() {
        return this.isEmpty() ? "El Stack está vacío" : this.items.pop();
    }

    top() {
        return this.isEmpty() ? "El Stack está vacío" : this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    isFull() {
        return this.items.length === this.limit;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

const bookStack = new Stack();
const booksContainer = document.querySelector('.books');
const buttons = {
    push: document.getElementById('push-button'),
    pop: document.getElementById('pop-button'),
    top: document.getElementById('top-button'),
    clear: document.getElementById('clear-button'),
};
const modals = {
    addBook: document.getElementById('add-book-modal'),
    details: document.getElementById('book-details-modal'),
};
const bookForm = document.getElementById('book-form');
const bookDetails = document.getElementById('book-details');

function updateStackDisplay() {
    booksContainer.innerHTML = bookStack.items.map((book, index) => `
        <div class="book" style="background-color: ${book.color}" data-index="${index}">
            <div style="text-align: center; font-weight: bold;">${book.title}</div>
        </div>
    `).join('');
}

function showDetails(book) {
    bookDetails.innerHTML = `
        <strong>Título:</strong> ${book.title} <br>
        <strong>Año de publicación:</strong> ${book.year} <br>
        <strong>Descripción:</strong> ${book.description || 'No disponible'} <br>
    `;
    modals.details.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

document.getElementById('close-modal').addEventListener('click', () => {
    bookForm.reset();
    closeModal(modals.addBook);
});

document.getElementById('close-details').addEventListener('click', () => closeModal(modals.details));

buttons.push.addEventListener('click', () => modals.addBook.style.display = 'flex');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newBook = {
        title: bookForm.title.value,
        color: bookForm.color.value,
        year: bookForm.year.value,
        description: bookForm.description.value,
    };

    const result = bookStack.push(newBook);
    if (result === "El Stack está lleno") {
        alert(result);
        return;
    }

    updateStackDisplay();
    bookForm.reset();
    closeModal(modals.addBook);
});

buttons.top.addEventListener('click', () => {
    if (bookStack.isEmpty()) {
        alert("El stack está vacío.");
        return;
    }
    showDetails(bookStack.top());
});

buttons.pop.addEventListener('click', () => {
    const book = bookStack.pop();
    if (book === "El Stack está vacío") {
        alert(book);
        return;
    }
    showDetails(book);
    updateStackDisplay();
});

buttons.clear.addEventListener('click', () => {
    if (bookStack.isEmpty()) {
        alert("El stack está vacío.");
        return;
    }
    bookStack.clear();
    updateStackDisplay();
});
