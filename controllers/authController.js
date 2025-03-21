import bcrypt from "bcryptjs";

import User from "../models/user.js";

const signUp = (req, res) => {
  res.render("signup", { error: false });
};

const signUpError = (req, res) => {
  const err = req.params.err;
  res.render("signup", { error: err });
};

const authSignUp = async (req, res) => {
  const { username, password, timezone } = req.body;
  try {
    const result = await User.find({ username: username });
    if (result.length == 0) {
      let hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new User({
        username: username,
        password: hashedPassword,
        timezone: timezone,
      });

      await newUser.save();
      req.session.isLoggedIn = true;
      req.session.username = username;
      req.session.timezone = timezone;

      res.redirect("/home");
    } else {
      res.redirect("/sign-up/username-taken");
    }
  } catch (error) {
    console.log(error);
  }
};

const logIn = (req, res) => {
  res.render("login", { error: false });
};

const logInError = (req, res) => {
  const err = req.params.err;
  res.render("login", { error: err });
};

const authLogIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await User.find({ username: username });
    if (result.length == 0) {
      res.redirect("/log-in/acc-not-exists");
    } else {
      bcrypt.compare(password, result[0].password, (err, resultCompare) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return;
        }

        if (resultCompare) {
          req.session.isLoggedIn = true;
          req.session.username = username;
          req.session.timezone = result[0].timezone;
          res.redirect("/home");
        } else {
          res.redirect("/log-in/wrong-password");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  signUp,
  signUpError,
  logIn,
  logInError,
  authLogIn,
  authSignUp,
};
