import express from "express";
import path from "path";
const app = express();

import dotenv from "dotenv";
dotenv.config();

const moment = require('moment');
(global as any).moment = moment;

const methodOverride = require("method-override");
app.use(methodOverride("_method"))

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

// Routes
import clientRoutes from "./routes/client/index.route";
clientRoutes(app);

import adminRoutes from "./routes/admin/index.route";
adminRoutes(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});