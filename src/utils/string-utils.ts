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

function countColumns(listOfRows: string[]) {
  return listOfRows[0]?.split(horizontalWhitespace)?.length ?? 0;
}

/**
 * Convert whitespace-delimited lines of text into a list of rows.
 */
export function rowsToLists<T>(
  input: string,
  valueParser: (value: string) => T
): Array<Array<T>> {
  const listOfRows = toTrimmedNonEmptyLineList(input);

  return listOfRows.reduce((columns, line, rowIdx) => {
    line.split(horizontalWhitespace).forEach((value, columnIdx) => {
      columns[rowIdx][columnIdx] = valueParser(value);
    });
    return columns;
  }, Array.from({ length: listOfRows.length }, Array) as Array<Array<T>>);
}

/**
 * Convert whitespace-delimited lines of text into a list of columns.
 */
export function columnarLinesToLists<T>(
  input: string,
  valueParser: (value: string) => T
): Array<Array<T>> {
  const listOfRows = toTrimmedNonEmptyLineList(input);
  const columnCount = countColumns(listOfRows);

  return listOfRows.reduce((columns, line, rowIdx) => {
    line.split(horizontalWhitespace).forEach((value, columnIdx) => {
      columns[columnIdx][rowIdx] = valueParser(value);
    });
    return columns;
  }, Array.from({ length: columnCount }, Array) as Array<Array<T>>);
}
