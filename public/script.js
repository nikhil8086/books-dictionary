const API = "http://localhost:5000/books";

async function getBooks() {
    const res = await fetch(API);
    const data = await res.json();

    document.getElementById("output").innerHTML =
        data.map(b => `<p>${b.isbn} - ${b.title}</p>`).join("");
}

async function addBook() {
    const book = {
        isbn: document.getElementById("isbn").value,
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        description: document.getElementById("description").value
    };

    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
    });

    const data = await res.json();
    alert(data.message);
}
