// I pledge my honor that I have abided by the Stevens Honor System.

// This file should import both data files and export them as shown in the lecture code

// I feel this is pointless... why not just import the files directly when needed rather than having this index file?
import * as albumFuncs from "./albums.js";
import * as bandFuncs from "./bands.js";

export const albums = albumFuncs;
export const bands = bandFuncs;
