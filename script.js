const note = document.querySelector(".notes");
const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem('notes'))//get the notes or text from the localstorage

if(notes){ // if notes exist or true
    notes.forEach(note=>{ // loop through the notes and add it to addNewNote function
        addNewNote(note)
    })
}


addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
            <div class="notes">
                <div class="tools">
                 <button class="edit"><i class="fas fa-edit"></i></button>
             <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
        <div class="main hidden">
    
        </div>
        <textarea></textarea>
        </div>`;
  document.body.appendChild(note);

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text
  main.innerHTML = marked.parse(text)

  const editBtn = note.querySelector(".edit");
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });
  const deleteBtn = note.querySelector(".delete");
  deleteBtn.addEventListener("click", () => {
    note.remove();
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);

    updateLS()
  });
}
//storing the note in localstorage
function updateLS(){
    const notesText = document.querySelectorAll("textarea") //get the textarea
    const notes = []

    notesText.forEach(note => {
        notes.push(note.value) //Loop and store the value or text in the textarea into an array
    })

    localStorage.setItem("notes", JSON.stringify(notes)) //convert notes into json string
}
