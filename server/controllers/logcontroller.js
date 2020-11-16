let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

router.get('/practice', validateSession, function(req, res)
{
    res.send('Hey! Please work, I do not want to do this again!')
});

router.post('/create', validateSession, (req, res) => {
    const logEntry = {
        title: req.body.log.title,
        date: req.body.log.date,
        entry: req.body.log.entry,
        owner: req.user.id
    }
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})

// For all
router.get("/", (req, res) => {
    Log.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});


//specific
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner: userid }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

//updating
router.put("/update/:entryId", validateSession, function (req, res) {
    const updateLogEntry = {
        title: req.body.log.title,
        date: req.body.log.date,
        entry: req.body.log.entry,
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id } };

    Log.update(updateLogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});


router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Logs.destroy(query)
        .then(() => res.status(200).json({ message: "BOOM HEADSHOT" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router; 