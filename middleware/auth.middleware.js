const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Vous devez être identifié pour effectuer cette action."
    });
  }

  try {
    req.token = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Vos informations sont invalides."
    });
  }
};
