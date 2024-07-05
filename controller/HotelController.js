const db = require("../config/dbcon");

module.exports = {
  async addHotel(req, res) {
    const { hotelname, hoteldesc, userid, hotelemail, hotelprice } = req.body;
    let insertQuery =
      "INSERT into `hotel_list` (hotel_name, hotel_desc, user_id ,hotel_email,hotel_starting_price) Values(? , ? ,? ,? ,?)";
    await db.query(
      insertQuery,
      [hotelname, hoteldesc, userid, hotelemail, hotelprice],
      (err, result) => {
        if (err) console.error(err);
        res.json(result);
      }
    );
  },
  async addRoom(req, res) {
    const { hotelid, roomtype, roomdesc, price } = req.body;
    let insertQuery =
      "INSERT into `hotel_room_list` (hotel_id, hotel_room_type, hotel_room_desc, hotel_price) VALUE(?, ?, ?, ?)";
    await db.query(
      insertQuery,
      [hotelid, roomtype, roomdesc, price],
      (err, result) => {
        if (err) console.error(err);
        res.json(result);
      }
    );
  },
  async mergingRoom(req, res) {
    const userid = req.body.userid;
    let selectQuery =
      "SELECT hotel_room_type , hotel_room_desc, hotel_price from `hotel_room_list` WHERE hotel_id = ?";
    await db.query(selectQuery, [userid], (err, result) => {
      if (err) console.error(err);
      res.json(result);
    });
  },

  async innerJoinTest(req, res) {
    let innerJoinQuery =
      "SELECT * from hotel_list as hotellist  INNER JOIN  hotel_room_list as roomlist ON hotellist.hotel_id = roomlist.hotel_id WHERE hotellist.hotel_id = 1";

    db.query(innerJoinQuery, (err, result) => {
      if (err) throw err;

      res.json(result);
    });
  },

  async getHotel(req , res) {
    let getHotels = "SELECT * FROM `hotel_list`";
    db.query(getHotels, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  async getRoom(req , res) {
    const hotelId = req.body.hotelid;
    let getHotels = "SELECT * FROM `hotel_room_list` where hotel_id = ?";
    db.query(getHotels,[hotelId] ,(err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },
};
