const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * from songs;';
    pool.query(queryText)
    .then((result) => {
        console.log('results from db', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error making a query', error);
        res.sendStatus(500);
    });
    //res.send(dbResponse);
});

router.get('/:id', (req ,res) =>{
    console.log('hello from get request', req.params.id);
    const queryText = `SELECT * FROM songs WHERE id = ${req.params.id};`;
    pool.query(queryText)
    .then((result) => {
        console.log('results from db', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error making a query', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req ,res) =>{
    console.log('hello from delete request', req.params.id);
    const queryText = `DELETE FROM songs WHERE id = ${req.params.id};`;
    pool.query(queryText)
    .then((result) => {
        console.log(result);
        res.send(204);
    }).catch((error) => {
        console.log('error making a query', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    const newSong = req.body;
    //quotes around string values, no quotes around integer values
    const queryText = `INSERT INTO "songs" ("rank", "artist", "track", "published") VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [newSong.rank, newSong.artist, newSong.track, newSong.published])
    .then((result) => {
        console.log('result', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error making insert query', error);
        res.sendStatus(500);
    });
});



module.exports = router;