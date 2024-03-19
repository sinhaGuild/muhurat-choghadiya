import { create } from "zustand";
import {OutputStore} from '@/types/store-types'

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "http://localhost:3000/api";


export const useChStore = create<OutputStore>((set) => ({
    output: null,
    history: [],
    allAnalytics: [],
    autocompleteResults: [],
    fetchPredictions: async () => {
        try {
          const response = await fetch(`${URL}/history`, {
            method: 'GET',
            credentials: 'include'
          });
          // const response = await fetch(`http://127.0.0.1:8000/api/history`);
          const history = await response.json();
          set({ history });
        } catch (error) {
          console.error("Error fetching history:", error);
        }
      },
    fetchPrediction: async (input) => {
      try {
        const response = await fetch(`${URL}/legacy/owm3/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
            credentials: 'include'
          });
        // const response = await fetch(`${URL}/api/pyowm/`);
        const prediction = await response.json();
        set({ output: prediction });
        set((state) => ({ history: [...state.history, prediction] }));
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    },
    fetchPredictionGranular: async (input) => {
      try {
        const response = await fetch(`${URL}/owm4/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
            credentials: 'include'
          });
        // const response = await fetch(`${URL}/api/pyowm/`);
        const prediction = await response.json();
        set({ output: prediction });
        set((state) => ({ history: [...state.history, prediction] }));
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    },
    fetchAnalytics: async () => {
      try {
        const response = await fetch(`${URL}/data`, {
          method: 'GET',
          credentials: 'include'
        });
        const allAnalytics = await response.json();
        set({ allAnalytics });
      } catch (error) {
        console.error("Error fetching Analytics Data:", error);
      }
    },
    resetPredictions: async () => {
      try {
        const response = await fetch(`${URL}/history/delete`, {
          method: 'GET',
          credentials: 'include'
        });
        const res = await response.json();
        set((state) => ({
          history: state.history.splice(0, state.history.length)
        }));
      } catch (error) {
        console.error("Error resetting history:", error);
      }
    },
    resetAnalytics: async () => {
        try {
          const response = await fetch(`${URL}/data/delete`, {
            method: 'GET',
            credentials: 'include'
          });
          const res = await response.json();
          set((state) => ({
            allAnalytics: state.allAnalytics.splice(0, state.allAnalytics.length)
          }));
        } catch (error) {
          console.error("Error resetting analytics:", error);
        }
    },
    fetchAutocomplete: async (city) => {
      try {
        const response = await fetch(`${URL}/autocomplete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"city": city}),
            credentials: 'include'
          });
        // const response = await fetch(`${URL}/api/pyowm/`);
        const autocompleteResults = await response.json();
        set({ autocompleteResults: autocompleteResults });
      } catch (error) {
        console.error("Error fetching autocomplete results:", error);
      }
    }
  }));
  
