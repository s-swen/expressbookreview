const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    return !users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ 
    return users.some(user => user.username === username && user.password === password);
}

regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign(
            {data: password},
            "access",
            {expressIn: 60 * 60}
        );
        req.session.authorization = {
            accessToken,
            username
        }
        return res.status(200).json({message: "User Logged in"});

    } else {
        return res.status(403).json({message: "Please check username or password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
