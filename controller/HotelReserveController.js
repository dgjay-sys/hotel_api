const db = require("../config/dbcon");

module.exports = {
  async hotelReserve(req, res) {
    const userid = req.body.userId;
    let query =
      "SELECT * FROM hotel_reserve as reserve INNER JOIN hotel_list as list ON reserve.hotel_id = list.hotel_id INNER JOIN hotel_room_list as roomlist ON reserve.hotel_id = roomlist.hotel_id WHERE reserve.user_id = ?";
    db.query(query, [userid], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },
};
