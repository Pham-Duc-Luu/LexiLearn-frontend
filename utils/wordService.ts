import Fuse from "fuse.js";
import wordListJson from "@/public/dictionary_alpha_arrays.json";
import * as _ from "lodash";

// Step 1: Ensure wordListJson is an array
const ensureArray = (data: any) =>
  Array.isArray(data) ? data : Object.values(data);

// Step 2: Convert to uniform array and flatten
const wordListArray = _.flattenDeep(ensureArray(wordListJson));

// Use _.merge to merge the objects
const mergedObject = _.merge({}, ...wordListArray);

export const searchEnglishWords = (query: string) => {
  // Filter keys that start with the query and take the first 10
  return _.keys(mergedObject)
    .filter((key) => key.startsWith(query)) // Filter words starting with query
    .slice(0, 10); // Limit to the first 10
  return [];
};
