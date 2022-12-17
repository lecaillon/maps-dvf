<script setup lang="ts">
import { useStore } from "@/stores/store";
import { ref } from "vue";

import type { Commune } from "shared/models/commune";

const store = useStore();

let communes = ref([] as Commune[]);
async function searchCommunes(val: any) {
  communes.value = await store.fetchCommunes(val);
}
</script>

<template>
  <VCard variant="flat">
    <v-card-text>
      <v-container>
        <v-autocomplete
          label="Ville"
          v-model="store.searchQuery.commune"
          :items="communes"
          item-value="code"
          item-title="nom"
          @update:search="searchCommunes"
          return-object
          no-filter
          hide-no-data
          clearable
          density="comfortable"
          color="secondary"
        ></v-autocomplete>
        <v-range-slider
          v-model="store.searchQuery.budgetRange"
          label="Budget"
          step="100000"
          min="0"
          max="2000000"
          thumb-label="always"
          class="mt-8"
          color="secondary"
        ></v-range-slider>
        <v-range-slider
          v-model="store.searchQuery.batiRange"
          label="Surface bati"
          step="10"
          min="0"
          max="300"
          thumb-label="always"
          class="mt-8"
          color="secondary"
        ></v-range-slider>
        <v-range-slider
          v-model="store.searchQuery.terrainRange"
          label="Surface terrain"
          step="100"
          min="0"
          max="10000"
          thumb-label="always"
          class="mt-8"
          color="secondary"
        ></v-range-slider>
        <v-range-slider
          v-model="store.searchQuery.annee"
          label="Année"
          step="1"
          min="2017"
          max="2022"
          thumb-label="always"
          class="mt-8"
          color="secondary"
        ></v-range-slider>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="store.fetchSales" :disabled="store.searchDisabled" class="mx-auto" variant="tonal" color="secondary"> Rechercher </v-btn>
    </v-card-actions>
  </VCard>
</template>
