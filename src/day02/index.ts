import run from "aocrunner";
import * as stringUtils from "../utils/string-utils.js";
import * as day02Utils from "./day02-utils.js";

const parseInput = (rawInput: string) =>
  stringUtils.rowsToLists(rawInput, parseInt);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const startingCount = 0;

  return input.reduce((safeReportCount, currentReport) => {
    const hasConsistentChangeDirection =
      day02Utils.hasConsistentChangeDirection(currentReport);

    let isGraduallyChanging = undefined;
    if (hasConsistentChangeDirection) {
      isGraduallyChanging = day02Utils.areListSiblingsWithinDistance(
        currentReport,
        1,
        3
      );
    }
    return hasConsistentChangeDirection && isGraduallyChanging
      ? safeReportCount + 1
      : safeReportCount;
  }, startingCount);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const startingCount = 0;

  return input.reduce((safeReportCount, currentReport) => {
    let possibleTolerableReports: Array<Array<number>> = [currentReport];
    for (let i = 0; i < currentReport.length; i++) {
      possibleTolerableReports.push([
        ...currentReport.slice(0, i),
        ...currentReport.slice(i + 1),
      ]);
    }
    const isTolerable = possibleTolerableReports.some((report) => {
      const hasConsistentChangeDirection =
        day02Utils.hasConsistentChangeDirection(report);

      let isGraduallyChanging = undefined;
      if (hasConsistentChangeDirection) {
        isGraduallyChanging = day02Utils.areListSiblingsWithinDistance(
          report,
          1,
          3
        );
      }
      return hasConsistentChangeDirection && isGraduallyChanging;
    });

    return isTolerable ? safeReportCount + 1 : safeReportCount;
  }, startingCount);
};

run({
  part1: {
    tests: [
      {
        name: "should be safe when all decreasing",
        input: `
          7 6 4 2 1
        `,
        expected: 1,
      },
      {
        name: "should be safe when all increasing",
        input: `
          1 3 6 7 9
        `,
        expected: 1,
      },
      {
        name: "should be unsafe when no change in level",
        input: `
          7 6 4 4 1
        `,
        expected: 0,
      },
      {
        name: "should be unsafe when level increases by 5",
        input: `
          1 2 7 8 9
        `,
        expected: 0,
      },
      {
        name: "should be unsafe when level decreases by 4",
        input: `
          9 7 6 2 1
        `,
        expected: 0,
      },
      {
        name: "should be unsafe when both increasing and decreasing",
        input: `
          1 3 2 4 5
        `,
        expected: 0,
      },
      {
        name: "Day 2 example",
        input: `
          7 6 4 2 1
          1 2 7 8 9
          9 7 6 2 1
          1 3 2 4 5
          8 6 4 4 1
          1 3 6 7 9
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
