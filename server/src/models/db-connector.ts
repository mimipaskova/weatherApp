import mongoose from "mongoose";

//Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/weatherApp";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
// Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
//Get the default connection

export let init = () => {
  const db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.on("open", console.log.bind(console, "Connected"));
};
