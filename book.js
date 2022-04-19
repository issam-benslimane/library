export default class Book {
  constructor(bookData) {
    this.id = randomId();
    Object.entries(bookData).forEach(([key, value]) => (this[key] = value));
  }

  createItem() {
    const li = document.createElement("li");
    this.el = li;
    li.dataset.id = this.id;
    li.innerHTML = `<span class="book">"${this.title}"</span>
    <span class="author">${this.author}</span>
    <span class="pages">${this.pages} pages</span>
    <label for="isRead"
      >Read <input type="checkbox" name="isRead" ${this.isRead && "checked"}
    /></label>
    <button class="btn btn--remove">Remove</button>`;
    return li;
  }
}

function randomId() {
  return Math.random().toString(36).slice(2);
}
