const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');


router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      error: 'Server error',
    })
  }
});

module.exports = router;