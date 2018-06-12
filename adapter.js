const Adapter = {
    
    getOne: function getOne(id) {
        let baseUrl = `http://localhost:3000/api/v1/notes/${id}`
        return fetch(baseUrl).then(resp => resp.json())

    },

    getAll: function getAll() {
        let baseUrl = `http://localhost:3000/api/v1/notes/`
       return fetch(baseUrl).then(resp => resp.json())
    },

    createNote: function createNote(data) {
        let baseUrl = `http://localhost:3000/api/v1/notes/`
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

       return fetch(baseUrl, options).then(resp => resp.json())

    },

    editNote: function editNote(id, data) {
        let baseUrl = `http://localhost:3000/api/v1/notes/${id}`

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        return fetch(baseUrl, options).then(resp => resp.json())
    },

    deleteNote: function deleteNote(id) {
        let baseUrl = `http://localhost:3000/api/v1/notes/${id}`

       const options = {
           method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }

            return fetch(baseUrl, options).then(resp => resp.json())
    }
    

}