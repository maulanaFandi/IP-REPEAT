const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      throw {
        name: "Unauthorized",
      };

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer")
      throw {
        name: "Unauthorized",
      };

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user)
      throw {
        name: "Unauthorized",
      };

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
