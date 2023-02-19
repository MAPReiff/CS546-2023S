import { ObjectId } from "mongodb";

let id = "507f1f77bcf86cd799439013";
// let obID = new ObjectId(id)

// console.log(obID.toString())



import { isURL, oIDChecker } from "../helpers.js"; // used to validate if website is a valid url


console.log(oIDChecker(id));
