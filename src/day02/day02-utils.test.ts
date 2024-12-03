import { describe, expect, test } from "vitest";
import * as day02Utils from "./day02-utils.js";

describe("areListSiblingsWithinDistance", () => {
  test("should return true when all same number and distance must be 0", () => {
    // given
    const values = [1, 1];

    // when
    const result = day02Utils.areListSiblingsWithinDistance(values, 0, 0);

    // then
    expect(result).to.be.true;
  });

  test("should return true when consistent distance", () => {
    // given
    const values = [1, 2, 3, 4, 5];

    // when
    const result = day02Utils.areListSiblingsWithinDistance(values, 1, 1);

    // then
    expect(result).to.be.true;
  });
});

describe("hasConsistentChangeDirection", () => {
  test("should compare direction as numbers", () => {
    // given
    const values = [21, 18, 17, 15, 14, 12, 10, 9];

    // when
    const result = day02Utils.hasConsistentChangeDirection(values);

    // then
    expect(result).to.be.true;
  });
});
