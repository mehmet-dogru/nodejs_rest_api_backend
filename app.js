const express = require("express");
const app = express();

require("dotenv").config();
require("./config/database");

const productRouter = require("./routers/product_router");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "NodeJS Flutter RestAPI",
  });
});

app.use("/products", productRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`SERVER ${process.env.PORT} portunda çalışıyor...`);
});
