document.addEventListener('DOMContentLoaded', init)

    const noteListContainer = document.querySelector('#note-list-container')
    const noteList = document.querySelector('#note-list')
    const notePanel = document.querySelector('#note-panel')
    const notePanelHeading = document.querySelector('#note-panel-heading')
    const newNoteBtn = document.querySelector("#new-note-button")
    const noteForm = document.querySelector(".form")
   

    function init() {
        renderNoteList()
        createNewNote()
    }

    function renderNote(id) {
        Adapter.getOne(id).then(note => {
            notePanelHeading.innerText = "Edit Note!"
            noteForm.dataset.noteId = note.id;
            noteForm.innerHTML = `
                <label id="title">Title:</label>
                <input name="title" type="text" value="${note.title}">
                <br>
                <label id="body">Body:</label>
                <textarea class="submission-field" name="body" type="text-area">${note.body}</textarea>
                <button id="submit-Btn">Submit!</button>`
        })
    }

    function renderNoteList() {
       Adapter.getAll().then(notes => 
        notes.forEach(note => {
            noteList.innerHTML += `
            <li class="list-items" data-id="${note.id}">
            <h1>${note.title} </h1>
            <p>${note.body}</p>
            <button class="delete" data-id="${note.id}">Delete!</button>
            <button class="edit" data-id="${note.id}">Edit!</button>
            </li>`
        
        }) 
        
       )  
    }
 

    function createNewNote() {
        notePanelHeading.innerText = "Create New Note!"
        noteForm.dataset.id = ""
        noteForm.innerHTML = `
        <label id="title">Title:</label>
        <input name="title" type="text" value="">
        <br>
        <label id="body">Body:</label>
        <textarea class="submission-field" name="body" type="text-area"></textarea>
        <button id="submit-Btn">Submit!</button>`
    }

    noteListContainer.addEventListener('click', (e) => {
       
        if (e.target.id = "new-note-button") {
            createNewNote()
        }
        if (e.target.className === "delete") {
            Adapter.deleteNote(e.target.dataset.id)
            e.target.parentElement.remove()
        } else if (e.target.className === "edit"){ 
            renderNote(e.target.dataset.id)
        } 
           
    })
    

    notePanel.addEventListener('submit', (e) => {
        // debugger;
        if (e.target.dataset.noteId) {
            const updatedData = {
                "title": e.target.title.value,
                "body": e.target.body.value
            }
            Adapter.editNote(noteForm.dataset.noteId, updatedData)
            Adapter.renderNoteList()
        } 
        else if (!e.target.dataset.noteId) {
            const newData = {
                "title": e.target.title.value,
                "body": e.target.body.value
            }
            Adapter.createNote(newData)
            Adapter.renderNoteList()
        }
    })






