const express    = require("express"),
      bodyParser = require("body-parser");


const app = express();

const userRoutes    = require("./routes/user"),
      messageRoutes = require("./routes/message");

app.use(bodyParser.urlencoded({extended:true}));

app.use(userRoutes);
app.use(messageRoutes);

app.listen(3000,function(){
    console.log("server started!")
})