//import express, express router as shown in lecture code
import { Router } from "express";
import { checkName, checkEmail, checkPassword, checkRole } from "../helpers.js";
import { createUser, checkUser } from "../data/users.js";

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
      res.status(500).render("error", {
        title: "Error",
        error: "internal server error",
        code: "500",
      });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    // console.log(req.body);
    try {
      if (
        req.body.hasOwnProperty("firstNameInput") &&
        req.body.hasOwnProperty("lastNameInput") &&
        req.body.hasOwnProperty("emailAddressInput") &&
        req.body.hasOwnProperty("passwordInput") &&
        req.body.hasOwnProperty("confirmPasswordInput") &&
        req.body.hasOwnProperty("roleInput")
      ) {
        let firstName = checkName(req.body["firstNameInput"], "first name");
        let lastName = checkName(req.body["lastNameInput"], "last name");
        let emailAddress = checkEmail(req.body["emailAddressInput"]);
        let password = checkPassword(req.body["passwordInput"]);
        if (password != req.body["confirmPasswordInput"]) {
          throw new Error("your passwords do not match");
        }
        let role = checkRole(req.body["roleInput"]);

        let user = await createUser(
          firstName,
          lastName,
          emailAddress,
          password,
          role
        );

        if (
          user.hasOwnProperty("insertedUser") &&
          user["insertedUser"] == true
        ) {
          // res.status(200).render("login", { title: "Login" });
          res.status(200).redirect("/login");
        } else {
          throw new Error("unable to create user")
        }
      }
    } catch (e) {
      // render form with 400 code
      res.status(400).render("register", {title: "Register", error: `${e}`});
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    //code here for GET
    try {
      res.status(200).render("login", { title: "Login" });
    } catch (e) {
      res.status(500).render("error", {
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
