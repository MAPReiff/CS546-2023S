//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import { router } from "./auth_routes.js";

export const routesMethod = (app) => {
  app.use("/", router);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "404 not found" });
  });
};
