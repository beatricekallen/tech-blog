const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// get all posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "body", "createdAt"],
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
    // serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // we should render all the posts here
    //TODO: check render is correct
    res.render("all-posts", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

//TODO: complete this route
// get single post
router.get("/post/:id", async (req, res) => {
  try {
    // what should we pass here? we need to get some data passed via the request body (something.something.id?)
    // change the model below, but not the findByPk method.
    const postData = await Post.findByPk(req.params.id, {
      // helping you out with the include here, no changes necessary
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      // serialize the data
      const post = postData.get({ plain: true });
      // which view should we render for a single-post?
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// giving you the login and signup route pieces below, no changes needed.
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
