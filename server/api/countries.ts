import reports from "@/assets/reports.json";

export default defineEventHandler(() => {
  return {
    countries: getUniqueCountries(),
  };
});

function getUniqueCountries() {
  const uniqueCountries: string[] = [];
  for (let report of reports) {
    if (report.countryName && !uniqueCountries.includes(report.countryName)) {
      uniqueCountries.push(report.countryName);
    }
  }
  return uniqueCountries.sort();
}
