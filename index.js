import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const userposts = [];
const TitlesArr = [];
var i = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  console.log(req.body["Title"]);
  console.log(req.body["UserPost"]);
  TitlesArr[i] = req.body["Title"];
  userposts[i] = req.body["UserPost"];
  i++;
  res.render("index.ejs", {
    done: "The Post has been created.",
  });
});

app.post("/ViewPost", (req, res) => {
  res.render("Posts.ejs", { Post: userposts, i: i, Title: TitlesArr });
});

app.get("/ViewPost", (req, res) => {
  res.render("Posts.ejs", { Post: userposts, i: i, Title: TitlesArr });
});

app.post("/delete", (req, res) => {
  TitlesArr[req.body.buttonId] = "";
  userposts[req.body.buttonId] = "";
  res.render("Posts.ejs", { Post: userposts, Title: TitlesArr });
});

app.post("/Edit", (req, res) => {
  var k = req.body.buttonId;
  res.render("update.ejs", { index: k, Previous: userposts[k] });
  console.log(userposts[k]);
});

app.post("/Update", (req, res) => {
  var NewPost = req.body["UserPost"];
  userposts[req.body.buttonId] = NewPost;
  res.render("posts.ejs", { Post: userposts, i: i, Title: TitlesArr });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
