

// Get HTML elements
const titleInput = document.getElementById("title");
const subjectInput = document.getElementById("subject");
const contentInput = document.getElementById("content");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const searchInput = document.getElementById("search");

// Load previously saved notes
let notes = JSON.parse(localStorage.getItem("campusNotes")) || [];

// Save notes in browser storage
function saveNotes() {
    localStorage.setItem("campusNotes", JSON.stringify(notes));
}

// Display notes on the page
function displayNotes(filter = "") {
    notesList.innerHTML = "";

    const filteredNotes = notes.filter(note =>
        (note.title + note.subject + note.content)
        .toLowerCase()
        .includes(filter.toLowerCase())
    );

    if (filteredNotes.length === 0) {
        notesList.textContent = "No notes found.";
        return;
    }

    filteredNotes.forEach(note => {
        const card = document.createElement("div");
        card.className = "note-card";

        const heading = document.createElement("h3");
        heading.textContent = note.title;

        const category = document.createElement("strong");
        category.textContent = note.subject;

        const paragraph = document.createElement("p");
        paragraph.textContent = note.content;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            notes = notes.filter(item => item.id !== note.id);
            saveNotes();
            displayNotes(searchInput.value);
        });

        card.append(heading, category, paragraph, deleteBtn);
        notesList.appendChild(card);
    });
}

// Add a new note
addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const subject = subjectInput.value;
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert("Please enter a title and note content!");
        return;
    }

    const newNote = {
        id: Date.now(),
        title: title,
        subject: subject,
        content: content
    };

    notes.push(newNote);

    saveNotes();
    displayNotes(searchInput.value);

    titleInput.value = "";
    contentInput.value = "";

    alert("Note added successfully!");
});

// Search notes
searchInput.addEventListener("input", () => {
    displayNotes(searchInput.value);
});

// Display saved notes when application opens
displayNotes();
