export interface Matches {
  count: number;
  rightListIndex: number;
}

/**
 * Count the number of times `leftListValue` appears in `rightList`
 *
 * @param leftListValue value to search for
 * @param rightList list to search in
 * @param rightListIndex index to start searching at
 * @returns the number of matches (`count`) and the index to resume counting at (`rightListIndex`)
 */
export const countMatches = (
  leftListValue: number,
  rightList: Array<number>,
  rightListIndex: number
): Matches => {
  let matchCount = 0;
  while (rightList[rightListIndex] <= leftListValue) {
    const rightValue = rightList[rightListIndex];
    if (leftListValue === rightValue) {
      matchCount++;
    }
    rightListIndex++;
  }
  return { count: matchCount, rightListIndex };
};
