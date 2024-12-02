import { describe, expect, test } from "vitest";
import * as day01Utils from "./day01-utils.js";

describe("countMatches", () => {
  const rightList = [3, 3, 3, 4, 5, 9];

  test("should return 0 given no matches", () => {
    // when
    const result = day01Utils.countMatches(1, rightList, 0);

    // then
    expect(result.count).to.equal(0);
    expect(result.rightListIndex).to.equal(0);
  });

  test("should return correct match count when searching entire list", () => {
    // when
    const result = day01Utils.countMatches(3, rightList, 0);

    // then
    expect(result.count).to.equal(3);
    expect(result.rightListIndex).to.equal(3);
  });

  test("should not count previous elements when searching partial list", () => {
    // when
    const result = day01Utils.countMatches(3, rightList, 3);

    // then
    expect(result.count).to.equal(0);
    expect(result.rightListIndex).to.equal(3);
  });
});
