const { request, response } = require('express');

const { postAuth } = require('../controllers/auth');

const router = require('express').Router();


router.post('/login', postAuth);

module.exports = router;