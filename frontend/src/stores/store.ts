import { BASE_URL_BACK, Deauville } from "@/config/appsettings";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from "vue";
import type { SearchSaleQuery } from "shared/models/searchSaleQuery";
import type { Commune } from "shared/models/commune";
import type { Sale } from "shared/models/sale";

export const useStore = defineStore("main-store", () => {
  const searchQuery = ref({
    commune: Deauville,
    budgetRange: [800000, 1500000],
    anneeRange: [2017, 2022],
    batiRange: [90, 220],
    terrainRange: [0, 2000],
    favorite: 0,
  } as SearchSaleQuery);
  const searchDisabled = computed(() => searchQuery.value.commune == null);
  const sales = ref([] as Sale[]);

  async function fetchCommunes(searchText: string): Promise<Commune[]> {
    const response = await fetch(`${BASE_URL_BACK}/communes?nom=${searchText}`, { method: "GET", mode: "cors" });
    return await response.json();
  }

  async function fetchSales(): Promise<void> {
    const response = await fetch(`${BASE_URL_BACK}/sales`, {
      method: "POST",
      body: JSON.stringify(searchQuery.value),
      headers: { "Content-type": "application/json" },
      mode: "cors",
    });

    sales.value = await response.json();
  }

  async function saveFavorite(id_mutation: string, favorite: number): Promise<void> {
    await fetch(`${BASE_URL_BACK}/favorite`, {
      method: "POST",
      body: JSON.stringify({ id_mutation, favorite }),
      headers: { "Content-type": "application/json" },
      mode: "cors",
    });
  }

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
  }

  return { searchQuery, searchDisabled, sales, fetchCommunes, fetchSales, saveFavorite };
});
