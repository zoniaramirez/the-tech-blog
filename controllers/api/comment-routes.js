const router = require("express").Router();
const { Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// GET all display all comments 
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET by id get into a specific comment
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route create a comment and save its data when user loggedIn
router.post("/", withAuth, async (req, res) => {
  if (req.session) {
    try {
      const commentData = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      res.json(commentData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
});

// PUT route update a comment for loggedIn user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE route delete a comment with the comment id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;