import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postsRoutes from "./routes/postsRoute.js";
import usersRoutes from "./routes/usersRoute.js";
const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRoutes);
app.use("/user", usersRoutes);

// Heroku will help to assign port after deployment
const PORT = process.env.PORT || 5000;

// required to avoid errors and warnings in console.
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

// mongoose.set("useFindAndModify", false); // use this if you are using mongoose@5
