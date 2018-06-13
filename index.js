document.addEventListener('DOMContentLoaded', init)

    const noteList = document.querySelector('#note-list')
    // const buttons = document.querySelectorAll('.button')
    // const buttons = document.querySelectorAll('.button')
    const notePanel = document.querySelector('#note-panel')

    function init() {
        renderNoteList()
        
    }

    function renderNote(id) {
        Adapter.getOne(id).then(note => {
            notePanel.innerHTML = `<form data-id="${note.id}">
                <label id="title">Title:</label>
                <input name="title" type="text" value="${note.title}">
                <br>
                <label id="body">Body:</label>
                <textarea class="submission-field" name="body" type="text-area">${note.body}</textarea>
                <button id="submit-Btn">Submit!</button>
            </form>`
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
        //    console.log(document.querySelectorAll('.button'))
        }) 
        
       )  
    }
 

    noteList.addEventListener('click', (e) => {

        if (e.target.className === "delete") {
            Adapter.deleteNote(e.target.dataset.id)
            e.target.parentElement.remove()
        } else if (e.target.className === "edit"){ 
            renderNote(e.target.dataset.id)
            
        } 
           
    })

    notePanel.addEventListener('submit', (e) => {
        const updatedData = {
            "title": e.target.title.value,
            "body": e.target.body.value
        }
        Adapter.editNote(e.target.dataset.id, updatedData)
        Adapter.renderNoteList()
    })
    

    





