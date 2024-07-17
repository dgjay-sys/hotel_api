const { genSaltSync, hashSync } = require("bcrypt");
const db = require("../config/dbcon");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  async AuthLogin(req, res) {
    // const username = req.body.username;
    // const password = req.body.password;

    const { username, password } = req.body;

    try {
      await db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        function (error, result) {
          const isValidPassword = bcrypt.compareSync(
            password,
            result[0].password
          );
          if (isValidPassword) {
            result[0].password = undefined;
            const jsontoken = jsonwebtoken.sign(
              { user: result[0] },
              process.env.SECRET_KEY,
              { expiresIn: "30m" }
            );
            res.cookie("token", jsontoken, {
              httpOnly: true,
              secure: true,
              sameSite: "Strict",
              expires: new Date(Date.now() + 30 * 60 * 1000),
            });
            return res.json( user = { ...result[0], token: jsontoken } );
          } else {
            return res.status(401).json({
              message: "Invalid email or password",
            });
          }
        }
      );
    } catch (error) {
      console.error("Error in AuthLogin:", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  async   UserRegister(req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    let password = req.body.password;

    if (!fname || !username || !password || !lname) {
      return res.sendStatus(400);
    }

    const salt = genSaltSync(10);
    password = hashSync(password, salt);

    regisQuery =
      "INSERT INTO users (fname,lname , username, password, role) VALUES (?, ?, ?, ?, ?)";
    const user = await db.query(regisQuery, [fname, lname, username, password , 'user']);

    const result = user.insertId;

    const jsontoken = jsonwebtoken.sign({ result }, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });
    res.cookie("token", jsontoken, {
      httpOnly: true,
      secure: true,
      SameSite: "strict",
      expires: new Date(Number(new Date()) + 30 * 60 * 1000),
    });

    res.json({ token: jsontoken, data: result });

    // res.json(user);
  },
};
