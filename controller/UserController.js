const db = require("../config/dbcon");
const bcrypt = require("bcrypt");
const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
  async getAllData(req, res) {
    sqlSelect = "SELECT *  FROM `users` ";
    await db.query(sqlSelect, function (error, result, fields) {
      if (error) throw error;
      //console.log(fields);
      res.json(result);
    });
  },

  async createUser(req, res) {
    const { fname, username, password } = req.body;
    const sql =
      "INSERT INTO users (fname, username, password) VALUES (?, ?, ?)";
    await db.query(
      sql,
      [fname, username, password],
      function (error, result, fields) {
        if (error) throw error;
        res.json(result);
      }
    );
  },

  //user details
  async updateFnameUser(req, res) {
    const newFname = req.body.newFname;
    //const newLname = req.body.newLname;
    const user_id = req.body.userId;
    const sqlUpdate =
      "Update users SET fname = ?  WHERE user_id = ?";
    await db.query(
      sqlUpdate,
      [newFname , user_id],
      function (error, result) {
        if (error) console.log(error);
        res.json(result);
      }
    );
  },

  async updateLnameUser(req, res) {
    const newLname = req.body.newLname;
    const user_id = req.body.userId;
    const sqlUpdate =
      "Update users SET lname = ?  WHERE user_id = ?";
    await db.query(
      sqlUpdate,
      [newLname , user_id],
      function (error, result) {
        if (error) console.log(error);
        res.json(result);
      }
    );
  },

  async updateUsernameUser(req, res) {
    const newUsername = req.body.newUsername;
    const user_id = req.body.userId;
    const sqlUsernameUpdate =
      "Update users SET username = ?  WHERE user_id = ?";
    await db.query(
      sqlUsernameUpdate,
      [newUsername, user_id],
      function (error, result) {
        if (error) console.log(error);
        res.json(result);
      }
    );
  },

  async updateUserPassword(req, res) {
    var oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    const user_id = req.body.userId;
    await db.query(
      "SELECT password FROM users WHERE user_id = ?",
      [user_id],
      (err, result) => {
        if (err) {
          res.json(err);
        }
        if (result == 0) {
          res.status(500).send({ error: "user not found" });
          return;
        }
        const oldPassowrdHashed = result[0].password;
        bcrypt.compare(oldPassword, oldPassowrdHashed, (err, match) => {
          if (err) {
            console.error(err);
            return;
          }
          if (!match) {
            res.status(500).send({ error: "old password not matched" });
            return;
          } else {
            const salt = genSaltSync(10);
            newPassword = hashSync(newPassword, salt);

            const queryUpdate =
              "UPDATE users SET password = ? WHERE user_id = ?";
            db.query(queryUpdate, [newPassword, user_id], (err, results) => {
              if (err) {
                console.error("Error updating password:", err.stack);
                return;
              }
              console.log(
                "Password updated successfully for user with ID:",
                user_id
              );
              res.json(results);
            });
          }
        });
      }
    );
  },
  async deleteUser(req , res){
      user_id = req.body.userId;
      const deleteQuery = "DELETE FROM `users` WHERE  user_id = ?"
      await db.query(
        deleteQuery, [user_id], function (result , err) {
            if(err) res.send(err); 
            res.json(result);
          }
      )
  }
};
