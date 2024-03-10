const mongoose = require("mongoose");
mongoose
  .connect(
    process.env.MONGO_URI
    //      {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false,
    //   }
  )
  .then((c) => {
    console.log(`Mongodb connet to: ${c.connection.host}`);
  })
  .catch((e) => console.log("No connection", e));
