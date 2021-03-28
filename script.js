const addBtn = document.querySelector("#add");

const notesArray = JSON.parse(localStorage.getItem("notes"));

if (notesArray) {
  notesArray.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const notes = document.createElement("div");
  notes.classList.add("note");

  notes.innerHTML = `<div class="notes">
  <div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>
</div>`;

  const editBtn = notes.querySelector(".edit");
  //   const notesEl = notes.querySelector(".notes");
  const deleteBtn = notes.querySelector(".delete");

  const main = notes.querySelector(".main");
  const textArea = notes.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    notes.remove();
    updateLocalStorage();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLocalStorage();
  });

  document.body.appendChild(notes);
}

function updateLocalStorage() {
  const notesText = document.querySelectorAll("textarea");

  const notesArray = [];

  notesText.forEach((note) => {
    notesArray.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notesArray));
}
