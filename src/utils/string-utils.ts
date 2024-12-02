const horizontalWhitespace = /[\t ]+/;

/**
 * Split text into lines, trim leading and trailing whitespace, and remove blank lines.
 * @param input multiline text
 * @returns list of resulting rows
 */
function toTrimmedNonEmptyLineList(input: string): Array<string> {
  return input
    .split("\n")
    .map((row) => row.trim())
    .filter((row) => typeof row === "string" && row.length > 0);
}

/**
 * Convert whitespace-delimited lines of text into a list of columns.
 */
export function columnarLinesToLists<T>(
  input: string,
  parseValue: (value: string) => T
): Array<Array<T>> {
  const listOfRows = toTrimmedNonEmptyLineList(input);
  const columnCount = listOfRows[0]?.split(horizontalWhitespace)?.length ?? 0;

  return listOfRows.reduce((columns, line, rowIdx) => {
    line.split(horizontalWhitespace).forEach((value, columnIdx) => {
      columns[columnIdx][rowIdx] = parseValue(value);
    });
    return columns;
  }, Array.from({ length: columnCount }, Array) as Array<Array<T>>);
}
