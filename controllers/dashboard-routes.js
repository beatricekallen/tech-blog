const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "body", "user_id", "createdAt"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts-admin", {
      layout: "dashboard",
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/new", withAuth, (req, res) => {
  // what view should we send the client when they want to create a new-post? (change this next line)
  res.render("new-post", {
    // again, rendering with a different layout than main! no change needed
    layout: "dashboard",
    loggedIn: req.session.loggedIn,
  });
});

router.get("/edit/:id", withAuth, async (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ["id", "title", "body", "user_id"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
