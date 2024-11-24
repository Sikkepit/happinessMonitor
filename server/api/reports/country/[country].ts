import reports from "@/assets/reports.json";

export default eventHandler(async (event) => {
  const { country } = event.context.params as { country: string };

  return {
    reports: reports.filter(
      (report) => report[countryName].toLowerCase() === country.toLowerCase()
    ),
  };
});
