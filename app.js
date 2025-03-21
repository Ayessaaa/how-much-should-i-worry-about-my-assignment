import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import authController from "./controllers/authController.js";


const app = express();

app.set("view engine", "ejs");

const dbURI = process.env.DB_URI;
if (!dbURI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res)=>{
    res.render("index")
})

app.get("/sign-up", authController.signUp)
app.post("/auth/sign-up", authController.authSignUp);

app.get("/log-in", authController.logIn)
app.post("/auth/log-in", authController.authLogIn);


// app.get("/sign-up", authController.signUp);

app.get("/sign-up/:err", authController.signUpError);

// app.get("/log-in", authController.logIn);

app.get("/log-in/:err", authController.logInError);

// app.post("/auth/sign-up", authController.authSignUp);

// app.post("/auth/log-in", authController.authLogIn);

// app.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/log-in");
//     }
//   });
// });
