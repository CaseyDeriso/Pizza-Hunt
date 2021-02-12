const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pizza-hunt", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, '---------connection error------------:'));
db.once('open', function callback () {
  console.log("********connection opened***********");
});

mongoose.set("debug", true);

app.use(require("./routes"));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
