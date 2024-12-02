import { describe } from "node:test";
import * as stringUtils from "./string-utils.js";

import { fc, test } from "@fast-check/vitest";

describe("columnarLinesToLists", () => {

  test.prop([fc.stringMatching(/^([\t ]*\d{1,5} \d{1,5}[\t ]*\n){1,10}$/)])(
    "should split two-column data into 2 lists",
    (input) => {
      return stringUtils.columnarLinesToLists(input, String).length === 2;
    }
  );

  test.prop([fc.stringMatching(/^([\t ]*\d{1,5} \d{1,5} \d{1,5}[\t ]*\n){1,10}$/)])(
    "should split three-column data into 3 lists",
    (input) => {
      return stringUtils.columnarLinesToLists(input, String).length === 3;
    }
  );

  test.prop([fc.stringMatching(/^([\t ]*\d{1,5} \d{1,5}[\t ]*\n){100}$/)])(
    "should split columnar data into lists with length equal to row count",
    (input) => {
      return stringUtils.columnarLinesToLists(input, String).every((_) => _.length === 100);
    }
  );
});
