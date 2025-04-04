const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        'message': 'Vous devez être identifíé pour effectuer cette action.'
      });
      return;
    }

    try {
      req.token = jwt.verify(token, process.env.JWT_KEY);
      next();
    } catch (e) {
      res.status(401).json({
        'message': 'Vos informations sont invalides.'
      });
    }

    try {
      req.token = jwt.verify(token, process.env.JWT_KEY || "defaultSecretKey");
      next();
    } catch (e) {
      res.status(401).json({
        'message': 'Your credentials are not valid.'
      });
    }
  }
}