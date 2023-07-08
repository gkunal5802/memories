import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import postsRoutes from "./routes/postsRoute.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRoutes);

// Will hide in env.config file before deployment.
const CONNECTION_URL =
  "mongodb+srv://gkunal05:memories123@cluster0.0vr8idn.mongodb.net/";

// Heroku will help to assign port after deployment
const PORT = process.env.PORT || 5000;

// required to avoid errors and warnings in console.
mongoose
  .connect(CONNECTION_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false); // use this if you are using mongoose@5
