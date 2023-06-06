require("dotenv").config();

const express = require("express");
const PORT = 3000
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

app.use(express.json());
app.use(cors());

const clientRouter = require("./routes/clients");
app.use("/clients", clientRouter);

const insuranceRouter = require("./routes/insurance");
app.use("/insurance", insuranceRouter);

app.listen(3000, () => console.log("server started"));
