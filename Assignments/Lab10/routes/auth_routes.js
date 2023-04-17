//import express, express router as shown in lecture code
import { Router } from "express";
export const router = Router();

router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
    //code here for GET
    try {
      res.status(200).render("register", { title: "Register" });
    } catch (e) {
      res
        .status(500)
        .render("error", {
          title: "Error",
          error: "internal server error",
          code: "500",
        });
    }
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    try {
      res.status(200).render("login", { title: "Login" });
    } catch (e) {
      res
        .status(500)
        .render("error", {
          title: "Error",
          error: "internal server error",
          code: "500",
        });
    }
  })
  .post(async (req, res) => {
    //code here for POST
  });

router.route("/protected").get(async (req, res) => {
  //code here for GET
});

router.route("/admin").get(async (req, res) => {
  //code here for GET
});

router.route("/error").get(async (req, res) => {
  //code here for GET
});

router.route("/logout").get(async (req, res) => {
  //code here for GET
});
