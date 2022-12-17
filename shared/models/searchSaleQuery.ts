import type { Commune } from "./commune";

export interface SearchSaleQuery {
  budgetRange: number[];
  batiRange: number[];
  terrainRange: number[];
  commune: Commune;
  annee: number[];
}
