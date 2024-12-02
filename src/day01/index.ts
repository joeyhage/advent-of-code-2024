import run from "aocrunner";
import * as stringUtils from "../utils/string-utils.js";
import * as day01Utils from "./day01-utils.js";

const parseInput = (rawInput: string) =>
  stringUtils.columnarLinesToLists(rawInput, parseInt);

const part1 = (rawInput: string) => {
  const [leftList, rightList] = parseInput(rawInput);
  leftList.sort();
  rightList.sort();

  return leftList.reduce((totalDistance, currentValue, idx) => {
    return totalDistance + Math.abs(currentValue - rightList[idx]);
  }, 0);
};

const part2 = (rawInput: string) => {
  const [leftList, rightList] = parseInput(rawInput);

  // Sorting the lists to reduce # of loop iterations
  leftList.sort();
  rightList.sort();

  // Since lists are sorted, each iteration on leftList can resume iterating at the same index in rightList
  let rightListIndex = 0;

  let individualSimilarity = 0;

  return leftList.reduce((totalSimilarity, currentValue, idx) => {
    // If leftList has consecutive values that are the same, subsequent iterations can
    // simply add the same similarity score to the total
    if (idx > 0 && currentValue === leftList[idx - 1]) {
      return totalSimilarity + individualSimilarity;
    }

    const matches = day01Utils.countMatches(currentValue, rightList, rightListIndex);
    rightListIndex = matches.rightListIndex;
    individualSimilarity = currentValue * matches.count;

    return totalSimilarity + individualSimilarity;
  }, 0);
};

run({
  part1: {
    tests: [],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3
        `,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
