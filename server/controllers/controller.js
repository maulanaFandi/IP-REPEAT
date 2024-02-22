const { signToken } = require("../helpers/jwt");
const { User, Transaction } = require("../models");
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
      const { payload } = await client.verifyIdToken({
        idToken: req.body.google_token,
        audience:
          "881421523009-8qqcua7j37f77qes05tf8aq3ijuuscer.apps.googleusercontent.com",
      });

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: Math.random(),
        },
        hooks: false,
      });

      const access_token = signToken({ id: user.id, email: user.email });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async processTransaction(req, res, next) {
    try {
      const UserId = req.user.id;
      const {
        product_data_name,
        product_data_unit_amount,
        product_data_currency,
        product_data_quantity,
      } = req.body;

      const findUser = await User.findByPk(UserId, {
        include: [Transaction],
      });

      const now = new Date();
      const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;
      // const trxId = nanoid();
      const transaction_id = `TRX-UACC-warg48-${formattedDate}`;
      if (!findUser) throw { name: "notFound" };
      // console.log(findUser.Transactions[0], "ENIH");

      if (findUser.status === "Premium")
        throw { name: "isPremium", message: "your tier is already Premium" }; //GANTI KE ALERT UDAH PREMIUM, GABAKAL SIH

      if (findUser.Transactions.length > 0) {
        const checkSession = await stripe.checkout.sessions.retrieve(
          findUser.Transactions[0].payment_gateway_id
        );

        if (checkSession.status === "open") {
          res.status(200).json({ url: checkSession.url });
        } else if (checkSession.status === "expired") {
          res.status(200).json({
            message: "Your transaction is expired",
          });
        } else if (checkSession.status === "complete") {
          await findUser.update({ status: "Premium" });
          await findUser.Transactions[0].update({ status: "paid" });
          res.status(200).json({
            message: "Payment successful, redirecting to your page",
            url: "https://animemina-8e789.web.app/anime/:id", //masukin link deploy client nya
          });
        }
      } else {
        const session = await stripe.checkout.sessions.create({
          success_url: "https://animemina-8e789.web.app/payment/success", //balikkan ke url client atau endpoint mengakses deatil
          cancel_url: "https://animemina-8e789.web.app/payment/fail", //balikkan ke url client atau endpoint mengakses detail
          line_items: [
            {
              price_data: {
                currency: product_data_currency,
                product_data: {
                  name: product_data_name,
                },
                unit_amount: product_data_unit_amount,
              },
              quantity: product_data_quantity,
            },
          ],
          mode: "payment",
          customer_email: findUser.email,
        });

        const payment_gateway_id = session.id;

        await Transaction.create({
          UserId,
          transaction_id,
          payment_gateway_id,
          status: `${session.payment_status}`,
        });

        res.status(200).json({ url: session.url }); //YANG DI RETURN CUKUP URL AJA, NANTI LANGSUNG DI PAKSA CLIENT KE URL PAKE WINDOW
      }
    } catch (error) {
      next(error);
    }
  }

  static async upgradeToPremium(req, res, next) {
    try {
      const UserId = req.user.id;
      const findUser = await User.findByPk(UserId, {
        include: [Transaction],
      });

      if (!findUser)
        throw {
          name: "Unauthorized",
          message: "You are not authorized to upgrade",
        };

      if (findUser.status === "Premium")
        throw { name: "isPremium", message: "your tier is already Premium" }; //GANTI KE ALERT UDAH PREMIUM

      if (findUser.Transactions[0].status === "unpaid") {
        const checkSession = await stripe.checkout.sessions.retrieve(
          findUser.Transactions[0].payment_gateway_id
        );

        if (checkSession.status === "open") {
          res.status(200).json({ url: checkSession.url });
        } else if (checkSession.status === "expired") {
          res.status(200).json({
            message: "Your transaction has expired",
          });
        } else if (checkSession.status === "complete") {
          await findUser.update({ status: "Premium" });
          await findUser.Transactions[0].update({ status: "paid" });
          res.status(200).json({
            message: "Payment Successful, redirecting to your page",
          });
        }
      } else {
        await findUser.update({ status: "Premium" });
        await findUser.Transactions[0].update({ status: "paid" });
        res
          .status(200)
          .json({ message: "Upgrade success, you are now a Premium user" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
