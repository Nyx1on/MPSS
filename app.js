const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const signUpPage = path.join(__dirname, "./views/signup.html");
  res.sendFile(signUpPage);
});

app.post("/", async (req, res) => {
  const user = req.body;
  console.log(user);
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const storedUsers = JSON.parse(fileData);

  var userExists = 0;

  for (let existingUser of storedUsers) {
    if (
      user.username === existingUser.username &&
      user.password === existingUser.password
    ) {
      userExists = 1;
    }
  }

  if (userExists === 1) {
    res.redirect('/shop');
  } else {
    res.send("<script>alert('Username or password do not match');</script>");
  }
});

app.get('/shop',(req,res)=>{
    const signUpPage = path.join(__dirname, "./views/index.html");
    res.sendFile(signUpPage);
});

app.listen(3000);
