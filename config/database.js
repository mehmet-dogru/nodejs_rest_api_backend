const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Veri Tabanına Bağlandı :)");
  })
  .catch(() => {
    console.log("Veri Tabanına Bağlanırken Hata Oluştu :(");
  });
