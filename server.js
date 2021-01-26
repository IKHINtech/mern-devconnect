const express = require("express");
const mongoose = require("mongoose");
const url = require("./config/keys").mongoURI;

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
//DB
const db = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

//schema
const articleSchema = {
  title: String,
  content: String,
};

//model
const Article = mongoose.model("Article", articleSchema);

//route app
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

//config port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
