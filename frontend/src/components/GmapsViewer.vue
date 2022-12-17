<script setup lang="ts">
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { useStore } from "@/stores/store";

const store = useStore();
const key = import.meta.env.VITE_GMAPS_KEY
</script>

<template>
  <google-map :api-key=key language="fr" :center="{ lat: store.searchQuery.commune.lat, lng: store.searchQuery.commune.lng }" :zoom="15">
    <Marker v-for="(sale, i) in store.sales" :options="{ position: { lat: sale.latitude, lng: sale.longitude } }" :key="i">
      <info-window>
        <v-card density="compact" theme="light" class="h-100 w-100">
          <v-card-text>
            <div class="d-flex text-h6">Maison 1 200 000 €<span style="margin-left: 9px; font-size: 13px">(9876 €/m²)</span></div>
            <div style="font-size: small; margin-top: -4px; margin-bottom: 8px">10 RUE THERESE 75001 DEAUVILLE</div>
            <v-icon small>mdi-home</v-icon><span class="ml-1 mr-2">6 pièces</span> <v-icon small>mdi-ruler-square</v-icon><span class="ml-1 mr-2">120 m²</span>
            <v-icon small>mdi-pine-tree</v-icon><span class="mr-2">300m²</span> <v-icon small>mdi-calendar</v-icon><span class="ml-1 mr-2">2020</span>
          </v-card-text>
          <v-card-actions>
            <v-btn>Street View</v-btn>
          </v-card-actions>
        </v-card>
      </info-window>
    </Marker>
  </google-map>
</template>
