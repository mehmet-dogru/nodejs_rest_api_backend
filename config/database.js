const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Veri Tabanına Bağlandı :)");
  })
  .catch((err) => {
    console.log(err);
    console.log("Veri Tabanına Bağlanırken Hata Oluştu :(");
  });
