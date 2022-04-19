import Book from "./book.js";

function library() {
  "use strict";

  const list = document.querySelector(".books__list");
  const form = document.querySelector("form");
  const addBtn = document.querySelector(".btn--add");
  const backdrop = document.querySelector(".backdrop");
  initListeners();

  const myLibrary = [];

  function addBookToLibrary(ev) {
    ev.preventDefault();
    const data = formData.call(this);
    myLibrary.push(new Book(data));
    renderList(myLibrary);
    toggleForm();
  }

  function formData() {
    const data = {};
    for (let input of [...this.querySelectorAll("input")]) {
      const { type, name, value, checked = null } = input;
      if (type == "checkbox") data[name] = checked;
      else data[name] = value;
    }
    return data;
  }

  function handleItem(ev) {
    const bookIdx = myLibrary.findIndex((e) => e.id === this.dataset.id);
    if (ev.target.matches(".btn--remove")) myLibrary.splice(bookIdx, 1);
    else if (ev.target.closest("label"))
      myLibrary[bookIdx].isRead = !myLibrary[bookIdx].isRead;
    else return;
    renderList(myLibrary);
  }

  function renderList(books) {
    list.innerHTML = "";
    for (let book of books) {
      const item = book.createItem(book);
      list.appendChild(item);
      item.addEventListener("click", handleItem);
    }
  }

  function toggleForm() {
    const expanded = addBtn.ariaExpanded.match("true");
    addBtn.ariaExpanded = !expanded;
    backdrop.classList.toggle("backdrop--active");
    form.reset();
  }

  function initListeners() {
    form.addEventListener("submit", addBookToLibrary);
    addBtn.addEventListener("click", toggleForm);
    backdrop.addEventListener("click", toggleForm);
  }
}

library();
