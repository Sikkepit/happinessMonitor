import reports from "@/assets/reports.json";

export default defineEventHandler(() => {
  return {
    ranges: getRanges(),
  };
});

function getKeyValues(objectVariable: object) {
  const keyValues: string[] = [];
  for (const [key] of Object.entries(objectVariable)) {
    keyValues.push(key);
  }
  return keyValues;
}

function getValueArraysForKeys() {
  const keyValues = getKeyValues(reports[0]);
  const keyValueObject = {};
  for (let report of reports) {
    for (let keyValue of keyValues) {
      if (report[keyValue]) {
        if (!keyValueObject[keyValue]) {
          keyValueObject[keyValue] = [report[keyValue]];
        } else {
          keyValueObject[keyValue].push(report[keyValue]);
        }
      }
    }
  }
  return keyValueObject;
}

function sortValueArrays() {
  const ranges = getValueArraysForKeys();
  for (const [key] of Object.entries(ranges)) {
    ranges[key].sort(function (a, b) {
      return a - b;
    });
  }
  return ranges;
}

function getRanges() {
  const sortedRanges = sortValueArrays();
  const responseArray = {};
  for (const [key] of Object.entries(sortedRanges)) {
    const lastindex = sortedRanges[key].length - 1;
    const highestValue = sortedRanges[key][lastindex];
    const lowestValue = sortedRanges[key][0];
    //   responseArray.push(key { from: lowestValue, to: highestValue});
    responseArray[key] = { min: lowestValue, max: highestValue };
  }
  return responseArray;
}
