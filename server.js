const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const db = require('./db/db')
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(db);
})

app.delete('/api/notes/:id', (req, res) => {
    const uniqueID = req.params.id;
    console.log(db)

    for (let i=0; i<db.length; i++){
        if (uniqueID === db[i].id) {
            db.splice(i, 1);
            console.log('updated db: ', db)
        }
    };
    res.json(db);
})

app.post('/api/notes', (req, res) =>{
    req.body.id = `${uuidv4()}`;
    db.push(req.body);
    res.json(db);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));