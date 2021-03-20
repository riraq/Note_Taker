const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const db = require('./db/db')
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// when the GET METHOD is used on PORT/notes, the notes.html is sent
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// when the GET METHOD is used on PORT/api/notes, the JSON information is accessed
app.get('/api/notes', (req, res) => {
    res.json(db);
})

// uses the DELETE METHOD based on the unique ID given to each note
app.delete('/api/notes/:id', (req, res) => {
    // sets a variable equal to the id parameter in the notes object
    const uniqueID = req.params.id;
    // for loop used to match the notes id with id in the database
    for (let i=0; i<db.length; i++){
        if (uniqueID === db[i].id) {
            // removes the matching object based on id
            db.splice(i, 1);
        }
    };
    // returns the database with the object removed
    res.json(db);
})

// uses POST METHOD to add notes to the db
app.post('/api/notes', (req, res) =>{
    // generates a unique id for each note
    req.body.id = `${uuidv4()}`;
    // pushes the note with the attached id to the database
    db.push(req.body);
    // returns the database with the newly pushed note object
    res.json(db);
})

// gets the index page if the url does not match any of the above paths
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));