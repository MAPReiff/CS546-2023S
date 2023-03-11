// I pledge my honor that I have abided by the Stevens Honor System.

// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from "express";
export const routerAlbums = Router();

import { albums, bands } from "../data/index.js";
import { idToOID, albumCreateError } from "../helpers.js";

routerAlbums
  .route("/:bandId") // http://localhost:3000/albums/id_string
  .get(async (req, res) => {
    //code here for GET
    let good = false;
    try {
      idToOID(req.params.bandId);
      good = true;
    } catch (e) {
      res.status(400).json({ error: `${e}` });
    }

    if (good == true) {
      try {
        let allAlbumData = await albums.getAll(req.params.bandId);

        if (allAlbumData.length == 0) {
          throw new Error("this band does not have any albums");
        }

        res.status(200).json(allAlbumData);
      } catch (e) {
        res.status(400).json({ error: `${e}` });
      }
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let good = false;
    let good2 = false;
    try {
      idToOID(req.params.bandId);
      good = true;
    } catch (e) {
      res.status(400).json({ error: `${e}` });
    }
    if (good == true) {
      try {
        await bands.get(req.params.bandId);
        good2 = true;
      } catch (e) {
        res.status(404).json({ error: `${e}` });
      }
    }
    if (good2 == true) {
      // id is valid, band exists, rest are all 400 codes
      try {
        if (
          req.body.hasOwnProperty("title") &&
          req.body.hasOwnProperty("releaseDate") &&
          req.body.hasOwnProperty("tracks") &&
          req.body.hasOwnProperty("rating") &&
          Object.keys(req.body).length == 4
        ) {
          let errorCheck = await albumCreateError(
            req.params.bandId,
            req.body.title,
            req.body.releaseDate,
            req.body.tracks,
            req.body.rating
          );

          let bandId = errorCheck[0];
          let title = errorCheck[1];
          let releaseDate = errorCheck[2];
          let tracks = errorCheck[3];
          let rating = errorCheck[4];

          res
            .status(200)
            .json(
              await albums.create(bandId, title, releaseDate, tracks, rating)
            );
        } else {
          throw new Error("input JSON does not have the correct keys");
        }
      } catch (e) {
        res.status(400).json({ error: `${e}` });
      }
    }
  });

routerAlbums
  .route("/album/:albumId") // http://localhost:3000/albums/album/id_string
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });
