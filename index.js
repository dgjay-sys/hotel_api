const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const apiRouter = express.Router();
require("dotenv").config();

//middleware => {jwtchecker.js}
var token = require("./middleware/jwtchecker");

var cors = require("cors");
var bodyParser = require("body-parser");

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);
apiRouter.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//server
app.listen(8000 || process.env.PORT, function () {
  console.log("listening on Server");
});

//controller
const User = require("./controller/UserController");
const Auth = require("./controller/AuthController");
const Hotel = require("./controller/HotelController");

app.post("/register", Auth.UserRegister);
app.post("/login", Auth.AuthLogin);

app.get("/getuser", User.getAllData);
app.post("/gethotelinfo", Hotel.innerJoinTest);

app.post("/addhotel", Hotel.addHotel);
app.post("/addroom", Hotel.addRoom);
app.get("/selectroom", Hotel.mergingRoom);
app.get("/gethotels" , Hotel.getHotel);
app.post("/getrooms" , Hotel.getRoom);
app.post("/addreserve" , Hotel.getHotelReserve);

//*jwt middleware
app.use(token.verifyToken);
//#protected route
//*user route
app.put("/updatename", User.updateNameUser);
app.put("/updateusername", User.updateUsernameUser);
app.put("/updatepassword", User.updateUserPassword);
app.delete("/deleteuser", User.deleteUser);
//*hotel ad route
