<script setup lang="ts">
import type { CountryData, RangesData } from "~/types/typeDefinitions";

const { data: years } = await useFetch("/api/years");
const { data: countries } = await useFetch("/api/countries");
const { data: reports } = await useFetch("/api/reports");
const { data: ranges } = await useFetch("/api/ranges");

const selectedCountry: Ref<string[]> = ref([]);
const selectedYear: Ref<number[]> = ref([]);
const lifeLadder: Ref<number> = ref(
  Math.ceil((ranges?.value?.ranges as RangesData)?.lifeLadder?.max)
);
const filteredReports = computed(() => {
  const returnObject: CountryData[] = [];
  reports.value?.reports.map((report) => {
    const hasYear =
      selectedYear.value.includes(report.year) ||
      selectedYear.value.length === 0;
    const hasCountry =
      selectedCountry.value.includes(report.countryName) ||
      selectedCountry.value.length === 0;
    const hasLifeLadder = report.lifeLadder < lifeLadder.value;

    if (hasYear && hasCountry && hasLifeLadder) {
      returnObject.push(report as any);
    }
  });
  return returnObject;
});

function handleClick(refVariable: any[], newValue: any) {
  if (!refVariable.includes(newValue)) {
    refVariable.push(newValue);
  }
}

function handleDelete(refVariable: any[], oldValue: any) {
  const index: number = refVariable.indexOf(oldValue);
  refVariable.splice(index, 1);
}
</script>
<template>
  <div class="page-header">
    <h1 class="text-4xl">World Happiness Monitor</h1>
    <span class="font-medium">World Happiness Report from 2005-2024</span>
    <div class="min-h-12">
      <ul class="flex gap-5 flex-wrap">
        <li v-for="country in selectedCountry">
          {{ country }}
          <button @click="handleDelete(selectedCountry, country)">X</button>
        </li>
      </ul>

      <ul class="flex gap-5 flex-wrap">
        <li v-for="year in selectedYear">
          {{ year }}
          <button @click="handleDelete(selectedYear, year)">X</button>
        </li>
      </ul>
    </div>

    <div class="py-5 flex gap-2">
      <select v-if="countries">
        <option value="" @click="selectedCountry = []">All countries</option>
        <option
          v-for="country in countries.countries"
          :key="country"
          :value="country"
          @click="handleClick(selectedCountry, country)"
        >
          {{ country }}
        </option>
      </select>

      <select v-if="years">
        <option value="" @click="selectedYear = []">All years</option>
        <option
          v-for="year in years.years"
          :key="year"
          :value="year"
          @click="handleClick(selectedYear, year)"
        >
          {{ year }}
        </option>
      </select>
      {{ lifeLadder }}
      lifeLadder:
      <input
        v-model="lifeLadder"
        type="range"
        :min="Math.floor((ranges?.ranges as RangesData)?.lifeLadder?.min)"
        :max="Math.ceil((ranges?.ranges as RangesData)?.lifeLadder?.max)"
        :step="
          (Math.ceil((ranges?.ranges as RangesData)?.lifeLadder?.max) -
            Math.floor((ranges?.ranges as RangesData)?.lifeLadder?.min)) /
          25
        "
      />
      >
    </div>
  </div>
  <div v-if="filteredReports.length === 0">
    There are no results for your current filters
  </div>

  <div v-else class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
    <div
      v-for="report in filteredReports"
      class="flex flex-col p-5 border border-solid border-indigo-600"
    >
      <span>Name: {{ report.countryName }}</span>
      <span>Year: {{ report.year }}</span>
      <span>lifeLadder: {{ report.lifeLadder }}</span>
      <span>Log GDP per capita: {{ report.logGDPPerCapita }}</span>
      <span>Social support: {{ report.socialSupport }}</span>
      <span
        >Healthy life expectancy at birth:
        {{ report.healthyLifeExpectancyAtBirth }}</span
      >
      <span
        >Freedom to make life choices:
        {{ report.freedomToMakeLifeChoices }}</span
      >
      <span>Generosity: {{ report.Generosity }}</span>
      <span
        >Perceptions of corruption: {{ report.perceptionsOfCorruption }}</span
      >
      <span>Positive affect: {{ report.positiveAffect }}</span>
      <span>Negative affect: {{ report.negativeAffect }}</span>
    </div>
  </div>
</template>
