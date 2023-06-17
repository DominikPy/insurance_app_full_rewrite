require("dotenv").config();

const express = require("express");
const PORT = 3000
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

app.use(express.json());
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/public/js'));


const clientRouter = require("./routes/clients");
app.use("/clients", clientRouter);

const insuranceRouter = require("./routes/insurance");
app.use("/insurance", insuranceRouter);

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
