import reports from "@/assets/reports.json";

export default eventHandler(async (event) => {
  const { year } = event.context.params as { year: string };

  return {
    reports: reports.filter((report) => report.year === parseInt(year)),
  };
});
