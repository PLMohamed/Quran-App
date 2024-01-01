"use strict";

const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('index');
})

router.get('/surah/:surahId',(req,res) => {
    res.render('surah');
})

module.exports = router;