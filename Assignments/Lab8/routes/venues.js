// I pledge my honor that I have abided by the Stevens Honor System.

//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes

import { Router } from "express";
import { searchVenues } from "../helpers.js";
export const routerVenues = Router();

routerVenues.route("/").get(async (req, res) => {
  //code here for GET
  res.status(200).render("homepage", { title: "Venue Finder", red: "blue" });
});

routerVenues.route("/searchvenues").post(async (req, res) => {
  //code here for POST
  let valid = false;
  try {
    if (
      !req.body.searchVenueTerm ||
      req.body.searchVenueTerm.replaceAll(" ", "") == ""
    ) {
      throw new Error("no search term was provided.");
    }

    let searchVenueTerm = req.body.searchVenueTerm.trim();

    let venueList = await searchVenues(searchVenueTerm);

    let venues = [];
    if (venueList.data.page.totalElements != 0) {
      // console.log(venueList.data._embedded.venues[0].name)
      let count;
      if (venueList.data.page.totalElements >= 10) {
        count = 10;
      } else {
        count = venueList.data.page.totalElements;
      }

      for (let i = 0; i < count; i++) {
        venues.push({
          name: venueList.data._embedded.venues[i].name,
          id: venueList.data._embedded.venues[i].id,
        });
      }
    }

    res.status(200).render("venueSearchResults", {
      title: "Venues Found",
      searchVenueTerm: searchVenueTerm,
      venues: venues,
    });
  } catch (e) {
    res.status(400).render("error", { title: "Error", error: e });
  }
});

routerVenues.route("/venuedetails/:id").get(async (req, res) => {
  //code here for GET
});
