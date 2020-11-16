const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

module.exports = router;

router.post('/create', function(req, res) {

    User.create({
        userName: req.body.user.userName,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
        .then(
            function createSuccess(user) {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60* 24});
                
                res.json({
                    userName: user,
                    message: 'Ayeee, welcome aboard homie!!',
                    sessionToken: token
                });
            }
        )
    .catch(err => res.status(500).json({ error: err }))
});

router.post('/login', function(req, res) {
    User.findOne({
        where: {
            userName: req.body.user.userName
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if (matches) {

                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                    
                    res.status(200).json({
                        userName: user,
                        message: "Aye bub! Welcome back!!",
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: "Uhhhh yeah, no. That didn't work. >:("});
                }
            });
    } else {
        res.status(500).json({ error: "Sorry bub, you aint a real person"})
    }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;