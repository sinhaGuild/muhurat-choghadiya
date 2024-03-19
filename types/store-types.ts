
export type Output = {   
    date: string
    metadata: {}
    predictions: []
    createdAt: string
}

export type Input = {
    date: string
    city: string
}

export type InputGranular = {
  city: string
  lat: number
  lon: number
  date: string
}

export type AutocompleteResponse = {
  city: string
  lat: number
  lon: number
}

export type OutputStoreState = {
  output: Output | null;
  history: Output[];
  allAnalytics: AnalyticsData[];
  autocompleteResults: AutocompleteResponse[];
}

export type OutputStoreActions = {
  fetchPredictions: () => void;
  fetchPrediction: (input: Input) => void;
  fetchPredictionGranular: (input: InputGranular) => void;
  fetchAnalytics: () => void,
  resetPredictions: () => void;
  resetAnalytics: () => void;
  fetchAutocomplete: (city: string) => void;
}

export type OutputStore = OutputStoreState & OutputStoreActions

export type AnalyticsData = {
    name: string
    amrit: number
    kaal_ratri: number
    total_muh: number
    total_rahu: number
    total_dri: number
    cnt_muh: number
    cnt_rahus: number
    cnt_dri: number
}