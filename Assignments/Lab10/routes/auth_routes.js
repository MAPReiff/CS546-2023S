//import express, express router as shown in lecture code
import { Router } from "express";
import { checkName, checkEmail, checkPassword, checkRole } from "../helpers.js";
import { createUser, checkUser } from "../data/users.js";

export const router = Router();

router.route("/").get(
  // middleware 1
  (req, res, next) => {
    if (!req.session.user) {
      req.method = "GET";
      return res.redirect("/login");
    } else {
      if (req.session.user.role == "admin") {
        return res.redirect("/admin");
      } else if (req.session.user.role == "user") {
        return res.redirect("/protected");
      }
    }
    next(); // do i need this?
  },
  async (req, res) => {
    //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
    return res.json({ error: "YOU SHOULD NOT BE HERE!" });
  }
);

router
  .route("/register")
  .get(
    // middleware 3
    (req, res, next) => {
      if (req.session.user) {
        if (req.session.user.role == "admin") {
          return res.redirect("/admin");
        } else if (req.session.user.role == "user") {
          return res.redirect("/protected");
        }
      } else {
        req.method = "GET";
        next();
      }
    },
    async (req, res) => {
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
    }
  )
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
          throw new Error("unable to create user");
        }
      }
    } catch (e) {
      // render form with 400 code
      res.status(400).render("register", { title: "Register", error: `${e}` });
    }
  });

router
  .route("/login")
  .get(
    // middleware 2
    (req, res, next) => {
      if (req.session.user) {
        if (req.session.user.role == "admin") {
          return res.redirect("/admin");
        } else if (req.session.user.role == "user") {
          return res.redirect("/protected");
        }
      } else {
        req.method = "GET";
        next();
      }
    },
    async (req, res) => {
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
    }
  )
  .post(async (req, res) => {
    //code here for POST
    try {
      if (
        req.body.hasOwnProperty("emailAddressInput") &&
        req.body.hasOwnProperty("passwordInput")
      ) {
        let emailAddress = checkEmail(req.body["emailAddressInput"]);
        let password = checkPassword(req.body["passwordInput"]);

        let user = await checkUser(emailAddress, password);

        if (user) {
          req.session.user = user;

          if (user.role == "admin") {
            res.status(200).redirect("/admin");
          }
          if (user.role == "user") {
            res.status(200).redirect("/protected");
          }
        } else {
          throw new Error("unable to login");
        }
      }
    } catch (e) {
      res.status(400).render("login", { title: "Login", error: `${e}` });
    }
  });

router.route("/protected").get(
  //middleware 4
  (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    } else {
      next();
    }
  },
  async (req, res) => {
    //code here for GET
    try {
      if (req.session.user.role == "admin") {
        res.status(200).render("protected", {
          title: "Protected",
          user: req.session.user,
          currentTime: new Date().toLocaleTimeString(),
          admin: true,
        });
      } else if (req.session.user.role == "user") {
        res.status(200).render("protected", {
          title: "Protected",
          user: req.session.user,
          currentTime: new Date().toLocaleTimeString(),
        });
      }
    } catch (e) {
      res.status(500).render("error", {
        title: "Error",
        error: "internal server error",
        code: "500",
      });
    }
    // res.json({ message: "You are logged in!" });
  }
);

router.route("/admin").get(
  // middleware 5
  (req, res, next) => {
    if (!req.session.user) {
      req.method = "GET";
      return res.redirect("/login");
    } else {
      if (req.session.user.role == "user") {
        return res.redirect("/error");
      }
      if (req.session.user.role == "admin") {
        req.method = "GET";
        next();
      }
    }
  },
  async (req, res) => {
    try {
      res.render("admin", {
        title: "Admin",
        user: req.session.user,
        currentTime: new Date().toLocaleTimeString(),
      });
    } catch (e) {
      res.status(500).render("error", {
        title: "Error",
        error: "internal server error",
        code: "500",
      });
    }
    //code here for GET
  }
);

router.route("/error").get(async (req, res) => {
  //code here for GET
  try {
    res.status(403).render("error", {
      title: "Error",
      error: "you are not authorized to view this page",
      code: "403",
    });
  } catch (e) {
    res.status(500).render("error", {
      title: "Error",
      error: "internal server error",
      code: "500",
    });
  }
});

router.route("/logout").get(
  //middleware 6
  (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    } else {
      next();
    }
  },
  async (req, res) => {
    //code here for GET
    req.session.destroy();
    res.status(200).render("logout", { title: "Logout" });
  }
);
