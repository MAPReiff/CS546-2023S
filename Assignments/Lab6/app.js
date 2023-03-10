// I pledge my honor that I have abided by the Stevens Honor System.

// This file should set up the express server as shown in the lecture code

import express from "express";
const app = express();
import { routesMethod } from "./routes/index.js";

app.use(express.json());

routesMethod(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
