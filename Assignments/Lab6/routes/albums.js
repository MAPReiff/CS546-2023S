// I pledge my honor that I have abided by the Stevens Honor System.

// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import { Router } from "express";
export const routerAlbums = Router();

routerAlbums
  .route('/:bandId') // http://localhost:3000/albums/id_string
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

  routerAlbums
  .route('/album/:albumId') // http://localhost:3000/albums/album/id_string
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });
