import UserModel from "../models/UserModel.js";
import { createToken } from "../services/authServices.js";
import { createHash } from "crypto";

export const loginAuthController = async (req, res) => {
    console.log(req.body)
    const check = await UserModel.findOne({ phone: req.body.phone })
    console.log(check);
    if (check === null) {
      return res.render("login", { status: "User does not exist" });
    }
  
    if (check.password === createHash("sha256").update(req.body.password).digest("hex")) {
      const cookieToken = createToken(check._id);
      res.cookie("actk", cookieToken, {
        httpOnly: true,
        secure: true
      });
      return res.redirect("/dashboard");
    }
    else {
      return res.render("login", { status: "Invalid details" });
    }
}

export const registerAuthController = async (req, res) => {
  console.log(req.body)
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  
  const existingUser = await UserModel.findOne({ phone: req.body.phone });
  console.log(existingUser)
  if (existingUser) return res.render("login", { status: "User already exists" })

  const user = UserModel.create({
    name: req.body.name,
    age: req.body.age,
    password: createHash("sha256").update(req.body.password).digest("hex"),
    phone: req.body.phone.toString(),
  })
    .then((user) => {
      console.log(user);
      res.render("login", { status: "Account created. Log In" });
    })
    .catch(err => {
      console.log(err);
      res.render("register", { status: "Error saving data, try again" })
    });  
}