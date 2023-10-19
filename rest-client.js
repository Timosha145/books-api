const app = Vue.createApp({
    data() {
        return {
            books: [],
            newBook: { title: '', price: '' },
            editingBook: null,
            isEditing: false
        };
    },
    async created() {
        this.books = await (await fetch('http://localhost:8080/books')).json();
    },
    methods: {
        deleteBook: async function (id) {
            const bookToDelete = this.books.find(book => book.id === id);
            if (!bookToDelete) {
                console.error('Book was not found:', id);
                return;
            }
    
            try {
                await fetch(`http://localhost:8080/books/${id}`, {
                    method: 'DELETE'
                });
                this.books = this.books.filter(book => book.id !== id);
            } catch (error) {
                console.error('Couldnt add a new book:', error);
            }
        },
        addBook: async function () {
            try {
                const response = await fetch('http://localhost:8080/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newBook)
                });

                if (response.ok) {
                    const newBook = await response.json();
                    this.books.push(newBook);
                    this.newBook = { title: '', price: '' };
                }
            } catch (error) {
                console.error('Unable to add a new book:', error);
            }
        },
        editBook(book) {
            this.editingBook = { ...book };
            this.isEditing = true;
        },
        cancelEdit() {
            this.editingBook = null;
            this.isEditing = false;
        },
        async saveEdit(book) {
            try {
                const response = await fetch(`http://localhost:8080/books/${book.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.editingBook)
                });

                if (response.ok) {
                    const updatedBook = await response.json();
                    const index = this.books.findIndex(b => b.id === book.id);
                    if (index !== -1) {
                        this.books[index] = updatedBook;
                    }

                    this.isEditing = false;
                    this.editingBook = null;
                }
            } catch (error) {
                console.error('Unable to save edit:', error);
            }
        }
    }
}).mount('#app');