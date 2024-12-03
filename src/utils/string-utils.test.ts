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

  test.prop([
    fc.stringMatching(/^([\t ]*\d{1,5} \d{1,5} \d{1,5}[\t ]*\n){1,10}$/),
  ])("should split three-column data into 3 lists", (input) => {
    return stringUtils.columnarLinesToLists(input, String).length === 3;
  });

  test.prop([fc.stringMatching(/^([\t ]*\d{1,5} \d{1,5}[\t ]*\n){100}$/)])(
    "should split columnar data into lists with length equal to row count",
    (input) => {
      return stringUtils
        .columnarLinesToLists(input, String)
        .every((_) => _.length === 100);
    }
  );
});

describe("rowsToLists", () => {
  test.prop([fc.stringMatching(/^(([\t ]*\d{1,5}[\t ]+){1,10}\n){5}$/)])(
    "should split five rows of data into 5 lists",
    (input) => {
      return stringUtils.rowsToLists(input, String).length === 5;
    }
  );

  test.prop([fc.stringMatching(/^(([\t ]*\d{1,5}[\t ]+){1,10}\n){11}$/)])(
    "should split eleven rows of data into 11 lists",
    (input) => {
      return stringUtils.rowsToLists(input, String).length === 11;
    }
  );

  test.prop([fc.stringMatching(/^(\d{1,5}[\t ]+){3}\n(\d{1,5}[\t ]+){5}\n$/)])(
    "should split rows into lists with varying column counts",
    (input) => {
      // when
      const result = stringUtils.rowsToLists(input, String);

      // then
      return (
        result.length === 2 && result[0].length === 3 && result[1].length === 5
      );
    }
  );
});
