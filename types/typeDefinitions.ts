export interface CountryData {
  countryName: string;
  year: number;
  lifeLadder: number;
  logGDPPerCapita: number;
  socialSupport: number;
  healthyLifeExpectancyAtBirth: number;
  freedomToMakeLifeChoices: number;
  Generosity: number;
  perceptionsOfCorruption: number;
  positiveAffect: number;
  negativeAffect: number;
}

export interface RangesData {
  countryName: RangeObject;
  year: RangeObject;
  lifeLadder: RangeObject;
  logGDPPerCapita: RangeObject;
  socialSupport: RangeObject;
  healthyLifeExpectancyAtBirth: RangeObject;
  freedomToMakeLifeChoices: RangeObject;
  Generosity: RangeObject;
  perceptionsOfCorruption: RangeObject;
  positiveAffect: RangeObject;
  negativeAffect: RangeObject;
}

export interface RangeObject {
  min: any;
  max: any;
}
