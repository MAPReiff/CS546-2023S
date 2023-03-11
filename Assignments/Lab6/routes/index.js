// I pledge my honor that I have abided by the Stevens Honor System.

// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /bands use the routes defined in the bands.js routing file
    - When the route is /albums use the routes defined in albums.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/

import { routerAlbums } from "./albums.js";
import { routerBands } from "./bands.js";

export const routesMethod = (app) => {
  app.use("/albums", routerAlbums);
  app.use("/bands", routerBands);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "404 not found" });
  });
};
