const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signin = async (req, res) => {
  try {

    if (!req.body.email || req.body.email === "" || !req.body.password || req.body.password === "") {
      return res.status(400).json({ message: "Veuillez saisir un email et un mot de passe" })
    };
    let user = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      token: jwt.sign({
        _id: user._id,
        email: user.email,
      }, process.env.JWT_KEY, { expiresIn: '24H' })
    });
  } catch (error) {
    return res.status(400).json({
      error: "Une erreur est survenue, merci de vérifier vos informations"
    })
  }
}

exports.login = async (req, res) => {
  try {
    if (!req.body.email || req.body.email === "" || !req.body.password || req.body.password === "") {
      return res.status(400).json({ message: "login ou mot de passe incorrect" })
    };
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "login ou mot de passe incorrect" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ error: "login ou mot de passe incorrect" });
    }
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      token: jwt.sign({
        _id: user._id,
        email: user.email,
      }, process.env.JWT_KEY, { expiresIn: '24H' })
    });
  } catch (error) {
    return res.status(400).json({
      "error": "Une erreur est survenue, merci de vérifier vos informations"
    })
  }
}