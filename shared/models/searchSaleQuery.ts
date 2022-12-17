import type { Commune } from "./commune";

export interface SearchSaleQuery {
  budgetRange: number[];
  commune: Commune;
}
