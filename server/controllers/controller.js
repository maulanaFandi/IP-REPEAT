const { signToken } = require("../helpers/jwt")
const { User } = require("../models");
const bcryptjs = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class Controller {
    static async register(req, res, next) {
        try {
          const user = await User.create(req.body);
          res.status(201).json({
            message: "User Has Been Created",
            id: user.id,
            email: user.email,
          });
        } catch (error) {
          console.log(error);
          next(error);
        }
      }

      static async login(req, res, next) {
        try {
          const { email, password } = req.body;
          console.log(password, "line 25 <<<<<<<<<");
          if (!email) {
            throw { name: "EmailEmpty" };
          }
          if (!password) {
            throw { name: "PasswordEmpty" };
          }
    
          const user = await User.findOne({ where: { email } });
          if (!user) {
            throw { name: "InvalidLogin" };
          }
    
          const compared = bcryptjs.validate(password, user.password);
          if (!compared) {
            throw { name: "InvalidLogin" };
          }
          const access_token = signToken({ id: user.id, email: user.email });
    
          res.status(200).json({ access_token });
        } catch (error) {
          console.log(error);
          next(error);
        }
      }

      static async googleLogin(req, res, next) {
        try {
          console.log(req.body);
          const {payload} = await client.verifyIdToken({
            idToken: req.body.google_token,
            audience: "881421523009-8qqcua7j37f77qes05tf8aq3ijuuscer.apps.googleusercontent.com"
          })
    
          const [user, created] = await User.findOrCreate({
            where: {email: payload.email},
            defaults: {
              email: payload.email,
              password: Math.random(),
            },
            hooks: false
          })
    
          const access_token = signToken({id: user.id, email: user.email})
          res.status(200).json({access_token})
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
}

module.exports = Controller