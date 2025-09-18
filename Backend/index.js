//type is "commonjs" bydefault
// const express=require('express');
// const app=express();
//type is "Modulejs" (check in package.json)
import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const port = process.env.PORT || 8000;

connectDB(); //connect to MongoDB

const app = express();

//Body Parse Middleware to parse the body object from api request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser used to parse cookie from req
//cookie parser middlware
app.use(cookieParser()); // allow to access req.cookies.cookiename



app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

//Make upload folder static
const __dirname = path.resolve(); //give the current directely
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if(process.env.NODE_ENV==="production"){
  //set static folder
  app.use(express.static(path.join(__dirname,"/frontend/build")));

  //any route that is not api will be redirected to index.html of react app
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
  });
}else{
app.get("/", (req, res) => {
  res.send("API is running....");
});
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
