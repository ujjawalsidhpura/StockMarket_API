const express = require('express');
const router = express.Router();
const mongoDb = require('../mongoDb')
const db = mongoDb.getDb();
const users = 'Users' //Collection name in MongoDb

// GET all users
router.get('/', function (req, res) {

    db.collection(users)
        .find()
        .toArray((err, results) => {
            if (err) return console.log(err)

            res.send(results)
        });

});

module.exports = router;