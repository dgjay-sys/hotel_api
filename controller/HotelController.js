const db = require("../config/dbcon");

module.exports = {
  async addHotel(req, res) {
    const { imgurl, hotelname, hoteldesc, userid, hotelemail, hotelprice } =
      req.body;
    let insertQuery =
      "INSERT into `hotel_list` (image_url ,hotel_name, hotel_desc, user_id ,hotel_email,hotel_starting_price) Values(?, ?, ?, ?, ?, ?)";
    await db.query(
      insertQuery,
      [imgurl, hotelname, hoteldesc, userid, hotelemail, hotelprice],
      (err, result) => {
        if (err) console.error(err);
        res.json(result);
      }
    );
  },
  async addRoom(req, res) {
    const {
      hotelid,
      roomtype,
      imgurl,
      roomdesc,
      price,
      noRoom,
      noAdult,
      noChild,
    } = req.body;
    let insertQuery =
      "INSERT INTO `hotel_room_list`(`hotel_id`, `hotel_room_type`, `image_url`, `hotel_room_desc`, `hotel_price`, `no_room`, `no_adult`, `no_child`) VALUES (?,?,?,?,?,?,?,?)";
    await db.query(
      insertQuery,
      [hotelid, imgurl, roomtype, roomdesc, price, noRoom, noAdult, noChild],
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
    let hotelId = req.body.hotelid;
    let innerJoinQuery = "SELECT * from hotel_list WHERE hotel_id = ?";
    db.query(innerJoinQuery, [hotelId], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  async getHotel(req, res) {
    let getHotels = "SELECT * FROM `hotel_list`";
    db.query(getHotels, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  async getRoom(req, res) {
    const hotelId = req.body.hotelid;
    let getHotels = "SELECT * FROM `hotel_room_list` where hotel_id = ?";
    db.query(getHotels, [hotelId], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  async getHotelReserve(req, res) {
    const {
      hotelId,
      userId,
      hotelName,
      hotelTypeRoom,
      dateDepart,
      dateReturn,
      totalPayment,
    } = req.body;
    let getReserve =
      "INSERT INTO `hotel_reserve`(`hotel_id`, `user_id`,`hotel_name`, `hotel_type_room`, `date_depart`, `date_return`, `total_payment` , `reserve_status`) VALUES (?,?,?,?,?,?,?,?)";
    db.query(
      getReserve,
      [
        hotelId,
        userId,
        hotelName,
        hotelTypeRoom,
        dateDepart,
        dateReturn,
        totalPayment,
        "pending",
      ],
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
  },
};
