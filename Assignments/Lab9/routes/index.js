// I pledge my honor that I have abided by the Stevens Honor System

//Here you will require route files and export them as used in previous labs.

import { routerText } from "./textanalyzer.js";

export const routesMethod = (app) => {
  app.use("/", routerText);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "404 not found" });
  });
};
