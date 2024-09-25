const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());



//importing the router object that has all the routes of the file.
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

//passing the imported router object to this middleware, with a pre-URL that is needed in all routes.
//now all the routes from productRoute have been used, ie, all the get and post requests are being taken in respective URLs.
app.use("/api/v1",product);
//and all the routes from user too.
app.use("/api/v1",user);


//middleware for errors
app.use(errorMiddleware);

module.exports = app;