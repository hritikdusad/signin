const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());// DB Config

const db = require("./config/keys").mongoURI;// Connect to MongoDB
const connectdb = () =>{
  return mongoose.connect(db,()=>{},{useNewUrlParser:true,useUnifiedTopology:true});
}
  connectdb()
  .then(() => {
                  console.log("MongoDB successfully connected")
                  app.use(passport.initialize());// Passport config
                  require("./config/passport")(passport);// Routes
                  app.use("/api/users", users);
                  const port = process.env.PORT || 5000;
                  const database = mongoose.db('database')
                  const a = database.collection('sample_airbnb').find({})
                  console.log(a);
                  app.listen(port, () => console.log(`Server up and running on port ${port} !`));


              })
  .catch(err => console.log(err));
  // Passport middleware




