// I pledge my honor that I have abided by the Stevens Honor System.

import * as bands from "./data/bands.js";
import * as albums from "./data/albums.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

const db = await dbConnection();
await db.dropDatabase();


// Make bands and some albums

// Before anyone judges me, all ratings are just the first 2 digits of the duration (unless it is over 5.0)

// Black Sabbath
let blacksabbath;
try {
  blacksabbath = await bands.create(
    "Black Sabbath",
    ["Heavy Metal"],
    "http://www.blacksabbath.com",
    "Warner Records",
    ["Ozzy Osbourne", "Bill Ward", "Geezer Butler", "Tony Iommi"],
    1968
  );
  // console.log(blacksabbath);
} catch (e) {
  console.error(e);
}

let paranoid;
try {
  paranoid = await albums.create(
    blacksabbath._id.toString(),
    "Paranoid",
    "09/18/1970",
    [
      "War Pigs",
      "Paranoid",
      "Planet Caravan",
      "Iron Man",
      "Electric Funeral",
      "Hand of Doom",
      "Rat Salad",
      "Fairies Wear Boots",
    ],
    4.1
  );
  // console.log(paranoid);
} catch (e) {
  console.error(e);
}

let sabbathBloodySabbath;
try {
  sabbathBloodySabbath = await albums.create(
    blacksabbath._id.toString(),
    "Sabbath Bloody Sabbath",
    "11/02/1973",
    [
      "Sabbath Bloody Sabbath",
      "A National Acrobat",
      "Fluff",
      "Sabbra Cadabra",
      "Who Are You?",
      "Looking for Today",
      "Spiral Architect",
    ],
    4.2
  );
  // console.log(sabbathBloodySabbath);
} catch (e) {
  console.error(e);
}

let mobRules;
try {
  mobRules = await albums.create(
    blacksabbath._id.toString(),
    "Mob Rules",
    "11/04/1981",
    [
      "Turn Up the Night",
      "Voodoo",
      "The Sign of the Southern Cross",
      "E5150",
      "The Mob Rules",
      "Country Girl",
      "Slipping Away",
      "Falling Off the Edge of the World",
      "Over and Over",
    ],
    4.0
  );
  // console.log(mobRules);
} catch (e) {
  console.error(e);
}

// Journey
let journey;
try {
  journey = await bands.create(
    "Journey",
    ["Hard Rock", "Soft Rock", "Progressive Rock"],
    "http://www.journeymusic.com",
    "Columbia Records",
    [
      // too many to list all, these are the ones in R&R Hall of Fame
      "Steve Perry",
      "Neal Schon",
      "Jonathan Cain",
      "Gregg Rolie",
      "Ross Valory",
      "Aynsley Dunbar",
      "Steve Smith",
    ],
    1973
  );
  // console.log(journey);
} catch (e) {
  console.error(e);
}

let dreamAfterDream;
try {
  dreamAfterDream = await albums.create(
    journey._id.toString(),
    "Dream, After Dream",
    "12/10/1980",
    [
      "Destiny",
      "Snow Theme",
      "Sandcastles",
      "A Few Coins",
      "Moon Theme",
      "When the Love Has Gone",
      "Festival Dance",
      "The Rape",
      "Little Girl",
    ],
    3.5
  );
  // console.log(dreamAfterDream);
} catch (e) {
  console.error(e);
}

let escape;
try {
  escape = await albums.create(
    journey._id.toString(),
    "Escape",
    "07/31/1981",
    [
      "Don't Stop Believin'",
      "Stone in Love",
      "Who's Crying Now",
      "Keep On Runnin'",
      "Still They Ride",
      "Escape",
      "Lay It Down",
      "Dead or Alive",
      "Mother, Father",
      "Open Arms",
    ],
    4.2
  );
  // console.log(escape);
} catch (e) {
  console.error(e);
}

let frontiers;
try {
  frontiers = await albums.create(
    journey._id.toString(),
    "Frontiers",
    "02/01/1982",
    [
      "Separate Ways (Worlds Apart)",
      "Send Her My Love",
      "Chain Reaction",
      "After the Fall",
      "Faithfully",
      "Edge of the Blade",
      "Troubled Child",
      "Back Talk",
      "Frontiers",
      "Rubicon",
    ],
    4.4
  );
  // console.log(frontiers);
} catch (e) {
  console.error(e);
}

// The Who
let theWho;
try {
  theWho = await bands.create(
    "The Who",
    ["Hard Rock", "Rock", "Power Pop"],
    "http://www.thewho.com",
    "Polydor Records",
    ["Roger Daltrey", "Pete Townshend"],
    1964
  );
  // console.log(theWho);
} catch (e) {
  console.error(e);
}

let myGeneration;
try {
  myGeneration = await albums.create(
    theWho._id.toString(),
    "My Generation",
    "12/03/1965",
    [
      "Out in the Street",
      "I Don't Mind",
      "The Good's Gone",
      "La-La-La-Lies",
      "Much Too Much",
      "My Generation",
      "The Kids Are Alright",
      "Please, Please, Please",
      "It's Not True",
      "I'm a Man",
      "A Legal Matter",
      "The Ox",
    ],
    3.6
  );
  // console.log(myGeneration);
} catch (e) {
  console.error(e);
}

let whosNext;
try {
  whosNext = await albums.create(
    theWho._id.toString(),
    "Who's Next",
    "08/14/1971",
    [
      "Baba O'Riley",
      "Bargain",
      "Love Ain't for Keeping",
      "My Wife",
      "The Song Is Over",
      "Getting in Tune",
      "Going Mobile",
      "Behind Blue Eyes",
      "Won't Get Fooled Again",
    ],
    4.3
  );
  // console.log(whosNext);
} catch (e) {
  console.error(e);
}

let quadrophenia;
try {
  quadrophenia = await albums.create(
    theWho._id.toString(),
    "Quadrophenia",
    "10/26/1973",
    [
      "I Am the Sea",
      "The Real Me",
      "Quadrophenia",
      "Cut My Hair",
      "The Punk and the Godfather",
      "I'm One",
      "The Dirty Jobs",
      "Helpless Dancer",
      "Is It in My Head?",
      "I've Had Enough",
      "5:15",
      "Sea and Sand",
      "Drowned",
      "Bell Boy",
      "Doctor Jimmy",
      "The Rock",
      "Love, Reign o'er Me",
    ],
    4.2 // should be 8.1 but too high
  );
  // console.log(quadrophenia);
} catch (e) {
  console.error(e);
}

await closeConnection();