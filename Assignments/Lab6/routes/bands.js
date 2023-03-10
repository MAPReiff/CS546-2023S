// I pledge my honor that I have abided by the Stevens Honor System.

// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from "express";
export const routerBands = Router();
import { bands } from "../data/index.js";

routerBands
  .route("/") // http://localhost:3000/bands/
  .get(async (req, res) => {
    //code here for GET
    try {
      let bandList = await bands.getAll();
      if (bandList.length == 0) {
        res.json([]);
      } else {
        let finalList = [];
        for (let i = 0; i < bandList.length; i++) {
          let obj = {};
          obj._id = bandList[i]._id.toString();
          obj.name = bandList[i].name;
          finalList.push(obj);
        }
        res.json(finalList);
      }
    } catch (e) {
      res.status(400).json({ error: `${e}` }); // for some reason just e on its own doesnt work
    }
  })
  .post(async (req, res) => {
    //code here for POST
  });

routerBands
  .route("/:id") // http://localhost:3000/bands/id_string
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  })
  .put(async (req, res) => {
    //code here for PUT
  });
