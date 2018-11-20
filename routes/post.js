const express = require("express");
const router = express.Router();

const models = require("../models");

router.get("/", (req, res) => {
  const id = req.session.userID;
  const login = req.session.userLogin;
  res.render("post", {
    user: {
      id,
      login
    }
  });
});

router.post("/", (req, res) => {
  const userID = req.session.userID;
  /*eslint-disable no-unused-vars*/
  const userLogin = req.session.userLogin;
  const name = req.body.name;
  const data = req.body.data;
  const number = req.body.number;
  const time = req.body.time;

  if (!name || !data || !number || !time) {
    const fields = [];
    if (!name) fields.push("name");
    if (!data) fields.push("data");
    if (!number) fields.push("number");
    if (!time) fields.push("time");
    res.json({
      ok: false,
      error: "All inputs should be filled",
      fields
    });
  } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
    res.json({
      ok: false,
      error: "Use only latin letters and digits",
      fields: ["name"]
    });
  } else if (name.length < 3 || name.length > 16) {
    res.json({
      ok: false,
      error: "Name length from 3 to 16 symbols!",
      fields: ["name"]
    });
  } else if (!/^((\+7|7|8)+([0-9]){10})$/.test(number)) {
    res.json({
      ok: false,
      error: "Number is not correct",
      fields: ["number"]
    });
  } else if (
    !/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/.test(
      data
    )
  ) {
    res.json({
      ok: false,
      error: "Data is not correct",
      fields: ["data"]
    });
  } else {
    models.Post.create({
      name,
      data,
      number,
      time,
      person: userID
    })
      .then(post => {
        console.log(post);
        res.json({
          ok: true
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          ok: false
        });
      });
  }
});

module.exports = router;
