// I pledge my honor that I have abided by the Stevens Honor System.

// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from "express";
export const routerBands = Router();
import { bands } from "../data/index.js";
import { bandCreateError } from "../helpers.js";

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
        res.status(200).json(finalList);
      }
    } catch (e) {
      res.status(400).json({ error: `${e}` }); // for some reason just e on its own doesnt work
    }
  })
  .post(async (req, res) => {
    //code here for POST
    // console.log(req.body)
    try {
      if (
        req.body.hasOwnProperty("name") &&
        req.body.hasOwnProperty("genre") &&
        req.body.hasOwnProperty("website") &&
        req.body.hasOwnProperty("recordCompany") &&
        req.body.hasOwnProperty("groupMembers") &&
        req.body.hasOwnProperty("yearBandWasFormed") &&
        Object.keys(req.body).length == 6
      ) {
        let name = req.body.name;
        let genre = req.body.genre;
        let website = req.body.website;
        let recordCompany = req.body.recordCompany;
        let groupMembers = req.body.groupMembers;
        let yearBandWasFormed = req.body.yearBandWasFormed;

        let good = await bandCreateError(
          req.body.name,
          req.body.genre,
          req.body.website,
          req.body.recordCompany,
          req.body.groupMembers,
          req.body.yearBandWasFormed,
          "route"
        );

        name = good[0];
        genre = good[1];
        website = good[2];
        recordCompany = good[3];
        groupMembers = good[4];
        yearBandWasFormed = good[5];

        let newBand = await bands.create(
          name,
          genre,
          website,
          recordCompany,
          groupMembers,
          yearBandWasFormed
        );
        res.status(200).json(newBand);
      } else {
        throw new Error("input JSON is missing a key");
      }
    } catch (e) {
      res.status(400).json({ error: `${e}` }); // for some reason just e on its own doesnt work
    }
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
