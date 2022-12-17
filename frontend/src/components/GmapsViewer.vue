<script setup lang="ts">
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { useStore } from "@/stores/store";
import type { Sale } from "shared/models/sale";

const store = useStore();
const key = import.meta.env.VITE_GMAPS_KEY;

function getMeanPrice(sale: Sale) {
  return Math.round(sale.valeur_fonciere / sale.surface_reelle_bati);
}

function getAddress(sale: Sale) {
  return `${sale.adresse_numero} ${sale.adresse_nom_voie} ${sale.code_postal} ${sale.nom_commune}`;
}

function fav(sale: Sale) {
  sale.favorite = sale.favorite == 0 ? 1 : 0;
  store.saveFavorite(sale.id_mutation, sale.favorite);
}
</script>

<template>
  <google-map :api-key="key" language="fr" :center="{ lat: store.searchQuery.commune.lat, lng: store.searchQuery.commune.lng }" :zoom="15">
    <Marker v-for="(sale, i) in store.sales" :options="{ position: { lat: sale.latitude, lng: sale.longitude } }" :key="i">
      <info-window>
        <v-card density="compact" theme="light" class="h-100 w-100">
          <v-card-text>
            <div class="d-flex text-h6">
              <span> Maison {{ `${sale.valeur_fonciere.toLocaleString()} €` }}</span>
              <span style="margin-left: 9px; font-size: 13px">({{ getMeanPrice(sale) }} €/m²)</span>
            </div>
            <div style="font-size: small; margin-bottom: 13px">{{ getAddress(sale) }}</div>
            <v-icon style="margin-left: -3px">mdi-home</v-icon><span class="ml-1 mr-2">{{ sale.nombre_pieces_principales }} pièces</span>
            <v-icon>mdi-ruler-square</v-icon><span class="ml-1 mr-2">{{ sale.surface_reelle_bati }} m²</span> <v-icon>mdi-pine-tree</v-icon
            ><span class="mr-2">{{ sale.surface_terrain }} m²</span> <v-icon>mdi-calendar</v-icon
            ><span class="ml-1 mr-2">{{ new Date(sale.date_mutation).getFullYear() }}</span>
            <v-btn
              @click="fav(sale)"
              :color="sale.favorite == 1 ? 'pink' : ''"
              density="compact"
              variant="text"
              icon="mdi-heart-outline"
              style="margin-left: -0px; margin-bottom: 2px"
            ></v-btn
            ><span>Fav</span>
          </v-card-text>
        </v-card>
      </info-window>
    </Marker>
  </google-map>
</template>
