// I pledge my honor that I have abided by the Stevens Honor System

/*
Require express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the text analyzer page.

you just need one route to send the static homepage.html file
*/

import { Router } from "express";
export const routerText = Router();

routerText.route("/").get(async (req, res) => {
  //code here
  try {
    res.sendFile("homepage.html", { root: "./static/" });
  } catch (e) {
    res.status(500).json({ error: "500 internal server error" });
  }
});
