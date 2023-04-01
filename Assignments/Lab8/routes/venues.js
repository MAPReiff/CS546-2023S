// I pledge my honor that I have abided by the Stevens Honor System.

//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes

import { Router } from "express";
import { searchVenues, getVenue } from "../helpers.js";
export const routerVenues = Router();

routerVenues.route("/").get(async (req, res) => {
  //code here for GET
  res.status(200).render("homepage", { title: "Venue Finder"});
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
  try {
    let venueData = await getVenue(req.params.id);
    venueData = venueData.data
    let venue = {};

    if (venueData.errors) {
      throw new Error(`no venue with the ID ${req.params.id} could be found.`);
    }

    if (venueData.name) {
      venue.name = venueData.name;
    } else {
      venue.name = "N/A";
    }

    if (venueData.images) {
      venue.image = venueData.images[0].url;
    } else {
      venue.image = "/public/images/No_Image_Available.jpg";
    }

    if (venueData.url) {
      venue.url = venueData.url;
    } else {
      venue.url = "N/A";
    }

    if (venueData.address && venueData.address.line1) {
      venue.address = venueData.address.line1;
    } else {
      venue.address = "N/A";
    }

    if (venueData.city && venueData.city.name) {
      venue.city = venueData.city.name;
    } else {
      venue.city = "N/A";
    }

    if (venueData.state && venueData.state.stateCode) {
      venue.state = venueData.state.stateCode;
    } else {
      venue.state = "N/A";
    }

    if (venueData.postalCode) {
      venue.postalCode = venueData.postalCode;
    } else {
      venue.postalCode = "N/A";
    }

    if (venueData.boxOfficeInfo && venueData.boxOfficeInfo.phoneNumberDetail) {
      venue.phone = venueData.boxOfficeInfo.phoneNumberDetail;
    } else {
      venue.phone = "N/A";
    }

    res.status(200).render("venueByID", {title: "Venue Details", venue: venue});
  } catch (e) {
    res.status(400).render("error", { title: "Error", error: e });
  }
});
