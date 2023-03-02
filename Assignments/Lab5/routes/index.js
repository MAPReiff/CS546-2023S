// I pledge my honor that I have abided by the Stevens Honor System.

//An index file that returns a function that attaches all your routes to your app your routes will be defined in routes.js
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/routes/index.js

import { routerAbout, routerStory, routerEducation } from "./routes.js";

export const routesMethod = (app) => {
  app.use("/aboutme", routerAbout);
  app.use("/mystory", routerStory);
  app.use("/educationhistory", routerEducation);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "404 not found" });
  });
};
