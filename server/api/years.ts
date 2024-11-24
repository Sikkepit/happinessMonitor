import reports from "@/assets/reports.json";

export default defineEventHandler(() => {
  return {
    years: getUniqueYears(),
  };
});

function getUniqueYears() {
  const uniqueYears: number[] = [];
  for (let report of reports) {
    if (report.year && !uniqueYears.includes(report.year)) {
      uniqueYears.push(report.year);
    }
  }
  return uniqueYears.sort().reverse();
}
