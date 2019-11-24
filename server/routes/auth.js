const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const router = express.Router();

const auth = require("../auth");

router.post("/login", (req, res, next) => {
  const { user } = req.body;
  const valid = user.email.length && user.password === "Admin";

  if (!valid) {
    return res.status(401).json({ error: "Invalid login data!" });
    // throw new Error("Invalid username or password");
  }

  const accessToken = jsonwebtoken.sign(
    {
      user: user.email,
      name: "User " + user.email,
      scope: ["test", "user"]
    },
    "dummy"
  );

  res.json({
    user: {
      _id: 0,
      name: user.email,
      email: user.email
    },
    token: accessToken
  });
});

// [GET] /user
router.get("/user", (req, res, next) => {
  res.json({ user: req.user });
});

// [POST] /logout
router.post("/logout", (req, res, next) => {
  res.json({ status: "OK" });
});

router.get("/current", auth.required, (req, res, next) => {
  const { payload } = req;

  const token = req.headers.authorization.split(' ')[1];
  var decoded = jsonwebtoken.verify(token, 'dummy');

  const accessToken = jsonwebtoken.sign(
    {
      user: decoded.email,
      name: "User " + decoded.email,
      scope: ["test", "user"]
    },
    "dummy"
  );

  return res.json({
    user: {
      user: payload.user,
      picture: payload.picture,
      name: payload.name,
      scope: payload.scope
    },
    token: accessToken
  });
});

router.post('/register', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        msg: 'Email cím megadása kötelező!',
      },
    });
  }

  if (!user.password || !user.passwordAgain) {
    return res.status(422).json({
      errors: {
        msg: 'A jelszó megadása kötelező!',
      },
    });
  }

  if (user.password != user.passwordAgain) {
    return res.status(422).json({
      errors: {
        msg: 'Két jelszó nem egyezik!',
      },
    });
  }

  delete user["passwordAgain"];
  // const finalUser = new Users(user);

/*   finalUser.setPassword(user.password);

  return finalUser.save(function (err) {
    if (err) {
      if (err.code == 11000) {
        return res.status(422).json({
          errors: {
            msg: 'Ezzel az email címmel már regisztráltak!',
          },
        });
      }
    }
    return res.json({ success: { msg: "Sikeres regisztráció!", login: true } });
  }); */
  res.json({ success: { msg: "Sikeres regisztráció!", login: true } });
});

module.exports = router;
