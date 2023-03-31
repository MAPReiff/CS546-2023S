// I pledge my honor that I have abided by the Stevens Honor System.

//Here you will import route files and export them as used in previous labs

import { routerVenues } from "./venues.js";

export const routesMethod = (app) => {
  app.use("/", routerVenues);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "404 not found" });
  });
};
