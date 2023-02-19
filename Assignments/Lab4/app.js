import * as bands from "./data/bands.js";
import { closeConnection } from "./config/mongoConnection.js";

// 1. Create a band of your choice.
// 2. Log the newly created band. (Just that band, not all bands)
let band1;
try {
  band1 = await bands.create(
    "Black Sabbath",
    ["Heavy Metal"],
    "http://www.blacksabbath.com",
    "Warner Records",
    ["Ozzy Osbourne", "Bill Ward", "Geezer Butler", "Tony Iommi"],
    1968
  );
  console.log(band1);
} catch (e) {
  console.error(e);
}

// 3. Create another band of your choice.
let band2;
try {
  band2 = await bands.create(
    "Journey",
    ["Hard Rock", "Soft Rock", "Progressive Rock"],
    "http://www.journeymusic.com", // lol seems their website is down at the time of writing this
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
  // console.log(band2); // not asked to print this one
} catch (e) {
  console.error(e);
}

// 4. Query all bands, and log them all
try {
  console.log(await bands.getAll());
} catch (e) {
  console.error(e);
}

// 5. Create the 3rd band of your choice.
// 6. Log the newly created 3rd band. (Just that band, not all bands)
let band3;
try {
  band3 = await bands.create(
    "The Who",
    ["Hard Rock", "Rock", "Power Pop"],
    "http://www.thewho.com",
    "Polydor Records",
    [
      // these 2 are the only ones still active; saw them live last year it was awesome
      "Roger Daltrey",
      "Pete Townshend",
    ],
    1964
  );
  console.log(band3);
} catch (e) {
  console.error(e);
}

// 7. Rename the first band
try {
  await bands.rename(band1._id.toString(), "Ozzy and the Boys");
} catch (e) {
  console.error(e);
}

// 8. Log the first band with the updated name.
try {
  band1 = await bands.get(band1._id.toString());
  console.log(band1);
} catch (e) {
  console.error(e);
}

// 9. Remove the second band you created.
try {
  await bands.remove(band2._id.toString());
} catch (e) {
  console.error(e);
}

// 10. Query all bands, and log them all
try {
  console.log(await bands.getAll());
} catch (e) {
  console.error(e);
}

// 11. Try to create a band with bad input parameters to make sure it throws errors.
try {
  await bands.create(
    "Dio",
    ["Heavy Metal"],
    "http://www.ronniejamesdio.com",
    "Eagle",
    "Ronnie James Dio, Craig Goldy, Rudy Sarzo, Simon Wright, Scott Warren", // this is supposed to be an array of strings!
    1982
  );
} catch (e) {
  console.error(e);
}

// 12. Try to remove a band that does not exist to make sure it throws errors.
try {
  await bands.remove(band2._id.toString()); // we already deleted band 2 so we know it does not exist anymore with that ID
} catch (e) {
  console.error(e);
}

// 13. Try to rename a band that does not exist to make sure it throws errors.
try {
  await bands.rename(band2._id.toString(), "Adventure"); // we already deleted band 2 so we know it does not exist anymore with that ID
} catch (e) {
  console.error(e);
}

// 14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
try {
  await bands.rename(band1._id.toString(), ["Ozzy's Mates"]); // 2nd param should be a string
} catch (e) {
  console.error(e);
}

// 15. Try getting a band by ID that does not exist to make sure it throws errors.
try {
  await bands.get(band2._id.toString());
} catch (e) {
  console.error(e);
}

await closeConnection();
