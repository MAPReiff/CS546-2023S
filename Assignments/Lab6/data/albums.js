// This data file should export all functions using the ES6 standard as shown in the lecture code

import { oIDChecker, idToOID } from "../helpers.js";
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import validateDate from "validate-date";


const create = async (
  bandId,
  title,
  releaseDate,
  tracks,
  rating
) => {};

const getAll = async (bandId) => {};

const get = async (albumId) => {};

const remove = async (albumId) => {};
