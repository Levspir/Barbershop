/*eslint-disable no-unused-vars*/

const express = require("express");
const router = express.Router();

const models = require("../models");

router.get("/:login", (req, res) => {
  const id = req.session.userID;
  const userlogin = req.session.userLogin;

  const login = req.params.login;

  models.User.findOne({
    login
  }).then(user => {
    models.Post.find({
      person: user.id
    })
      .then(posts => {
        console.log(posts);
        console.log(user);

        res.render("personal", {
          posts,
          user: {
            id,
            login,
            createdAt: user.createdAt
          }
        });
      })
      .catch(() => {
        throw new Error("Server Error");
      });
  });
});

module.exports = router;
