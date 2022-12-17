import type { Commune } from "./commune";

export interface SearchSaleQuery {
  budgetRange: number[];
  batiRange: number[];
  terrainRange: number[];
  commune: Commune;
  anneeRange: number[];
  favorite: number; // 0 false, 1 true
}
