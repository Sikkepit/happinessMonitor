import reports from "@/assets/reports.json";

export default defineEventHandler(() => {
  return {
    reports: reports,
  };
});
