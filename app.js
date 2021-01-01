let express = require("express");
let app = express();

app.use(express.static("public/"))

.get("/atm", (req, res) =>{
    res.render("atm.ejs");
})

.use((req, res, next) =>{
    res.redirect("/atm");
})

.listen(1414);

console.log("Server is running on 1414");