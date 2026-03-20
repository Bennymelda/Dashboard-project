// src/api/serverStore.ts
import type { ServerStoreType } from "../types";

const STORAGE_KEY = "kanbanServerStore";

// Load store from localStorage or initialize empty
const loadServerStore = (): ServerStoreType => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {
        boards: {},
        columns: {},
        cards: {},
        comments:{},
        cardComments:{},
        lastUpdated: Date.now(),
      };
    }
  }
  return {
    boards: {},
    columns: {},
    cards: {},
    comments:{},
   cardComments:{},
    lastUpdated: Date.now(),
  };
};

export const serverStore: ServerStoreType = loadServerStore();

// Helper to persist changes
export const saveServerStore = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serverStore));
};