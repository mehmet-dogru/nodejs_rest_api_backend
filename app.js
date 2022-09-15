const express = require("express");
const app = express();

//Error Handling
const errorMiddleware = require("./middleware/errorMiddleware");

require("dotenv").config();
require("./config/database");

const productRouter = require("./routers/product_router");
const userRouter = require("./routers/user_router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "NodeJS Flutter RestAPI",
  });
});

app.use("/upload", express.static(__dirname + "/uploads/images"));

app.use("/products", productRouter);
app.use("/api/users", userRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log(`SERVER ${process.env.PORT} portunda çalışıyor...`);
});
