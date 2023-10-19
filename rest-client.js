const app = Vue.createApp({
    data() {
        return { bookInModal: { name: null }, books: [] };
    },
    async created() {
        this.books = await (await fetch('http://localhost:8080/books')).json();
    },
    methods: {
        getBook: async function (id) {
            this.bookInModal = await (await fetch(`http://localhost:8080/books/${id}`)).json();
            let bookInfoModal = new bootstrap.Modal(document.getElementById('bookInfoModal'), {});
            bookInfoModal.show();
        }
    }
}).mount('#app');