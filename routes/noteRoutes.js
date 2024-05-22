const express = require('express');
const Note = require('../models/note');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/notes', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!(title && content)) {
      return res.status(400).send('All input is required');
    }

    const note = await Note.create({
      title,
      content,
      user_id: req.user.user_id,
    });

    res.status(201).json(note);
  } catch (err) {
    console.log(err);
  }
});

router.get('/notes', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.user.user_id });
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
  }
});

router.get('/notes/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send('Note not found');
    }

    res.status(200).json(note);
  } catch (err) {
    console.log(err);
  }
});

router.put('/notes/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!(title && content)) {
      return res.status(400).send('All input is required');
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, updated_at: Date.now() },
      { new: true }
    );

    if (!note) {
      return res.status(404).send('Note not found');
    }

    res.status(200).json(note);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/notes/:id', auth, async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).send('Note not found');
    }

    res.status(200).send('Note deleted');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;