const express = require('express');
const Post = require('../models/post');
const User = require('../models/User');
const sequelize = require("../dbconfig");
const router = express.Router();



// Find All
router.get('/', async (req, res) => {
  try {
    const post = await Post.findAll();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts
router.post('/', async (req, res) => {
  const { username, title, content } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Create the new user
    const user = await User.create({ username }, { transaction });
   // console.log(user, "create-user");
    // Create the post for the user
    const post = await Post.create({ title, content, userId: user.id }, { transaction });

    // Commit the transaction
    await transaction.commit();
    res.status(201).json({ user, post });
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
});

// find
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id ,
      {
        include: [{
          model: User,
          attributes: ['username'], // Only select the username
        }],
      });

    if (!post) return res.status(404).json({ error: 'data not found' });

   // Restructure the response
      const response = {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        userId: post.userId,
        username: post.User.username
      };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'data not found' });

    await post.update(req.body);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: 'data not found' });

    await post.destroy();
    res.status(201).json({ message : "delete successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
